const conr=require("./bookcontroller")
const exp=require("express")
const rt=exp.Router()

rt.post("/postbook",conr.crtbook)
rt.post("/postauth",conr.crtauth)
rt.get("/get/:id",conr.getbk)

module.exports=rt