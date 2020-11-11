const axios = require('axios')
const qs = require('querystring')
const http = require('http')
const { exit } = require('process')
const { SSL_OP_EPHEMERAL_RSA } = require('constants')
const port = 3001


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


console.log('requesting token ...')

//FIX THIS BEFORE PRODUCTION *********

// //sandbox
// //doesnt return any items for browse api
// const clientId = 'SamuelBu-couture-SBX-6500f24f5-cac74fd4'
// const secret = 'SBX-500f24f57d7b-7e81-4fa3-82da-8485'
// const authUrl = 'https://api.sandbox.ebay.com/identity/v1/oauth2/token'



//production
const clientId = 'SamuelBu-couture-PRD-8e65479ab-a2646ae5'
const secret = 'PRD-e65479ab06a1-2cb2-4659-9fd7-da73'
const authUrl = 'https://api.ebay.com/identity/v1/oauth2/token'


let buff =  new Buffer(clientId+':'+secret)
const cred = buff.toString('base64')


const getToken = async () => {

    console.log("get token")

    const body = {
        grant_type:'client_credentials',
        scope:'https://api.ebay.com/oauth/api_scope'
    }

    axios({

        method: 'POST',
        url: authUrl,
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization':'Basic '+cred,
        },
        data: qs.stringify(body)
    }).then( token => {

        token = token.data.access_token

        const server = http.createServer( (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.write(token)
            res.end()
        })
        server.listen(port, function(error){
            if(error){
                console.error(error)
            }else{
                console.log("Token on port "+port)
            }
        })
    }).catch(err =>{
        console.log(err)
    })
}

getToken()
