"use server"
import axios from "axios"

const token = process.env.TOKEN_ASAAS || ""
console.log("🚀 ~ token:", token)


export const asaas = axios.create({
    baseURL: 'https://asaas.com/api',
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        access_token: `${"$" + token}`
    }
})