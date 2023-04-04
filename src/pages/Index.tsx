import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import logo from "../assets/logo.png"
import { setAccessToken, setRefreshToken } from '../services/TokenService'
import { useAuthStore } from '../store'
import hamburger from "../assets/hamburger.png"
import githublogo from "../assets/githublogo.png"
import { useState } from 'react'

const Index = () => {
    const { loggedIn, logout } = useAuthStore(state => ({ loggedIn: state.loggedIn, logout: state.logout }))
    const [dropDownVisible, setDropDownVisible] = useState<boolean>(false)

    const logOut = () => {
        toast.success("Logged out!")
        setAccessToken("")
        setRefreshToken("")
        logout()
    }

    const linkStyle = "hover:translate-y-[-2px] h-[100%] hover:bg-darkerperu flex items-center transition-all"

    return (<>
        <nav className="mt-2 container  bg-peru  mx-auto inset-x-0
         mb-5 fixed xl:max-w-[1280px] z-10 shadow-xl rounded-xl">
            <div className="flex items-center font-lobster text-2xl h-[70px]">
                <div className="pl-5 absolute w-[120px]">
                    <img src={logo} alt="" />
                </div>
                <ul className="hidden md:flex space-x-10 pr-5 pl-10 md:pl-0 w-full justify-center items-center h-[100%]">
                    <NavLink to="/" className={linkStyle}>Etusivu</NavLink>
                    <NavLink to="/recipes" className={linkStyle}>Reseptit</NavLink>
                    {loggedIn ? <>
                        <NavLink to="/profile" className={linkStyle}>Profiili</NavLink>
                        <NavLink to="/" className={linkStyle} onClick={logOut}>Kirjaudu ulos</NavLink></>
                        : <><NavLink to="/login" className={linkStyle}>Kirjaudu</NavLink>
                            <NavLink to="/register" className={linkStyle}>Rekisteröidy</NavLink></>}
                </ul>
                <div className="absolute right-[50px] md:hidden">
                    <img src={hamburger} alt="" className="max-w-[50px] cursor-pointer hover:translate-y-[-2px]" onClick={() => setDropDownVisible(prev => !prev)} />
                </div>
            </div>
            <div className={`absolute right-0 text-center font-lobster p-1 ${dropDownVisible ? "visible" : "hidden"} md:hidden`}>
                <ul className="flex flex-col space-y-2 text-xl bg-slate-300 p-2 rounded-md shadow-xl animate-fadeIn">
                    <NavLink to="/" >Etusivu</NavLink>
                    <NavLink to="/recipes" >Reseptit</NavLink>
                    {loggedIn ? <>
                        <NavLink to="/profile" >Profiili</NavLink>
                        <NavLink to="/" onClick={logOut}>Kirjaudu ulos</NavLink></>
                        : <><NavLink to="/login" >Kirjaudu</NavLink>
                            <NavLink to="/register" >Rekisteröidy</NavLink></>}
                </ul>
            </div>
            <div className="w-[60px] absolute right-0 top-1 hover:animate-wiggle">
                    <a href="https://github.com/Rauraurautis/" target="_blank"><img src={githublogo} alt="" /></a>
                </div>
        </nav>
        <div className="container mx-auto h-full min-h-screen flex justify-center items-center xl:max-w-[1280px] relative bg-white bg-opacity-20">
            <Outlet />
            <ToastContainer className="absolute" position="bottom-left" hideProgressBar={true} />
        </div>

    </>
    )
}

export default Index