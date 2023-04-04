import React, { useState } from 'react'
import { redirect } from 'react-router-dom'
import { registerUser, RegisterUserCredentials } from '../services/AuthService'
import { inputStyles } from '../styles'
import { toast } from 'react-toastify'
import Button from '../components/Button'


const Register = () => {
  const [credentials, setCredentials] = useState<RegisterUserCredentials>({ email: "", password: "", passwordConfirmation: "", name: "" })

  const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const user = await registerUser(credentials)
    if (user) {
      redirect("/about")
      toast(`Registered user ${credentials.name}. You may now log in.`)
      setCredentials({ email: "", password: "", passwordConfirmation: "", name: "" })
    }
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
      <div className="flex flex-col justify-center h-fit items-center text-center bg-slate-200 rounded-2xl border-2 shadow-xl p-10 mx-2 ">
        <form onSubmit={(e) => registerHandler(e)} className="flex flex-col space-y-10 items-center text-center">
          <div className="flex flex-col space-y-3">
            <input type="text" placeholder="Sähköposti" onChange={(e) => onChangeHandler(e)} className={inputStyles} name="email" />
            <input type="text" placeholder="Käyttäjätunnus" onChange={(e) => onChangeHandler(e)} className={inputStyles} name="name" />
            <input type="password" placeholder="Salasana" onChange={(e) => onChangeHandler(e)} className={inputStyles} name="password" />
            <input type="password" placeholder="Toista salasana" onChange={(e) => onChangeHandler(e)} className={inputStyles} name="passwordConfirmation" />
          </div>
          <Button type="submit" text={"Rekisteröidy"} />
        </form>
      </div>
  )
}

export default Register