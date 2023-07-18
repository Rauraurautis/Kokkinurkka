import { FC } from 'react'
import { useParams } from 'react-router-dom'

interface SingleRecipeProps {

}

const SingleRecipe: FC<SingleRecipeProps> = ({ }) => {
    const { id } = useParams()
    console.log(id)
    return <div>{id}</div>
}

export default SingleRecipe