/*server.js*/
import express from "express";
import { PythonShell } from "python-shell";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import fs from "fs";

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Landing Page");
});

app.post('/SVM/:width/:height', (req, res) => {
    let width = req.params.width;
    let height = req.params.height;
    let pixelJSON = req.body;
    let pixels = pixelJSON.toString();

    getSVM(pixels, width, height, res);
});

app.listen(port, () => {
    console.log('Server running at http://' + hostname + ':' + port + '/');
});

async function getSVM(pixelData, width, height, res) {

    const resultOCSVM = await runSVM("OCSVM", pixelData, width, height);

    const resultSVM = await runSVM("SVM", pixelData, width, height);

    let returnData;

    if (resultOCSVM <= -50000) {
        returnData = "NO";
    } else {
        switch (resultSVM) {
            case 0:
                returnData = "A";
                break;
            case 1:
                returnData = "B";
                break;
            case 2:
                returnData = "C";
                break;
            case 3:
                returnData = "D";
                break;
            case 4:
                returnData = "E";
                break;
            case 5:
                returnData = "F";
                break
            case 6:
                returnData = "G";
                break;
            case 7:
                returnData = "NO";
                break;
            case 8:
                returnData = "I";
                break;
            case 9:
                returnData = "J";
                break
            default:
                returnData = "NO";
        }
    }

    res.json(returnData);

}

function runSVM(type, pixelData, width, height) {

    return new Promise(resolve => {

        let result = "";

        var options = {
            args: [width, height]
        }

        writeToFile(type, pixelData);

        let pyShell;

        if (type == "SVM") {
            pyShell = new PythonShell("../python/ModelRunning.py", options);
        } else {
            pyShell = new PythonShell("../python/ModelRunningOneClass.py", options);
        }
        pyShell.on('message', function (message) {
            result = result + message;
        });

        pyShell.end(function (err, code, signal) {
            console.log("Exit code: " + code);
            console.log("Exit signal: " + signal);
            console.log("Exit error: " + err);
            let data = parseInt(result);
            console.log(data);
            resolve(data);

        })

    })

}

function writeToFile(location, data) {

    fs.writeFile("../python/imageTextDump" + location + ".txt", data, function (err) {

        if (err) {
            return console.log(err);
        };

    });

}

function convertToArray(data) {

    let newNumber = "";
    let outArray = Array.apply(null, Array(10)).map(function () { });
    let outArrayIndex = 0;

    for (let i = 0; i < data.length; i++) {

        let char = data[i]

        if ( (char >= "0" && char <= "9") || char == "." || char == "-") {

            newNumber = newNumber + char;

        } else if ((char <= "0" || char >= "9") && char != "." && char != "-" && newNumber != "") {

            outArray[outArrayIndex] = Number(newNumber);
            outArrayIndex++;
            newNumber = "";

        }

    }

    return outArray;

}