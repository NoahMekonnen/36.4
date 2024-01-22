let fs = require('fs')

function cat(path){
    fs.readFile(path, "utf8", function(err, data) {
        if(err){
            console.log("ERROR: ",err)
            process.kill(1)
        }
        console.log(data)
      });
}

cat("./myFile.txt")