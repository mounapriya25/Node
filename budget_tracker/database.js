const mg=require("mongoose");
//authentication
const auth_schm= new mg.Schema({
    username:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true,
    }
})
const auth=mg.model("Authentication",auth_schm);

//budget
const buget_sch= new mg.Schema({
    userId:{
        type:mg.Schema.Types.ObjectId,
        ref:"Authentication"
    },
    category:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    limit:{
        type:Number,
        required:true,
        trim:true,
        default:0
    },
    spent:{
        type:Number,
        trim:true,
        default:0
    },
    remaining:{
        type:Number,
        trim:true,
        default:0
    },
    date:{
        type:Date,
        trim:true,
        default:Date.now
    }
})

const buget= mg.model("Budget",buget_sch);


//transaction
const transaction_sch= new mg.Schema({
    userId:{
        type:mg.Schema.Types.ObjectId,
        ref:"Authentication"
    },
    typename:{
        type:String,
        trim:true,
        required:true,
        default:"Expense"
    },
    category:{
        type:String,
        required:true,
        trim:true,
        default:"Food"
    },
    amount:{
        type:Number,
        required:true,
        trim:true,
        default:0
    },
    account1:{
        type:String,
        trim:true,
        required:true,
        default:"Cash"
    },
    account2:{
        type:String,
        trim:true,
    },
    date:{
        type:Date,
        trim:true,
        default:Date.now
    },
    note:{
        type:String,
        trim:true,
    }
})

const transaction=mg.model("Transaction",transaction_sch);

//Account
const account_sch= new mg.Schema({
    userId:{
        type:mg.Schema.Types.ObjectId,
        ref:"Authentication"
    },
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    amount:{
        type:Number,
        required:true,
        trim:true,
        default:0
    },
    icon:{
        type:String,
        trim:true,
        default:" "
    }
})

const account=  mg.model("Account",account_sch);

//category
const cat_sch= new mg.Schema({
    userId:{
        type:mg.Schema.Types.ObjectId,
        ref:"Authentication"
    },
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
   type:{
       type:String,
        required:true,
        trim:true,
    },
    icon:{
        type:String,
        trim:true,
    }
})

const category=mg.model("category",cat_sch);
module.exports={auth,buget,transaction,account,category}

