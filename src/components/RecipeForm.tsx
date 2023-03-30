import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Ingredient } from '../pages/Recipes'
import { addRecipe } from '../services/RecipeService'
import Button from './Button'
import backIcon from "../assets/backIcon.svg"

export type Category = "alkupalat" | "pääruoat" | "keitot" | "juomat" | "pizzat" | "leivonnaiset" | "lisukkeet" | "leivät"
    | "salaatit" | "välipalat" | "kastikkeet" | "jälkiruoat" | ""

const categories = ["alkupalat", "pääruoat", "keitot", "juomat", "pizzat", "leivonnaiset", "lisukkeet", "leivät", "salaatit", "välipalat", "kastikkeet", "jälkiruoat"]

export type RecipeInput = {
    name: string
    description: string
    instructions: string
    ingredients: Ingredient[]
    category: Category
    image: File | null
}



const RecipeForm: React.FC<{ setShowRecipeForm: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setShowRecipeForm }) => {
    const [recipe, setRecipe] = useState<RecipeInput>({ name: "", description: "", instructions: "", ingredients: [], image: null, category: "" })
    const queryClient = useQueryClient()
    const addRecipeMutation = useMutation({
        mutationFn: async (data: FormData) => {
            try {
                await addRecipe(data)
            } catch (error: any) {
                console.error(error)
            }
        },
        onSuccess: async (data) => {
            queryClient.invalidateQueries(["recipeData"])
            toast.success("Resepti lisätty!")
        }
    })


    const handleRecipeChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        setRecipe(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const addIngredient = () => {
        setRecipe(prev => ({ ...prev, ingredients: prev.ingredients.concat({ name: "", amount: 0, unit: "" }) }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const image = e.target.files[0]
            setRecipe(prev => ({ ...prev, image: image }))
        }
    }

    const addRecipeHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (recipe.ingredients.length === 0) {
            toast("Lisää vähintään yksi raaka-aine!")
            return
        } else if (recipe.name === "") {
            toast("Resepti vaatii nimen!")
            return
        } else if (recipe.description === "") {
            toast("Resepti vaatii kuvauksen!")
            return
        } else if (recipe.instructions === "") {
            toast("Resepti vaatii ohjeet!")
            return
        }
        const formData = new FormData()
        formData.append('recipe', JSON.stringify(recipe));
        if (recipe.image) {
            formData.append('image', recipe.image);
        }
        addRecipeMutation.mutate(formData)
        setShowRecipeForm(false)

    }

    const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        setRecipe(prev => ({
            ...prev, ingredients: prev.ingredients.map((ingredient, i) =>
                idx === i ? { ...ingredient, [e.target.name]: e.target.name === "amount" ? parseInt(e.target.value) : e.target.value } : ingredient
            )
        }))
    }

    return (
        <div className="absolute mx-auto inset-x-0 bg-slate-200 max-h-[600px] overflow-y-auto min-w-[300px] max-w-[500px] mt-10 rounded-md z-10">
            <form className="space-y-3 flex flex-col p-5" onSubmit={e => addRecipeHandler(e)}>
                <input type="text" placeholder="Reseptin nimi" minLength={5} name="name" className="p-0.5" onChange={(e) => handleRecipeChange(e)} />
                <textarea placeholder="Reseptin kuvaus" rows={2} minLength={5} name="description" className="p-0.5" onChange={(e) => handleRecipeChange(e)} />
                <select className="text-center" name="category" onChange={e => handleRecipeChange(e)}>
                    <option value="">Valitse reseptin kategoria</option>
                    {categories.map(cat => (
                        <option value={cat}>{cat}</option>
                    ))}</select>
                <button type="button" className="text-sm p-1 bg-slate-300 rounded-md" onClick={addIngredient} >Lisää raaka-aine</button>
                <ul className="space-y-1 flex flex-col items-center">
                    {recipe.ingredients.map((ingredient, i) => (
                        <li key={i} className="flex space-x-1 max-w-[300px] ">
                            <input type="text" className="w-[100px] p-0.5" name="name" onChange={e => handleIngredientChange(e, i)} />
                            <input type="number" className="w-[50px] p-0.5" name="amount" min={0} onChange={e => handleIngredientChange(e, i)} />
                            <input type="text" className="w-[100px] p-0.5" name="unit" onChange={e => handleIngredientChange(e, i)} /></li>
                    ))}
                </ul>


                <textarea placeholder="Reseptin ohjeet" rows={4} minLength={20} name="instructions" className="p-0.5" onChange={(e) => handleRecipeChange(e)} />
                <label>Kuva</label>
                <input type="file" onChange={(e) => handleImageChange(e)} accept="image/*" />
                <div className="flex justify-between px-5">
                    <Button type="submit" className="text-sm p-1 bg-slate-300 rounded-md" text={"Lisää resepti"} />
                    <Button onClick={() => setShowRecipeForm(false)} text={"Peruuta"} icon={backIcon} />
                </div>
            </form>
        </div>
    )
}

export default RecipeForm