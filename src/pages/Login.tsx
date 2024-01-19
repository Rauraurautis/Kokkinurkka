import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Navigate, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginToServer } from '../services/AuthService'
import { setAccessToken } from '../services/TokenService'
import { useAuthStore, UserCredentials } from '../store'
import Button from '../components/Button'

type Tokens = {
    accessToken: string
    refreshToken: string
}


const Login = () => {
    const [credentials, setCredentials] = useState<UserCredentials>({ email: "", password: "" })
    const { login, user, csrfToken } = useAuthStore(state => ({ login: state.login, user: state.user, csrfToken: state.csrfToken }))
    const loginMutation = useMutation({
        mutationFn: () => loginToServer(credentials, csrfToken),
        onSuccess: (data) => {
            if (data) {
                setAccessToken(data.accessToken)
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
            <div className="flex flex-col justify-center h-fit items-center text-center bg-slate-200 rounded-2xl border-2 shadow-xl p-10 mx-2">
                <form onSubmit={(e) => loginHandler(e)} className="flex flex-col justify-center space-y-10 h-fit items-center text-center">
                    <div className="flex flex-col space-y-3 ">
                        <input type="text" placeholder="Sähköposti" onChange={(e) => onChangeHandler(e)} className=" text-black px-2 border-none focus:outline-none rounded text-center py-0.5" name="email" />
                        <input type="password" placeholder="Salasana" onChange={(e) => onChangeHandler(e)} className=" text-black px-2 border-none focus:outline-none rounded text-center py-0.5" name="password" />
                    </div>
                    <Button type="submit" className="mt-4 bg-slate-600 text-white relative px-2" text={"Kirjaudu sisään"} customStyles='mt-2' />

                </form>
            </div>
    )
}

export default Login