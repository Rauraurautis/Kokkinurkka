import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import logo from "../assets/logo.png"
import { setAccessToken, setRefreshToken } from '../services/TokenService'
import { useAuthStore } from '../store'
import hamburger from "../assets/hamburger.png"
import githublogo from "../assets/githublogo.png"
import { useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

const Index = () => {


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