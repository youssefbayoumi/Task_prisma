import fastify from 'fastify';
import Routes from './Routes/routes'
import config from './Config/index.config';
import crons from './Scripts/index';
import { fork } from 'child_process';



const app = fastify();

app.register(Routes,{prefix:"api/users"})


async function main()
{
    try{
        await app.listen({ port: config.PORT, host: '0.0.0.0' });
    //    // const child=fork("/Users/youssefalaa/Downloads/Scripts/temp.js")
    //     child.on('message', (message) => {
            
    //     console.log(`Received message from child: ${message}`);
    //       });
    //     child.on('exit',()=>console.log("Child process Exited!"))
    //     // crons()
         console.log(`Server is running on port ${config.PORT}`);
    }catch(e)
    { 
        console.error(e);
        process.exit(1);
    }

}
main();

