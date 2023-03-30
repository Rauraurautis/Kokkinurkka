import instance from "./TokenService"

export type UserCredentials = {
    email: string
    password: string
}

export interface RegisterUserCredentials extends UserCredentials {
    passwordConfirmation: string
    name: string
}


export const loginToServer = async (credentials: UserCredentials) => {
    try {
        const response = await instance.post(`/api/sessions`, credentials)
        const data = await response.data
        return data
    } catch (error: any) {
        console.error(error)
    }
}

export const refreshAccessToken = async (refreshToken: string) => {
    try {
        const response = await instance.get(`/healthcheck`, { headers: { "x-refresh": refreshToken } })
       
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