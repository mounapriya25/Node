const sch=require("./product.js")
const exp=require("express")
const rt=exp.Router()

const insert=async(req,res)=>{
    try{
        const prd=[
            {
                "id": "1",
                "name": "Microwave",
                "price": "200",
                "category": "Appliances"
            },
            { 
            "id": "2",
            "name": "Smartphone",
            "price": "710",
            "category": "Electronics"
          },
          {
            "id": "3",
            "name": "Table",
            "price": "1500",
            "category": "Furniture"
          },
          {
            "id": "4",
            "name": "Chair",
            "price": "750",
            "category": "Furniture"
          },
          {
            "id": "5",
            "name": "T-shirt",
            "price": "200",
            "category": "Clothing"
          },
          {
            "id": "6",
            "name": "Jeans",
            "price": "400",
            "category": "Clothing"
          }]
        const result=await sch.insertMany(prd)
        res.status(200).json(result)
    }catch(err){
        console.log(err.message)
    }
}


//aggregation pipeline
const getprd=async(req,res)=>{
    try{
        //aggregation is like groupby,init we also have $sort,$limit,$skip
        const result1= await sch.aggregate([
            {
                //filters the data
               $match:{
                "price": {$gte:100},
                "category": "Clothing"
               } 
            }])
        const result2= await sch.aggregate([{
               //group and perforn aggreagation functon
               $group:{
                //in group id means based on what we need to group
                _id:"category",
                avgprice:{$avg:"$price"},
                count:{$sum:1}}

               }
            
        ])
        
        res.status(200).json({result1,message:"result 2 groping:",result2})
    }catch(err){
        console.error()
    }
}


const get=async(req,res)=>{
    try{
        const result3= await sch.aggregate([
                {
                //filters the data
               $match:{
                "category": "Clothing"
                 } 
                }
               ,{
                    //$toDouble convert string into number 
                    // with out name like totalPrice or other these functions  wont work
                    $group:{
                    _id:null, // Aggregates all matching documents into one group, it is require
                    count: { $sum: 1} , // Counts the number of matching documents
                    totalPrice: {$sum:"$price"}, 
                    minPrice: { $min: { $toDouble: "$price" } }, // Finds the minimum price
                    maxPrice: { $max: { $toDouble: "$price" } } // Finds the maximum price
                    }
               },
                {
                    $project:{
                        _id:0,
                        totalPrice:1,
                        minPrice:1,
                        maxPrice:1,
                        difference:{
                            $subtract:[{ $toDouble: "$maxPrice" },  // Ensure number type
                                { $toDouble: "$minPrice" }]
                        }
                    }
                }])

        res.status(200).json(result3)
    }catch(err){
        console.log(err)
    }
}


rt.get("/get2",get)

rt.post("/post",insert)
rt.get("/get1",getprd)
module.exports=rt