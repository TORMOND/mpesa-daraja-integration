const express = require('express');
const app = express();
const request = require('request')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.listen(3000);




 app.get('/', (req,res)=>{
     res.send('<h1> Home Page </h1>')
    res.render('index', {title: 'Node js '});
});


// const { auth} = require('./mpesaApi.js');

app.get('/access_token', access, (req, res)=>{

   res.status(200).json({access_token: req.access_token })
})



//Registering Url
app.get('/register', access, (req,res)=> {
    let url2 = " https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl"
    let auth = "Bearer "  + req.access_token

    request(
        {
url:url2,
method: "POST",
headers:{
    "Authorization": auth
},
json: {
    "ShortCode": 600998,
    "ResponseType": "Completed",
    "ConfirmationURL": "http://192.168.43.166:3000/confirmation",
    "ValidationURL": "http://192.168.43.166:3000/validation"
}
    },
    function(error, response, body){
        if(error){
            console.log(error)
        }
        res.status(200).json(body)
    }
    
    
    )
})


app.post('/confirmation', (req, res) => {
    console.log('....................... confirmation .............')
    console.log(req.body)
})

app.post('/validation', (req, resp) => {
    console.log('....................... validation .............')
    console.log(req.body)
})

app.get('/simulate', access, (req, res) => {
    let url3 = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate"
    let auth = "Bearer " + req.access_token

    request(
        {
            url: url3,
            method: "POST",
            headers: {
                "Authorization": auth
            },
            json: {
                "ShortCode": 600978,
                "CommandID": "CustomerPayBillOnline",
                "Amount": 1,
                "Msisdn": 254799543923,
                "BillRefNumber": "testapi"
            }
        },
        function (error, response, body) {
            if (error) {
                console.log(error)
            }
            else {
                res.status(200).json(body)
            }
        }
    )
})










 const { auth } = require('./mpesaApi.js')

//Getting the access token
function access(req, res, next) {

    let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
     
    request(
        {
url: url,
headers:{
  "Authorization" : "Basic " + auth

}
        },
        (error, response, body) =>{
            if(error){
                console.log(error)
            }else{
                // res.status(200).json(body)
            
                 req.access_token = JSON.parse(body).access_token
                next()
            }

        }
    )
}



