let fs = require('fs')
let axios = require('axios')

function cat(path){
    fs.readFile(path, "utf8", function(err, data) {
        if(err){
            console.log("ERROR: ",err)
            process.kill(1)
        }
        console.log(data)
      });
}


async function webCat(path){
    let res = await axios.get(path)
    console.log(res)
    return res
}

let path = process.argv[2]

if (path.substring(0,4) == 'http'){
    webCat(path)
}
else{
    cat(path)
}