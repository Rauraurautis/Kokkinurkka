import { useQuery } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Recipe from '../components/Recipe'
import RecipeForm, { Category } from '../components/RecipeForm'
import RecipeInfo from '../components/RecipeInfo'
import { getAllRecipes } from '../services/RecipeService'
import { useAuthStore, useRecipeStore } from '../store'
import arrowright from "../assets/arrowright.png"
import arrowLeft from "../assets/arrowleft.png"
import Button from '../components/Button'
import CategoryMenu from '../components/CategoryMenu'
import { useParams, useSearchParams } from 'react-router-dom'

export interface Ingredient {
    name: string
    amount: number
    unit: string
}

export type User = {
    name: string
    _id: string
    favorites: string[]
}

export interface IComment {
    _id: string
    user: User
    createdAt: string
    content: string
}

type BufferData = {
    data: Uint8Array
}

export interface IRecipe {
    name: string
    description: string
    instructions: string
    image: string
    ingredients: Ingredient[]
    comments: IComment[]
    _id: string
    author: User
    category?: Category //make this required
    favoritedBy: string[]
}

const Recipes = () => {
    const { loggedIn } = useAuthStore(state => ({ loggedIn: state.loggedIn }))
    const { recipes, setRecipes } = useRecipeStore()
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[]>([])
    const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | null>(null)
    const [search, setSearch] = useState("")
    const [showRecipeForm, setShowRecipeForm] = useState(false)
    const [page, setPage] = useState<number>(0)
    const [searchParams, setSearchParams] = useSearchParams()

    const { isLoading, isError } = useQuery({
        queryKey: ["recipeData"],
        queryFn: getAllRecipes,
        onSuccess: (data) => {
            if (data.length > 0) {
                setRecipes(data)
            } else {
                setRecipes([])
            }

        },
        onError: (error) => {
            console.error(error)
        },
        staleTime: 10000
    })

    useEffect(() => {
        if (selectedRecipe) {
            const recipe = selectedRecipe
            if (recipe) {
                setSelectedRecipe(recipes.filter(r => r._id === recipe._id)[0])
            }
        }
    }, [recipes])

    useEffect(() => {
        if (selectedCategories.length > 0) {
            setFilteredRecipes(prev => recipes.filter(recipe => recipe.category ? selectedCategories.includes(recipe.category) : true))
        } else {
            setFilteredRecipes(prev => recipes.filter(recipe => recipe.name.toLowerCase().includes(search.toLowerCase())).splice((page * 15), ((page + (page === 0 ? 1 : 0)) * 15)))
        }
    }, [search, page, recipes, selectedCategories])





    const handleNewRecipePress = () => {
        if (!loggedIn) {
            toast("Kirjaudu sisään lisätäksesi uuden reseptin!")
            return
        }
        setShowRecipeForm(true)
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <section className="w-[70%] h-full flex flex-col animate-fadeIn relative pt-[50px] mb-10 min-h-[500px] ">
            {showRecipeForm ? <RecipeForm setShowRecipeForm={setShowRecipeForm} /> : ""}
            <div className="mb-3 flex justify-center items-center gap-5">
                <input type="text" className="p-1 max-h-[25px]" placeholder="Hae nimellä" value={search} onChange={(e) => handleSearch(e)} />
                <CategoryMenu selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
                <Button text={"Uusi resepti"} onClick={() => handleNewRecipePress()} />
            </div>

            <RecipeInfo setSelectedRecipe={setSelectedRecipe} recipe={selectedRecipe} selectedRecipe={selectedRecipe} setSearchParams={setSearchParams} />

            <div className="flex flex-col justify-between h-[650px] mt-10 min-w-[200px]">
                <RecipeList selectedRecipe={selectedRecipe} setSelectedRecipe={setSelectedRecipe} filteredRecipes={filteredRecipes} isLoading={isLoading} isError={isError} setSearchParams={setSearchParams} searchParams={searchParams} />
                {filteredRecipes.length === 0 ? "" : <div className="flex justify-between bottom-[0px] w-[100%] mb-20">
                    <button className={`w-[50px] bg-slate-300 p-2 rounded-xl ${page > 0 ? "bg-slate-300" : "bg-slate-600"}`} disabled={page > 0 ? false : true} onClick={() => setPage(prev => prev - 1)}><img src={arrowLeft} /></button>
                    <button className={`w-[50px] bg-slate-300 p-2 rounded-xl ${filteredRecipes.length < 15 ? "bg-slate-600" : "bg-slate-300"}`} onClick={() => setPage(prev => prev + 1)} disabled={filteredRecipes.length < 15 ? true : false}><img src={arrowright} /></button>
                </div>}
            </div>

        </section>
    )
}

export default Recipes


type RecipeListProps = {
    selectedRecipe: IRecipe | null
    setSelectedRecipe: (recipe: IRecipe) => void
    filteredRecipes: IRecipe[]
    isLoading: boolean
    isError: boolean
    searchParams: URLSearchParams
    setSearchParams: Function
}

const RecipeList: FC<RecipeListProps> = ({ selectedRecipe, setSelectedRecipe, filteredRecipes, isLoading, isError, searchParams, setSearchParams }) => {

    const handleClick = (data: IRecipe) => {
        setSelectedRecipe(data)
        setSearchParams({ id: data._id })
    }

    useEffect(() => {
        const recipeId = searchParams.get("id")
        if (searchParams.get("id")) {
            const recipe = filteredRecipes.find(recipe => recipe._id === recipeId)
            console.log(filteredRecipes)
            if (recipe) setSelectedRecipe(recipe)
        }
    }, [filteredRecipes])

    return (
        <div className={` grid-cols-2 grid gap-2 pb-2 md:grid-cols-4 lg:grid-cols-5 ${selectedRecipe ? "brightness-75" : ""}`}>
            {isLoading ? <h1 className="text-center w-[100%] text-lg mt-10 font-semibold absolute">Haetaan reseptejä...</h1> : isError ? <h1 className="text-center w-[100%] text-lg mt-10 font-semibold absolute">Virhe haettaessa reseptejä</h1>
                : filteredRecipes.length === 0 && !isLoading ? <h1 className="text-center w-[100%] text-lg mt-10 font-semibold absolute" >Ei reseptejä hakusanoilla</h1> : filteredRecipes.map((recipe, i) => (
                    <Recipe data={recipe} key={i} onClick={handleClick} />
                ))}

        </div>
    )
}