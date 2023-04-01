import React from 'react'
import backIcon from "../assets/backIcon.svg"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    text: string
    isLarge?: boolean
    icon?: string
    customStyles?: string
}

const Button: React.FC<ButtonProps> = ({ text, isLarge, icon, children, customStyles, ...props }) => {

    return (
        <button {...props} className={`${isLarge ? "p-5 min-w-[150px] text-center text-xl" : "p-1"} ${icon ? "pl-1 pr-3" : "px-3"} cursor-pointer bg-cyan-500 rounded-lg shadow-lg font-semibold
         hover:bg-cyan-600 hover:translate-y-[-2px] hover:scale-105 transition-all flex space-x-2 ${customStyles || ""}`}>
            {icon ? <img src={icon} className="max-h-[25px]" /> : ""}
            <p>{text}</p></button>

    )
}

export default Button