import axios from "axios";
import jwtDecode from "jwt-decode";

type tokenPayload = {
    email: string
    name: string
    createdAt: string
    updatedAt: string
    __v: number
    session: string
    iat: number
    exp: number
}

const instance = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:1337/" :  "https://kokkinurkka-backend.onrender.com/",
    withCredentials: true,
}
)

export const getToken = () => {
    const token = localStorage.getItem("access-token")
    console.log(process.env.NODE_ENV)
    if (typeof token === "string") { return token }
    return ""
}

export const setAccessToken = (token: string) => {
    localStorage.setItem("access-token", token)
}

const isTokenExpired = () => {
    if (getToken()) {
        try {
            const decoded: tokenPayload = jwtDecode(getToken() as string)
            return decoded.exp < new Date().getTime() / 1000
        } catch (err) {
            console.error(err)
        }


    }
}

const getRefreshedToken = async () => {
    try {
        const result = await axios.get("https://kokkinurkka-backend.onrender.com/refresh", { withCredentials: true })
        return result.data
    } catch (error: any) {
        console.error(error.message)
    }

}

const newAccessToken = async () => {
    const data = await getRefreshedToken()
    if (typeof data.token === "string") {
        setAccessToken(data.token)
        return data.token
    }

}


/* instance.interceptors.request.use(async (req) => {
    if (isTokenExpired()) {
        const token = await newAccessToken()
        req.headers["Authorization"] = `Bearer ${token}`
        return req
    }
    const accessToken = getToken()
    req.headers["Authorization"] = `Bearer ${accessToken}`
    return req
}) */

export default instance