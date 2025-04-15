
const fs=require("fs")
const pth=require("path")

const folder=pth.join(__dirname,"data");
if(!fs.existsSync(folder)){// it check whether that is exist or not
    fs.mkdirSync(folder);//to create folder 
    console.log("folder created")
}

//files
const file=pth.join(folder,"fle.txt");
//if(!fs.existsSync(file)){ we may or maynot use it it is not nessary to check
fs.writeFileSync(file,"I am creating the file ")//to create file
console.log("file created")//}

//read
let read=fs.readFileSync(file,"utf-8")// without utf-8 property which include the text whichout loss
console.log(read,'before')

//append
const append=fs.appendFileSync(file,"\n I am appending the file")// without utf-8 property which include the text whichout loss

read=fs.readFileSync(file,"utf-8")// without utf-8 property which include the text whichout loss
console.log(read)


// file using async
const file1=pth.join(folder,'afile');
fs.writeFile(file1,'helloo',(err)=>{// we should throw error for async
    if (err) throw err;
    console.log("file1 created")
}) 
fs.readFile(file1,"utf-8",(err,data)=>{//we can give 'index.txt'
    if (err) throw err;
    console.log(data)
})
fs.appendFile(file1,'mouna',(err)=>{// we should throw error for async
    if (err) throw err;
    console.log("file1 created")
    fs.readFile(file1,"utf-8",(err,data)=>{//if u want to read after append orther wise no need
        if (err) throw err;
        console.log(data)
    })

})