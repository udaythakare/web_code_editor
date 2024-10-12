const express = require("express")
const app = express()
const bodyP = require("body-parser")
const compiler = require("compilex")
const options = { stats: true }
compiler.init(options)
app.use(bodyP.json())
app.use("/codemirror-5.65.16", express.static("C:/Users/udayt/Downloads/CodeEditor/codemirror-5.65.16"))
app.get("/", function (req, res) {
    compiler.flush(function () {
        console.log("deleted")
    })
    res.sendFile("C:/Users/udayt/Downloads/CodeEditor/index.html")
})
app.post("/compile", function (req, res) {
    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang
    if(!input){
        input = "he"
    }

    console.log(lang)
    if(lang === "Choose..."){
        return res.send({output : "choose language bitch"})
    }
    try {

        // if (lang == "Cpp") {
        //     if (!input) {
        //         var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
        //         compiler.compileCPP(envData, code, function (data) {
        //             if (data.output) {
        //                 res.send(data);
        //             }
        //             else {
        //                 res.send({ output: "error" })
        //             }
        //         });
        //     }
        //     else {
        //         var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
        //         compiler.compileCPPWithInput(envData, code, input, function (data) {
        //             if (data.output) {
        //                 res.send(data);
        //             }
        //             else {
        //                 res.send({ output: "error" })
        //             }
        //         });
        //     }
        // }

        if (lang == "Cpp") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPP(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        // Check if the compilation timed out
                        if (data.error && data.error.indexOf("Timeout") !== -1) {
                            res.send({ output: "Compilation Timeout" });
                        } else {
                            res.send({ output: "error" });
                        }
                    }
                });
            } else {

                
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        // Check if the compilation timed out
                        if (data.error && data.error.indexOf("Timeout") !== -1) {
                            res.send({ output: "Compilation Timeout" });
                        } else {
                            res.send({ output: "error" });
                        }
                    }
                });
            }
        }

        
        else if (lang == "Java") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                })
            }
            else {
                //if windows  
                var envData = { OS: "windows" };
                //else
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                })
            }
        }
        else if (lang == "Python") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                var envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
    }
    catch (e) {
        console.log("error")
    }
})

app.listen(8000)