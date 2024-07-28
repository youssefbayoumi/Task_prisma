import dev from './default'
import dotenv from 'dotenv'
dotenv.config()
export default {
    ...dev,
    PORT:process.env.PRODUCTION_PORT||4000
}