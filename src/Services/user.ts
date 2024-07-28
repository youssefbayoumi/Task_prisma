import userRepo from "../Repository/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from "../Interface/user"
import config from '../Config/index.config';



const creatToken = (_id: string) => {
    return jwt.sign({ _id: _id },config.SECRET , { expiresIn: '1d' });
}

async function signUp(newUser:User) {
    if(!isValidEmail(newUser.email))
        {
            throw Error("Email not valid")
        }
    if(newUser.age<=0)
        {
            throw Error("Age not valid")
        }
    if(newUser.password.length<8)
        throw Error("Password not strong enough!")

    if(await userRepo.getUserByEmail(newUser.email)){
        throw Error("Email already signed up")
    }
   
    try{
        const salt=await bcrypt.genSalt(10);
        const hash=await bcrypt.hash(newUser.password,salt)
        const response = await userRepo.save({...newUser,password:hash})
        const token = creatToken(response.id)
    return {message:"User created successfully",token:token,user:response}
    }catch(e:any)
    {
        console.error(e);
        throw Error(e.message)
    }
}
async function getUsers() {
    
    try{
        const users = await userRepo.getUsers();
        if(users)
        return {users}
    else{
        throw Error("No users found!")
    }
      
    
    }catch(e:any)
    {
        throw Error(e.message)
    }
}
async function getUserByEmail(email:string) {
    if(!isValidEmail(email))
    {
        throw Error("Email not valid!")
    }
    
    try{
        const response=await userRepo.getUserByEmail(email)
        console.log(response)
        if(response)
        return {user:response}
    else{
        throw Error("User not found!")
    }
    
    }catch(e:any)
    {
        throw  Error(e.message )
    }
}
async function getUserByPhone(phone:string) {    
        try{
            const response=await userRepo.getUserByPhone(phone)
            if(response)
            return {user:response}
        else{
            throw Error("User not found!")
        }
        }catch(e:any)
        {
            throw Error(e.message)
        }
}
async function deleteUserByEmail(email:string) {
    
    try{
        const response=await userRepo.deleteUserByEmail(email)
        return {response}
        
    
    }catch(e:any)
    {
       
        throw new Error(e.message)
    }
}
async function updateAgeByEmail(email:string,age:number) {
    try{
        const isEmailThere=await userRepo.getUserByEmail(email)
        if(!isEmailThere){
            // return { Error:"Email not signedUp!"}
            throw Error("Email not signed up")
            }
        const response=await userRepo.updateAgeByEmail(email,age)
        if(response)
        return {user:response}
    else throw Error("Erro while updating Age")
    }catch(e:any)
    {
        return {error:e.message}
    }
    
}
async function signIn(email:string,password:string)
{
    try{
        if(!email||!password)
            throw Error("All fields must be filled!")
        if(!isValidEmail(email))
            throw Error("Invalid Email")
        const user=await userRepo.getUserByEmail(email)
        if(!user)
            throw Error ("Email not signed up")
        const match=await bcrypt.compare(password,user.password)
        if(!match)
            throw Error("Incorrect passsword")
        const token=creatToken(user.id)
        return {token:token}



    }catch(e:any)
    {
        return {Error:e.message}
    }
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
async function getUserById(id:string)
{
    try{
        const response=await userRepo.getUserById(id)
        if(response)
        return {user:response}
    else{
        throw Error("User not found")
    }
    }catch(e:any)
    {
        throw Error(e.message)
    }
}
async function deleteAllUsers()
{
    try{
        const response=await userRepo.deleteAllUsers()
        if(response)
        return response
    else{
        throw Error("Error deleting users!")
    }
    }catch(e:any)
    {
        throw Error(e.message)
    }

}

export default { signUp,getUsers ,getUserByEmail,getUserByPhone,deleteUserByEmail,updateAgeByEmail,signIn,getUserById,deleteAllUsers};
