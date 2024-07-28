import { FastifyRequest, FastifyReply } from 'fastify';
import userServices from '../Services/user'
import { User } from '../Interface/user';


async function signUp(req: FastifyRequest, reply: FastifyReply) {
    
    try{
        const newUser: User = {
            email: (req.body as { email: string }).email,
            password: (req.body as { password: string }).password,
            name: (req.body as { name: string }).name,
            phone: (req.body as { phone: string }).phone,
            age: (req.body as { age: number }).age
        };
        const response=await userServices.signUp(newUser)
    return reply.status(200).send({...response})
    }catch(e:any)
    {
        console.error(e);
        return reply.status(500).send({ error:e.message })
    }
}
async function getUsers(req: FastifyRequest, reply: FastifyReply) {
    
    try{
        const users=await userServices.getUsers();
        return reply.status(200).send(users)
    
    }catch(e:any)
    {
        console.error(e);
        return reply.status(404).send({error:e.message});
    }
}
async function getUserByEmail(req: FastifyRequest, reply: FastifyReply) {
    
    try{
        const { email } = req.params as { email: string };
        const response= await userServices.getUserByEmail(email)
        return reply.status(200).send(response)
        
       
    
    }catch(e:any)
    {
        console.error(e);
        return reply.status(500).send({ error: e.message })
    }
}
async function getUserByPhone(req: FastifyRequest, reply: FastifyReply) {
    
    try{
        const { phone } = req.params as { phone: string };
       
        const response= await userServices.getUserByPhone(phone)
        return reply.status(200).send(response)
        
       
    
    }catch(e:any)
    {
        console.error(e);
        return reply.status(500).send({ error:e.message})
    }
}
async function deleteUserByEmail(req: FastifyRequest, reply: FastifyReply) {
    
    try{
        const { email } = req.params as { email: string };
        const response=await userServices.deleteUserByEmail(email)
        return reply.status(200).send({message:"user deleted successfully",...response})
    
    }catch(e: any)
    {
        console.error(e);
        return reply.status(500).send({ error: e.message })
    }
}
async function updateAgeByEmail(req: FastifyRequest, reply: FastifyReply)
{
    try{
        const {email,age} = req.params as {email:string,age:number}
        const age_int=Number(age)
        const res=await userServices.updateAgeByEmail(email,age_int)
        return reply.send(res)
    }catch(e:any){
        return reply.status(500).send({Error:e.message})

    }
}
async function signIn(req: FastifyRequest, reply: FastifyReply)
{
    try{
    const{email,password}=req.body as {email:string,password:string}
    const res=await userServices.signIn(email,password)
    return reply.send(res)
}catch(e:any)
{
    console.error(e)
    return reply.status(500).send({Error:e.message})
}


}
async function getUserById(req: FastifyRequest, reply: FastifyReply)
{
    try{
        const { id } = req.params as { id: string };
        const response= await userServices.getUserById(id)
        return reply.status(200).send(response)
        
       
    
    }catch(e:any)
    {
        console.error(e);
        return reply.status(500).send({ error:e.message })
    }
}
async function deleteAllUsers(req: FastifyRequest, reply: FastifyReply)
{
    try{
        const response= await userServices.deleteAllUsers()
        return reply.status(200).send(response)
        
    }catch(e:any)
    {
        return reply.status(400).send({Error:e.message})
    }
}

export default { signUp,getUsers ,getUserByEmail,getUserByPhone,deleteUserByEmail,updateAgeByEmail,signIn,getUserById,deleteAllUsers};
