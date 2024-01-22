let fs = require('fs')
let axios = require('axios')

function cat(path){
    fs.readFile(path, "utf8", function(err,data ) {
        if(err){
            console.log("ERROR: ",err)
            process.kill(1)
        }
        console.log(data)
      });
}


async function webCat(path){
    let res = await axios.get(path)
    return res
}

async function webCatWrite(path,file){
    fs.writeFile(file,webCat(path),"utf8", function(err){
        if (err){
            console.log(err)
            process.exit(1)
        }
        console.log("Successfuly wrote to file")
    })
}

function catWrite(file,path){
    fs.writeFile(file,cat(path),"utf8", function(err){
        if (err){
            console.log(err)
            process.exit(1)
        }
        console.log("Successfuly wrote to file")
    })
}

if (process.argv[2] =="--out"){
    let file = process.argv[3]
    let path = process.argv[4]
    if (path.substring(0,4) == "http"){
        webCatWrite()
    }
    else{
        catWrite(file,path)
    }
}
else{
    let path = process.argv[2]
    if (path.substring(0,4) == 'http'){
        webCat(path)
    }
    else{
        cat(path)
    }
}