import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'react-toastify'
import { IComment } from '../pages/Recipes'
import { deleteComment } from '../services/RecipeService'

const Comment: React.FC<{ data: IComment, recipeId: string }> = ({ data, recipeId }) => {
    const queryClient = useQueryClient()
    const deleteCommentMutation = useMutation({
        mutationFn: async () => {
            await toast.promise(deleteComment(data._id, recipeId), {
                pending: "Removing comment...",
                success: "Comment removed!",
                error: "Error deleting comment"
            })
        },
        onSuccess: async (data) => {
            queryClient.invalidateQueries(["recipeData"])
        }
    })


    return (
        <div className="bg-slate-200 w-[80%] p-3">
            <p className="font-semibold">{data.user.name}</p>
            <p className="text-[10px]">{data.createdAt}</p>
            <p className="mt-2 italic">{data.content}</p>
            <button className="p-1 bg-slate-300 my-2" onClick={() => {
                deleteCommentMutation.mutate()
            }}>Delete comment</button>
        </div>
    )
}

export default Comment