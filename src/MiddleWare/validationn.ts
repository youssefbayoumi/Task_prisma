import Ajv from "ajv";
import validation from "../Model/schemas";
import { FastifyReply, FastifyRequest } from "fastify";

const ajv=new Ajv()
ajv.addSchema(validation.signUpSchema,"signUpVal");
ajv.addSchema(validation.signInSchema,"signInVal")
ajv.addSchema(validation.emailSchema,"byEmail");
ajv.addSchema(validation.emailAgeSchema,"byEmailAge")
ajv.addSchema(validation.idSchema,"byId")
ajv.addSchema(validation.phoneSchema,"byPhone")


//how hena lazem req,reply wala momken object
async function signUpVal(req:FastifyRequest,reply:FastifyReply)
{
    const val=ajv.getSchema("signUpVal")
    if(!val)
        return reply.status(500).send({Error:"SignUp Schema not found"})
    
        
    if(!val(req.body))
        {
            return reply.status(400).send({Error:JSON.stringify(val.errors) as string})  
        }

}
async function signInVal(req:FastifyRequest,reply:FastifyReply)
{
    const val=ajv.getSchema("signInVal")
    if(!val)
        return reply.status(500).send({Error:"SignIn Schema not found"})
    if(!val(req.body))
        {
            return  reply.status(400).send({Error:JSON.stringify(val.errors) as string})
            
        }

}
async function byEmail(req:FastifyRequest,reply:FastifyReply)
{
    const val=ajv.getSchema("byEmail")
    if(!val)
        return reply.status(500).send({Error:"Email Schema not found"})

    if(!val(req.params))
        {
        return  reply.status(400).send({Error:JSON.stringify(val.errors) as string})
            
        }

}
async function byEmailAge(req:FastifyRequest,reply:FastifyReply)
{
    const val=ajv.getSchema("byEmailAge")
    if(!val)
        return reply.status(500).send({Error:"EmailAge Schema not found"})
const{email,age}=req.params as {email:string,age:number}
const age_int=Number(age)
    if(!val({email,age:age_int}))
        {
        return  reply.status(400).send({Error:JSON.stringify(val.errors) as string})
            
        }

}
async function byId(req:FastifyRequest,reply:FastifyReply)
{
    const val=ajv.getSchema("byId")
    if(!val)
        return reply.status(500).send({Error:"Id Schema not found"})

    if(!val(req.params))
        {
        return  reply.status(400).send({Error:JSON.stringify(val.errors) as string})
            
        }

}

async function byPhone(req:FastifyRequest,reply:FastifyReply)
{
    const val=ajv.getSchema("byPhone")
    if(!val)
        return reply.status(500).send({Error:"Phone Schema not found"})
    if(!val(req.params))
        {
        return  reply.status(400).send({Error:JSON.stringify(val.errors) as string})
            
        }

}



export default {signUpVal,signInVal,byEmail,byEmailAge,byId,byPhone};



