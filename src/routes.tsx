import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Recipes from "./pages/Recipes";
import Register from "./pages/Register";
import IndexPage from "./pages/IndexPage";
import SingleRecipe from "./pages/SingleRecipe";




export const router = createBrowserRouter([
    {
        path: "/",
        element: <Index />,
        children: [
            {
                path: "/",
                element: <IndexPage />
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "recipes",
                element: <Recipes />,
                
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/recipe/:id",
                element: <SingleRecipe />
            },
        ]
    }


]);
