import axios from "axios"

export type Auth = {
    email: string,
    password: string
}

const API = "http://localhost:3000/users";

export const register = async (payload: Auth) => {
    await axios.post(API, payload)
}

export const login = async (payload: Auth) => {
    const {data} = await axios.post(API, payload)
    return data;
}