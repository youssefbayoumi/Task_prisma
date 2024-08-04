import Redis  from "ioredis"
import config from "../Config/index.config"
// const redis =new Redis({
//    host: config.cacheConfig.host,
//    port: config.cacheConfig.port,
//    password: config.cacheConfig.password
// }
// )
const redis = new Redis({
   host: 'localhost',
   port: 6379
});

export default redis;