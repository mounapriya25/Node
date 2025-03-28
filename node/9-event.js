const emit=require('events')
const e=new emit()//e is object of event emitter & listen to events
e.on('greet',(name)=>{//attach lister(paying attention ) to event
    console.log(`hello ${name}`)
})
e.emit('greet','mouna')//fire the event


//by using class
class evt extends emit{
    gret(name){
        console.log('starting...')
        this.emit('greet',name,"hi")
    }
}
const g=new evt()
g.on('greet',(name ,g)=>{
    console.log(`hello ${name} ,${g}`)
})
g.gret('priya')