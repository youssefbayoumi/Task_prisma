import redis from "../Cache/cacheClient";

async function clearCache()
{
    try{
        await redis.flushall();
        console.log("Cache cleared successfully")
    }catch(e:any)
    {
        console.error("Error clearing Cache",e.message)
    }
}
export default clearCache;