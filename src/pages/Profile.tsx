import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { getRecipe } from '../services/RecipeService'
import { getUser } from '../services/UserService'
import { useAuthStore, useRecipeStore } from '../store'
import { IRecipe } from './Recipes'
import placeholder from "../assets/placeholder.png"
import RecipeInfo from '../components/RecipeInfo'
import { Navigate } from 'react-router-dom'
import Recipe from '../components/Recipe'



export const Profile = () => {
  const { user } = useAuthStore(state => ({ user: state.user }))
  const { setFavoritedRecipes, setOwnRecipes, favoritedRecipes, ownRecipes } = useRecipeStore()
  const [selectedRecipe, setSelectedRecipe] = useState<IRecipe | null>(null)

  const fetchUserData = async () => {
    if (user) {
      const userData = await getUser(user.id)
      return userData 
    }
  }

  const { isLoading, error, data, refetch } = useQuery(['personalData'], fetchUserData, {
    staleTime: 10000,
    onSuccess: (data) => {
      if (data) {
        setFavoritedRecipes(data.favorites)
        setOwnRecipes(data.recipes)
      }
    }
  },);





  const handleRecipeClick = async (recipe: IRecipe) => {
    console.log(recipe.author._id, user!.id)
    setSelectedRecipe(recipe)
  }

  if (!user) {
    return <Navigate replace to="/login" />
  }

  return (
    <div className=" flex flex-col space-y-5 items-center animate-fadeIn mt-[75px] md:mt-0 w-[100%] pb-2">
      <div className="bg-slate-200 flex text-center justify-around w-[320px] md:w-[512px] xl:w-[40%] p-1 rounded-md min-w-[300px] mt-[50px] xl:mt-0">
        <div className="flex flex-col">
          <p className="font-bold">Käyttäjätunnus</p>
          <p>{user?.user}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Sähköposti</p>
          <p>{user?.email}</p>
        </div>
      </div>
      <RecipeInfo recipe={selectedRecipe} setSelectedRecipe={setSelectedRecipe} selectedRecipe={selectedRecipe} />
      <div className="flex flex-col xl:flex-row justify-center items-center xl:items-start space-y-5 xl:space-x-5 xl:space-y-0 min-w-[100%]">
        <div className="w-[320px] md:w-[512px] xl:w-[40%] bg-slate-200 p-3 h-[200px]">
          <h1 className="text-center font-bold mb-2 bg-slate-300">Suosikkireseptit</h1>
          <div className="grid-cols-4 grid overflow-y-auto space-x-2 min-h-[150px]">
            {favoritedRecipes.length > 0 ? favoritedRecipes.map(fav => (
              <div className="hover:brightness-90 cursor-pointer" onClick={() => handleRecipeClick(fav)} key={crypto.randomUUID()}>
                <p className="text-center text-sm font-semibold bg-slate-200 flex flex-col p-1 cursor-pointer hover:brightness-90 transition-all overflow-clip">{fav.name}</p>
                <img src={placeholder} alt="" />
              </div>
            )) : ""}
          </div>
        </div>
        <div className="w-[320px] md:w-[512px] xl:w-[40%] bg-slate-200 p-3">
          <h1 className="text-center font-bold bg-slate-300 mb-2">Omat reseptit</h1>
          <div className="grid-cols-2 md:grid-cols-4 grid max-h-[300px] overflow-y-auto space-x-2 min-h-[150px]">
            {ownRecipes.length > 0 ? ownRecipes.map(recipe => (
              <Recipe key={recipe._id} data={recipe} onClick={handleRecipeClick} />
            )) : ""}
          </div>
        </div>
      </div>
    </div>
  )
}


export default Profile