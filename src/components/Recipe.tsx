import React from 'react'
import { IRecipe } from '../pages/Recipes'
import placeholder from "../assets/placeholder.png"
import { fromByteArray } from 'base64-js'

interface RecipeProps<T> {
    data: T;
    setSelectedRecipe: (input: T) => void;
}

const Recipe: React.FC<RecipeProps<IRecipe>> = ({ data, setSelectedRecipe }) => {



    return (
        <div className=" bg-slate-200 flex flex-col p-1 cursor-pointer hover:brightness-90 transition-all overflow-clip" onClick={() => setSelectedRecipe(data)}>
            <p className='text-center text-sm font-semibold'>{data.name}</p>
            <img className="min-h-[80%]" src={`${data.image ? "https://d1l7zpp9jd00vm.cloudfront.net/" + data.image : placeholder}`} alt="" />
        </div>
    )
}

export default Recipe