import path from 'path';
import express from 'express';
import json from './mockAPI.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import FormData from 'form-data';
import fetch from 'node-fetch';


const app = express()
dotenv.config();

const baseUrl = process.env.BASE_URL;
const apiKey = process.env.API_KEY;

// Middleware
app.use(express.static('dist'))
app.use(cors())

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Return static web
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})


// Handle meancloud request
const processData = async(req, res) => {

    const formdata = new FormData();
    formdata.append("key", apiKey);
    formdata.append("txt", req.body.text);
    formdata.append("lang", "en");

    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    const response = await fetch(`${baseUrl}`, requestOptions)
    
    try{
        const data = await response.json();
        console.log('response', data)
        res.send(data);
    }catch(error){
        console.log("error", error);
    }
}

// receive request from client and handle data
app.post('/processData', processData)

// server hosted on port 8080
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

// for testing purpose
app.post('/test', function (req, res) {
    res.send(json)
})

