/*
if reading data or waiting for something these tasks calles asynchronous means they 
dont stop the running of rest of code and js doesnot wait for those task to finish so it do next,sync: means normal code
when these tasks are finish then it can be handle by then,catch /async,await, when task finsh js stop other and handle it

promises are used to just to handle the result of these tasks ,after finish if fail reject orelse resolve 
asyn tell the computer that this function deal with asycronic task
await tell to program that pause only asyn function until the resolved then continue 

*/

 function wait(time){
    return new Promise((res)=>setTimeout(res,time))
}
async function greet(name){
    await wait(2000)//mili sec
    console.log(` Hello ${name}!`)
} 
greet('mouna')

 function divide() {
    try{
        const a=2
        if(a!==0){
            console.log(4/a)
        } 
        else{
            console.log('not')
        }
    }
    catch(err){
        console.log(err.message)
        
    }
    
}
async function show(){
    await divide()
}
show()