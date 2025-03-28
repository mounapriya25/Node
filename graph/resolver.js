
const products=require("./prd.js")
const resolver={
    Query:{
        products:()=>products,
        product: (_, { id }) => products.find((product) => product.id === id),
    }
}
module.exports=resolver