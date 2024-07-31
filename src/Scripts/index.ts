import cron from 'node-cron'
import clearCache from './clearCache';
function crons(){
cron.schedule('37 * * * *',async ()=>clearCache()); 
}

// // import {TimerBasedCronScheduler} from 'cron-schedule/schedulers/timer-based.js'

// function crons(){
//     TimerBasedCronScheduler.setInterval('37 * * * *',async ()=>clearCache()); 
//    }


export default crons

