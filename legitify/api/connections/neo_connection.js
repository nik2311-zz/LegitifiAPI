const neo4j = require('neo4j-driver').v1;

const uri= process.env.NEO4J_URI//'bolt://localhost:7687/db/legitify'
const user=process.env.NEO4J_USER//'neo4j'
const password=process.env.NEO4J_PASS//'dev'
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();


console.log("Connected to ",uri)

module.exports = {
    session: session
};