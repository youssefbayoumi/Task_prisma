import { FastifyReply, FastifyRequest } from "fastify";
import config from "../Config/index.config";
import jwt from 'jsonwebtoken';
import userRepo from '../Repository/user'

async function auth(req:FastifyRequest,reply:FastifyReply) {

    const {authorization}=req.headers
    if(!authorization)
{
    return reply.status(401).send({error:"Authorization required"})
 }
 const token=authorization.split(' ')[1]
 try{
    const {_id} = jwt.verify(token, config.SECRET) as { _id: string };
     const user=await userRepo.getUserById(_id)
    if(!user)
        {
            throw Error("UnAuthorized!!")
        }
    return
 }catch(e)
 {
    reply.status(500).send({Message:"UnAuthorized!!"})
 }

}
export default auth;