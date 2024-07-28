import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000

export default{
    PORT,
    DATABASE_URL: process.env.DATABASE_URL||"postgres://postgres:123@10.0.11.64:5432/listdb",
    SECRET: process.env.SECRET||"KFJSKAFJDKGBGHKLAH"
}