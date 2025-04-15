
const l1=require('./2-lib.js')// here we are import entire file then use it 
console.log(l1.sum(1,2))
console.log(l1.ad(9,2));
console.log(__filename,'dir:',__dirname);

try{
    console.log(l1.divide(4,0))
}
catch(err){
    console.log(l1.divide(4,2),'its working')
}



