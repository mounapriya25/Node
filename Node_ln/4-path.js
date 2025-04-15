const pth=require("path")
console.log(pth.dirname(__filename),"\nfilename:",pth.basename(__filename))
console.log(pth.extname(__filename))

//create a path
const joinedpt=pth.join("/Mouna","priya","reddy")
console.log(joinedpt)
//add path to dir by using resolve
const r=pth.resolve('/Mouna','priya','reddy')
console.log("resolved:",r)
//normilize simple fies the path
const n=pth.normalize('/Mouna/priya/reddy/../node/learning')
console.log("normalize:",n)