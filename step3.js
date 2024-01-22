let fs = require('fs')
let axios = require('axios')
let process = require('process')

// function cat(path){
//     fs.readFile(path, "utf8", function(err,data ) {
//         if(err){
//             console.log("ERROR: ",err)
//             process.kill(1)
//         }
//         console.log(data)
//         return data
//       });
// }


// async function webCat(path){
//     let res = await axios.get(path)
//     return res
// }

// async function webCatWrite(path,file){
//     fs.writeFile(file,await webCat(path),{encoding:"utf8",flag:'a'},function(err){
//         if (err){
//             console.log(err)
//             process.exit(1)
//         }
//         console.log("Successfuly wrote to file")
//     })
// }

// function catWrite(file,path){
//     fs.writeFile(file,cat(path),{encoding:"utf8",flag:'a'}, function(err){
//         if (err){
//             console.log(err)
//             process.exit(1)
//         }
//         console.log("Successfuly wrote to file")
//     })
// }

// if (process.argv[2] =="--out"){
//     let file = process.argv[3]
//     let path = process.argv[4]
//     if (path.substring(0,4) == "http"){
//         webCatWrite()
//     }
//     else{
//         catWrite(file,path)
//     }
// }
// else{
//     let path = process.argv[2]
//     if (path.substring(0,4) == 'http'){
//         webCat(path)
//     }
//     else{
//         cat(path)
//     }
// }

function handleOutput(text,output){
    if (output){
        fs.writeFile(output,text,'utf8', function(err){
            if (err){
                console.log("Error: ",err)
                process.exit(1)
            }
        });
    }
    else{
        console.log(text)
    }
}

function cat1(path){
    fs.readFile(path, "utf8", function(err,data ) {
        if(err){
            console.log("ERROR: ",err)
            process.kill(1)
        }
        console.log(data)
        return data
      });
}


async function webCat1(path){
    let res = await axios.get(path)
    console.log(res)
}


function cat(path,output){
    fs.readFile(path, "utf8", function(err,data){
        if (err){
            console.log("Error: ",err)
            process.exit(1)
        }
        handleOutput(data, output)
    })
}

async function webCat(path,output){
    try{
        let res = await axios.get(path)
        handleOutput(res.data,output)
    }
    catch{
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }

}


if (process.argv[2] =="--out"){
    let file = process.argv[3]
    let path = process.argv[4]
    if (path.substring(0,4) == "http"){
        webCat(path,file)
        console.log("HIIIII")
        }
    else{
        cat(path,file)
        }
    }
else{
    let path = process.argv[2]
    if (path.substring(0,4) == "http"){
        webCat1(path)
        }
    else{
        cat1(path)
        }
    }
