

exports. sum =(a,b)=>{
    return a+b;
}

exports. ad= (a,b)=>{// exporting in js and html +js is different
     //single js is run in node it doesnt support it  we need to make changes in pakage,but js in brower can support that export and import
    return a+b;
}

exports.divide=(i,j)=>{
    if(j === 0){
        throw new Error("cannot divided")
    }
    return i/j
}

// or we can export all once
//module.exports={sum,divide,ad}
