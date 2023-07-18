import React, { useEffect, useRef, useState } from 'react'
import { IRecipe } from '../pages/Recipes'
import Comment from './Comment'
import placeholder from "../assets/placeholder.png"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { commentRecipe, favoriteRecipe, removeRecipe } from '../services/RecipeService'
import { useAuthStore, useRecipeStore } from '../store'
import { toast } from 'react-toastify'
import { fromByteArray } from 'base64-js';

export type Comment = {
    content: string
}

const RecipeInfo: React.FC<{ recipe: IRecipe | null, setSelectedRecipe: React.Dispatch<React.SetStateAction<IRecipe | null>>, selectedRecipe?: IRecipe | null }> = ({ recipe, setSelectedRecipe, selectedRecipe }) => {
    const [comment, setComment] = useState<Comment>({ content: "" })
    const { user, setUser } = useAuthStore(state => ({ user: state.user, setUser: state.login }))
    const infoRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient()



    useEffect(() => {

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleClickOutside = (e: MouseEvent) => {
        if (infoRef.current && e.target instanceof Node && !infoRef.current.contains(e.target)) {
            setSelectedRecipe(null);
        }
    };


    const addCommentMutation = useMutation({
        mutationFn: async () => await commentRecipe(comment, recipe!._id),
        onSuccess: async (data) => {
            queryClient.invalidateQueries(["recipeData"])
            queryClient.invalidateQueries(["personalData"])
            setComment({ content: "" })
        }
    })

    const removeRecipeMutation = useMutation({
        mutationFn: async () => await removeRecipe(recipe!._id),
        onSuccess: async (data) => {
            queryClient.invalidateQueries(["recipeData"])
            queryClient.invalidateQueries(["personalData"])
            toast.info("Resepti poistettu!")
            setSelectedRecipe(null)
        }
    })

    const favoriteRecipeMutation = useMutation({
        mutationFn: async () => await favoriteRecipe(recipe!._id),
        onSuccess: async (data) => {
            queryClient.invalidateQueries(["recipeData"])
            queryClient.invalidateQueries(["personalData"])
            setUser(data)
            toast.info("Resepti lisätty suosikkeihin!")
        }
    })


    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(prev => ({ content: e.target.value }))
    }

    const handlePostComment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (comment.content.length < 10) {
            toast("Kommentin täytyy olla minimissään 10 merkin pituinen!")
            return
        }
        addCommentMutation.mutate()
    }

    return (
        <>
            {recipe ? <div ref={infoRef} className="inset-x-0 mx-auto mt-10 justify-center flex sm:space-x-5 z-[5] flex-col items-center sm:flex-row absolute animate-fadeIn">
                <div className={`min-w-[300px] bg-slate-300 flex flex-col space-y-5 items-center text-sm relative rounded-lg shadow-lg mb-5 pb-2 max-h-[500px] overflow-y-auto max-w-[300px] lg:max-w-[400px] xl:max-w-[500px]`}>
                    <div className="w-[90%] pt-2 absolute flex justify-between"><h3 className="font-bold">Tekijä: {recipe.author.name}</h3><button className="p-1  bg-slate-400" onClick={() => setSelectedRecipe(null)}>Takaisin</button></div>
                    <div className="flex flex-col justify-center items-center space-y-3 w-[80%]">
                        <h1 className="uppercase mt-5 font-semibold font-sans break-all text-center">{recipe.name}</h1>
                        <h2 className="w-[90%] text-center">{recipe.description}</h2>
                    </div>
                    <img src={`http://localhost:1337/image/${recipe.image}`} className="max-w-[60%]" alt="Image" />
                    <ul className="min-w-[60%]  p-2 ">
                        {recipe.ingredients.map((ingredient, i) => (
                            <li key={i} className="flex  justify-between odd:bg-slate-400 even: bg-slate-100 px-1 "><p>{ingredient.name}</p><p>{ingredient.amount} {ingredient.unit}</p></li>
                        ))}
                    </ul>
                    <p className="p-5 bg-slate-100 w-[90%] ">{recipe.instructions}</p>

                    {!user ? "" : user?.id === recipe.author._id ? <button className="p-1 m-2 bg-slate-400" onClick={() => removeRecipeMutation.mutate()}>Poista resepti</button> :
                        recipe.favoritedBy.includes(user.id) ? <button className="p-1 m-2 bg-slate-400" onClick={() => favoriteRecipeMutation.mutate()}>Poista suosikeista</button>
                            : <button className="p-1 m-2 bg-slate-400" onClick={() => favoriteRecipeMutation.mutate()}>Lisää suosikkeihin</button>
                    }
                </div >
                <div className={`min-w-[300px] max-w-[500px] max-h-[600px] bg-slate-300 flex flex-col space-y-3 items-center justify-center text-sm rounded-lg shadow-lg pt-5`}>
                    {recipe.comments.length ? recipe.comments.map((comment, i) => (
                        <Comment key={i} data={comment} recipeId={recipe._id} />
                    )) : <p className="pb-5">No comments</p>}
                    {user ? <div className="flex flex-col">
                        <textarea className="p-1" minLength={10} rows={2} onChange={e => handleCommentChange(e)} value={comment.content} />
                        <button className="p-1 m-2 bg-slate-400" onClick={(e) => handlePostComment(e)}>Comment</button>
                    </div> : ""}

                </div>
            </div> : ""}
        </>
    )
}

export default RecipeInfo

