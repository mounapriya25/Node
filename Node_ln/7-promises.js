//callbacks
function call(name,grt){
    console.log(`hello ${name}`)
    grt()
}
function greet(){
    console.log(`A very special good morning!!!!!!!`)
}
call('mouna',greet)

//promises  it is used when u  have to wait something, instaed of callbacks we use this
// when the prm is succ then it resolve or else it is rejected with reason
function prom(time){
    return new Promise((resolve)=>setTimeout(resolve,time))
}
prom(200).then(()=>console.log('start!!!'))
console.log('hi')
const p= new Promise((resolve,reject)=>{
    const a= 0;
    if(a!==0){
        resolve(`division :${4/a}`)
    }
    else{
        reject("not possible")
    }
})
p.then((result)=>{
    console.log(result,'FFFF')

}).catch((err)=>{console.log(err)})