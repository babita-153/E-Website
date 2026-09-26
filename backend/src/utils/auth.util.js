import { config } from "../config/config.js"
import jwt from 'jsonwebtoken'
export const getAccessToken=({userId})=>{
    let accessToken=jwt.sign({userId},config.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})
    return accessToken
}

export const getRefreshToken=({userId})=>{
    let refreshToken=jwt.sign({userId},config.REFRESH_TOKEN_SECRET,{expiresIn:"7d"})
    return refreshToken
}


export const verifyRefreshToken=(token)=>{
    let decoded=jwt.verify(token,config.REFRESH_TOKEN_SECRET)
    return decoded
}


export const verifyAccessToken=(token)=>{
    let decoded=jwt.verify(token,config.ACCESS_TOKEN_SECRET)
    return decoded
}