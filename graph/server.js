const {ApolloServer}=require("@apollo/server")
const {startStandaloneServer}=require("@apollo/server/standalone")
const typeDefs=require("./schm.js")
const resolvers=require("./resolver.js")


async function startserver(){
    const server=new ApolloServer({
        typeDefs,
        resolvers,
    })
    const  {url}=await startStandaloneServer(server,{
        listen:{port:8000}
    })
    console.log("connecting...")
}

startserver()