import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { useAuthStore } from '../store'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

const Index = () => {

    const { csrfToken, setCsrfToken } = useAuthStore()

    useEffect(() => {
        axios.get("https://kokkinurkka-backend.onrender.com/csrf-token", {withCredentials: true}).then(res => {
            setCsrfToken(res.data.csrfToken)
        })
    }, [])

    return (<>
        <Navbar />
        <div className="pt-[100px] container mx-auto h-screen flex justify-center items-center xl:max-w-[1280px] bg-white bg-opacity-20">
            <Outlet />
            <ToastContainer className="absolute" position="bottom-left" hideProgressBar={true} />
        </div>

    </>
    )
}

export default Index