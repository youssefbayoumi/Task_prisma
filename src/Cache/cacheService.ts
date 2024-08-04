import redis from "./cacheClient";
import { User } from "@prisma/client";

// const get=async (key:string)=>
//     {

//     }

async function get(key: string) {
  try {
    const res = await redis.get(key);
    if (!res) return null;
    await redis.expire(key, 3600);
    return JSON.parse(res);
  } catch (e: any) {
    throw Error(e.message);
  }
}
async function setHash(id: string, value: object) {
  try {
    //array with values
    const multi = redis.multi();
    const key = `user:${id}`;
    const res = multi.hset(key, value);
    //only add the list if it is already present
    if ((await redis.exists("AllUsers")) === 1) multi.sadd("AllUsers", id);
    await multi.exec();
    await redis.expire(key, 3600);
    return res;
  } catch (e: any) {
    throw Error(e.message);
  }
}
async function getHash(id: string) {
  try {
    const key = `user:${id}`;
    const res = await redis.hgetall(key);
    if (Object.keys(res).length === 0) return null;
    await redis.expire(key, 3600);
    if ((await redis.exists("AllUsers")) === 1) redis.sadd("AllUsers", id);
    return res;
    //  return Object.keys(res).length === 0 ? null : res;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

async function del(key: string[]) {
  try {
    const res = await redis.del(...key);
    return res;
  } catch (e: any) {
    throw Error(e.message);
  }
}
async function setAllUsers(users: User[]) {
  const multi = redis.multi();
  for (const user of users) {
    const userKey = `user:${user.id}`;
    multi.hset(userKey, user);
    multi.sadd("AllUsers", user.id);
  }
  await multi.exec();
}
async function getAllUsers(): Promise<User[] | null> {
  //   const userIDs = await redis.smembers("AllUsers");
  const userIDs = ["james", "john", "jane", "jake", "josh"];

  const pipeline = redis.pipeline();
  for (const id of userIDs) {
    pipeline.hgetall(`user:${id}`);
  }
  const results = await pipeline.exec();

  if (
    results &&
    results.length > 0 &&
    !results.some(([result]) => result === null)
  ) {
    return results.map((result) => result[1] as User);
  }

  return null;
}

export default { get, getHash, setHash, del, setAllUsers, getAllUsers };
