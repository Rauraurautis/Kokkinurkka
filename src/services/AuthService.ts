import instance from "./TokenService"

export type UserCredentials = {
    email: string
    password: string
}

export interface RegisterUserCredentials extends UserCredentials {
    passwordConfirmation: string
    name: string
}


export const loginToServer = async (credentials: UserCredentials, csrfToken: string) => {
    try {
        instance.defaults.headers.post['CSRF-Token'] = csrfToken
        const response = await instance.post(`/api/sessions`, credentials, {withCredentials: true})
        const data = await response.data
        return data
    } catch (error: any) {
        console.error(error)
        throw new Error("Failed to log in")
    }
}

export const refreshAccessToken = async (refreshToken: string) => {
    try {
        const response = await instance.get(`/refresh`)
       
        const data = await response.data
        return data
    } catch (error: any) {
        console.error(error)
    }
}


export const registerUser = async (credentials: RegisterUserCredentials) => {
    try {
        console.log(credentials)
        const response = await instance.post(`/api/users`, credentials)
      
        const data = await response.data
        return data
    } catch (error: any) {
        console.error(error.response.data)
    }
}