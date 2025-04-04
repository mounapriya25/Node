const sch=require("./database.js")

const insert= async (email)=>{
    try{
        console.log("insrt :",email)
        const us= await sch.auth.findOne({email});
        if(!us){
            console.log("User not found");
            return;
        }
        console.log("insrt :",us)
        const id =us._id;
        const nt= await sch.transaction.create({
                userId:id,
            })
            
        console.log(nt);
        const bt= await sch.buget.create({
            userId:id,
            category:"Food",
            limit:100
        })
        console.log(bt);
        const at=await sch.account.insertMany([
            {
                userId:id,
                name:"Card",
                amount:0,
                icon:"http://localhost:8000/images/icons8-card-96.png"
        
            },
            {
                userId:id,
                name:"Cash",
                amount:0,
                icon:"http://localhost:8000/images/icons8-visa-96.png"
        
            },
            {
                userId:id,
                name:"Savings",
                amount:0,
                icon:"http://localhost:8000/images/icons8-savings-96.png"
        
            }
            
    ])

    //categories
    console.log(at);
    const ct= await sch.category.insertMany([
        {
            userId:id,
            name:"Coupons",
            type:"income",
            icon:"http://localhost:8000/images/icons8-coupon-96.png"
    
        },
        {
            userId:id,
            name:"Sale",
            type:"income",
            icon:"http://localhost:8000/images/icons8-sale-96.png"
    
        },
        {
            userId:id,
            name:"Salary",
            type:"income",
            icon:"http://localhost:8000/images/icons8-salary-96.png"
    
        },
        {
            userId:id,
            name:"Rent",
            type:"income",
            icon:"http://localhost:8000/images/icons8-rent-96.png"
    
        },
        {
            userId:id,
            name:"Refunds",
            type:"income",
            icon:"http://localhost:8000/images/icons8-euro-money-96.png"
    
        },
        {
            userId:id,
            name:"Lottery",
            type:"income",
            icon:"http://localhost:8000/images/icons8-finance-document-96.png"
    
        },
        {
            userId:id,
            name:"Grants",
            type:"income",
            icon:"http://localhost:8000/images/icons8-gift-96.png"
    
        },

        
        {
            userId:id,
            name:"Bills",
            type:"expense",
            icon:"http://localhost:8000/images/icons8-bill-48.png"
    
        },
        {
            userId:id,
            name:"Baby",
            type:"expense",
            icon:"http://localhost:8000/images/icons8-baby-bottle-48.png"
    
        },
        {
            userId:id,
            name:"Beauty",
            type:"expense",
            icon:"http://localhost:8000/images/icons8-lip-gloss-48.png"
    
        },
        {
            userId:id,
            name:"Car",
            type:"expense",
            icon:"http://localhost:8000/images/icons8-car-96.png"
    
        },
        {
            userId:id,
            name:"Clothing",
            type:"expense",
            icon:"http://localhost:8000/images/icons8-clothes-96.png"
    
        },
        {
            userId:id,
            name:"Education",
            type:"expense",
            icon:"http://localhost:8000/images/icons8-education-96.png"
    
        },
        {
            userId:id,
            name:"Electronics",
            type:"expense",
            icon:"http://localhost:8000/images/icons8-electronics-96.png"
    
        },
        {
            userId:id,
            name:"Entertainment",
            type:"expense",
            icon:"http://localhost:8000/images/icons8-clapperboard-96.png"
    
        },
        {
            userId:id,
            name:"Food",
            type:"expense",
            icon:"http://localhost:8000/images/icons8-meal-48.png"
    
        },
        {
            userId:id,
            name:"Health",
            type:"expense",
            icon:"http://localhost:8000/images/icons8-health-96.png"
    
        },
        {
            userId:id,
            name:"Home",
            type:"expense",
            icon:"http://localhost:8000/images/icons8-home-96.png"
    
        },
        {
            userId:id,
            name:"Insurance",
            type:"expense",
            icon:"http://localhost:8000/images/icons8-insurance-96.png"
    
        },
        {
            userId:id,
            name:"Shopping",
            type:"expense",
            icon:"http://localhost:8000/images/icons8-shopping-96.png"
    
        },
        {
            userId:id,
            name:"Sport",
            type:"expense",
            icon:"http://localhost:8000/images/icons8-sports-96.png"
    
        },
        {
            userId:id,
            name:"Tax",
            type:"expense",
            icon:"http://localhost:8000/images/icons8-tax-96.png"
    
        },
        {
            userId:id,
            name:"Telephone",
            type:"expense",
            icon:"http://localhost:8000/images/icons8-telephone-96.png"
    
        },        {
            userId:id,
            name:"Transportation",
            type:"expense",
            icon:"http://localhost:8000/images/icons8-train-96.png"
    
        }
        

        
        
])
console.log(ct);
    }catch(err)
    {
        console.log(err.message)
    }
      

}


module.exports=insert