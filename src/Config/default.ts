import dotenv from 'dotenv' 
dotenv.config()

const PORT = process.env.PORT || 3000
const DATABASE_URL=process.env.DATABASE_URL||"postgres://postgres:123@10.0.11.64:5432/listdb"
const SECRET= process.env.SECRET||"KFJSKAFJDKGBGHKLAH"

const cacheConfig = {
    password: process.env.CACHE_PASSWORD,
    host: process.env.CACHE_HOST,
    port: process.env.CACHE_PORT
};

export default{
    PORT,
    DATABASE_URL,
    SECRET,
    cacheConfig
}