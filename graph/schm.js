const gpl =require("graphql-tag")
//! mandatory
//types
const typeDef=gpl`
    type Product{
    id:ID!
    name:String!
    price:Float!
    category:String
    }
    type Query{
    products:[Product!]!
    product(id:ID!):Product
    }

`
module.exports=typeDef