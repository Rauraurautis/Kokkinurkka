import React, { useState } from 'react'
import { redirect } from 'react-router-dom'
import { registerUser, RegisterUserCredentials } from '../services/AuthService'
import { inputStyles } from '../styles'
import { toast } from 'react-toastify'


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
    <div>
      <div className="flex flex-col justify-center h-fit items-center text-center bg-slate-200 border-zinc-700 border-2 shadow-xl p-7 sm:p-10 mx-2">
        <form onSubmit={(e) => registerHandler(e)} className="flex flex-col justify-center space-y-3 h-fit items-center text-center">
          <input type="text" placeholder="Email" onChange={(e) => onChangeHandler(e)} className={inputStyles} name="email" />
          <input type="text" placeholder="Username" onChange={(e) => onChangeHandler(e)} className={inputStyles} name="name" />
          <input type="password" placeholder="Password" onChange={(e) => onChangeHandler(e)} className={inputStyles} name="password" />
          <input type="password" placeholder="Confirm password" onChange={(e) => onChangeHandler(e)} className={inputStyles} name="passwordConfirmation" />
          <button type="submit" className="mt-4 bg-slate-600 text-white relative px-2">Rekisteröidy</button>
        </form>
      </div>
    </div>
  )
}

export default Register