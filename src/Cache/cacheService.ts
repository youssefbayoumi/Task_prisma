import redis from "./cacheClient";

// const get=async (key:string)=>
//     {

//     }

async function get(key:string) {
    try{
        const res=await redis.get(key)
        if(!res)
            return null
        await redis.expire(key,3600)
        return JSON.parse(res)
    }catch(e:any)
    {
        throw Error(e.message)
    }
    
} 
async function setHash(key:string,value:object) {
    try{
        //array with values
        const entries=Object.entries(value).flat();
        const res=await redis.hset(key,...entries)
        await redis.expire(key,3600)
        return res
    }catch(e:any)
    {
        throw Error(e.message)
    }
    
} 
async function getHash(key: string) {
    try {
        const res = await redis.hgetall(key);
        if(Object.keys(res).length===0)
            return null
        await redis.expire(key,3600)
        return res
        //  return Object.keys(res).length === 0 ? null : res;
    } catch (e: any) {
        throw new Error(e.message);
    }
}

async function del(key:string[]) {
    try{
        const res=await redis.del(...key)
        return res
    }catch(e:any)
    {
        throw Error(e.message)
    }
    
} 
 async function sAdd(key:string,value:string[])
 {
    try{
        const res=await redis.sadd(key,...value)
        await redis.expire(key,3600)
        return res
    }catch(e:any)
    {
        throw Error(e.message)
    }
 }
async function sGet(key:string)
{
    try{
        const res=await redis.smembers(key)
        if(res.length<=0)
            return null

        await redis.expire(key,3600)
        return res;
    }catch(e:any)
    {
        throw Error(e.message)
    }

}



export default {get,getHash,setHash,sAdd,sGet,del}