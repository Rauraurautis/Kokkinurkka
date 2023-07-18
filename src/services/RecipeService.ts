import { RecipeInput } from "../components/RecipeForm";
import { Comment } from "../components/RecipeInfo";
import instance from "./TokenService";

export const getAllRecipes = async () => {
    try {
        const response = await instance.get("/api/recipes")

        const data = await response.data
        return data
    } catch (error) {
        console.error("Error fetching data from server")
        throw new Error("Error fetching recipes")
    }
}

export const getRecipe = async (recipeId: string) => {
    try {
        const response = await instance.get(`/api/recipes/${recipeId}`)
        const data = await response.data
        return data
    } catch (error) {
        console.error("Error fetching data from server")
        return {}
    }
}

export const addRecipe = async (body: RecipeInput | FormData) => {
    try {
        const response = await instance.post("/api/recipes", body)
        const data = await response.data
        return data
    } catch (error: any) {
        console.error(error.response)
        throw new Error(error.response.data.issues[0].message)
    }
}

export const removeRecipe = async (recipeId: string) => {
    try {
        const response = await instance.delete(`/api/recipes/${recipeId}`)
        const data = await response.data
        return data
    } catch (error: any) {
        console.error(error.response)
    }
}

export const commentRecipe = async (comment: Comment, recipeId: string) => {
    try {
        const response = await instance.post(`/api/recipes/${recipeId}`, comment)
        const data = await response.data
        return data
    } catch (error: any) {
        if (error.response.data.name === "ZodError") {
            if (error.response.data.issues[0].code === "too_small") {
                throw new Error("Comment too short - minimum 10 letters")
            }
        }
        throw new Error(error)
    }
}

export const deleteComment = async (commentId: string, recipeId: string) => {
    try {
        const response = await instance.put(`/api/recipes/${recipeId}`, { commentId: commentId })
        const data = await response.data
        return data
    } catch (error) {
        console.error("Error deleting comment")
    }
}

export const favoriteRecipe = async (recipeId: string) => {
    try {
        const response = await instance.put(`/api/recipes/favorite/${recipeId}`)
        const data = await response.data
        return data
    } catch (error) {
        console.error(error)
    }
}
