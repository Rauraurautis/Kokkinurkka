import jwtDecode from "jwt-decode"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { IRecipe } from "./pages/Recipes"
import { getToken } from "./services/TokenService"

export type UserCredentials = {
    email: string
    password: string
}

type User = {
    email: string
    user: string
    id: string
}

type AuthStore = {
    user: User | null
    userToken: string
    refreshToken: string
    loggedIn: boolean
    csrfToken: string
    login: (token: string) => void
    logout: () => void
    validateToken: (token: string) => boolean
    setNewToken: (token: string) => void
    setCsrfToken: (token: string) => void
}

type TokenPayload = {
    session: string
    iat: number
    exp: number
    user: UserPayload
}

type UserPayload = {
    _id: string
    email: string
    name: string
    createdAt: string
    updatedAt: string
    __v: number
}


const useAuthStore = create<AuthStore, [["zustand/persist", AuthStore]]>(
    persist(
        (set, get) => ({
            user: null,
            userToken: getToken(),
            refreshToken: "",
            loggedIn: false,
            csrfToken: "",

            login(token: string) {
                const decodedToken: TokenPayload = jwtDecode(token)
                console.log(decodedToken)
                set(state => ({
                    ...state, user: { user: decodedToken.user.name, email: decodedToken.user.email, id: decodedToken.user._id }, loggedIn: true
                }))
            },
            logout() {
                set(state => ({
                    ...state, user: null, userToken: "", refreshToken: "", loggedIn: false
                }))
            },
            validateToken(token: string | null) {
                if (token) {
                    const decodedToken: TokenPayload = jwtDecode(token)
                    const secondsNow = new Date().getTime() / 1000
                    return decodedToken.exp > secondsNow
                }
                return false
            },
            setNewToken(token: string) {
                set(state => ({
                    ...state, userToken: token
                }))
            },
            setCsrfToken(token: string) {
                set(state => ({
                    ...state, csrfToken: token
                }))
            }

        }), { name: "auth-storage" }))


type RecipeStore = {
    recipes: IRecipe[]
    favoritedRecipes: IRecipe[]
    ownRecipes: IRecipe[]
    setRecipes: (recipes: IRecipe[]) => void
    setFavoritedRecipes: (recipes: IRecipe[]) => void
    setOwnRecipes: (recipes: IRecipe[]) => void
    addNewRecipe: (recipe: IRecipe) => void
}

const useRecipeStore = create<RecipeStore>(
    (set, get) => ({
        recipes: [],
        favoritedRecipes: [],
        ownRecipes: [],
        setRecipes(recipes: IRecipe[]) {
            set(state => ({
                ...state, recipes: recipes
            }))
        },
        addNewRecipe(recipe: IRecipe) {
            set(state => ({
                ...state, recipes: state.recipes.concat(recipe)
            }))
        },
        setFavoritedRecipes(recipes: IRecipe[]) {
            set(state => ({
                ...state, favoritedRecipes: recipes
            }))
        },
        setOwnRecipes(recipes: IRecipe[]) {
            set(state => ({
                ...state, ownRecipes: recipes
            }))
        }

    }))

export { useAuthStore, useRecipeStore }