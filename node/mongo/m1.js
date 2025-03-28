const mongoose= require("mongoose")
mongoose.connect("mongodb://localhost:27017/college")

console.log('created')
const userschema= new mongoose.Schema({
   
        "sid": Number,
        "sname": String,
        "branch": String,
        "year": Number,
        "lang":[String]
      
})
const User=mongoose.model('stud',userschema);


async function runQuery(){

    try{
        //create a new document
       const newuser = await User.create(
            {
   
                "sid":3 ,
                "sname": 'sona',
                "branch": 'cai',
                "year": 4,
                "lang":['c','java']

              
        })
       
        console.log('created ',newuser)
       /*const disp=await User.find({})
       const d1=await User.findOne({year:2})
       const d2=await User.find().select("sname year")
       const d3=await User.find().limit(2).skip(1)//it display only 2 but skip the first user
       const d4=await User.find().sort({'year':-1})//it sort in descending order if we give 1 then it ascending order
       const d5=await User.countDocuments()

      //const d6=await User.findById(newuser.id)
      console.log('hi',d2,'hi',d3,'sort',d4,"count:",d5)*/

      //delete
      /*const delte=await User.deleteMany({'sid':1}) 
      const delte1=await User.deleteOne({'sid':1}) 
      const d6=await User.findByIdAndDelete(newuser._id)
      console.log(delte)*/

    //update
    const update= await User.findByIdAndUpdate(newuser._id,{$set:{sid:5}},{new: true})
    const update1= await User.updateOne(newuser._id,{$set:{sid:6}},{new: true})
    console.log(update1,'updated')
    }catch(err){
        console.log(err.message)
    }
    finally{
        await mongoose.connection.close()
    }

}
runQuery();
    
