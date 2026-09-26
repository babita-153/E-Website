import dotenv from 'dotenv'

dotenv.config()

export const config={
    MONGODB_URI:process.env.MONGODB_URI,
    PORT:process.env.PORT,
    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET,
    IK_PRIVATE_KEY:process.env.IK_PRIVATE_KEY
}