require("dotenv").config
const environment = process.env.NODE_ENV || 'default';

const config = require(`./${environment}`).default;


export default config;
