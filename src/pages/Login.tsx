import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Navigate, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginToServer } from '../services/AuthService'
import { setAccessToken, setRefreshToken } from '../services/TokenService'
import { useAuthStore, UserCredentials } from '../store'

type Tokens = {
    accessToken: string
    refreshToken: string
}


const Login = () => {
    const [credentials, setCredentials] = useState<UserCredentials>({ email: "", password: "" })
    const { login, user } = useAuthStore(state => ({ login: state.login, user: state.user }))
    const loginMutation = useMutation({
        mutationFn: () => loginToServer(credentials),
        onSuccess: (data) => {
            if (data) {
                setAccessToken(data.accessToken)
                setRefreshToken(data.refreshToken)
                login(data.accessToken)
            } else {
                toast.warn("Väärä käyttäjätunnus tai salasana!")
            }
        },
        onError: () => {
            toast.warn("Virhe yhdistettäessä palvelimelle!")
        }
    })

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const tokens = loginMutation.mutate()
        return redirect("/recipes")


    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    if (user) {
        return <Navigate replace to="/" />
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center text-center bg-slate-200 border-zinc-700 border-2 shadow-xl p-7 sm:p-10 mx-auto w-fit ">
                <form onSubmit={(e) => loginHandler(e)} className="flex flex-col justify-center space-y-3 h-fit items-center text-center">
                    <input type="text" placeholder="Email" onChange={(e) => onChangeHandler(e)} className="bg-slate-800 text-white px-2 placeholder:text-white border-none focus:outline-none rounded text-center py-0.5" name="email" />
                    <input type="password" placeholder="Password" onChange={(e) => onChangeHandler(e)} className="bg-slate-800 text-white px-2 placeholder:text-white border-none focus:outline-none rounded text-center py-0.5" name="password" />
                    <button type="submit" className="mt-4 bg-slate-600 text-white relative px-2">Kirjaudu sisään</button>

                </form>
            </div>
        </div>
    )
}

export default Login