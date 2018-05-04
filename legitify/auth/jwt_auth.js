const jwt = require('jsonwebtoken')
const appconst = require('../constants/appconstants.js')
const apputils = require('../utils/utils.js')


var tokens = {}
var users = []



function CreatePayload(username,userid,type){
    let payload = {'sub':'legit','role':['appuser'],'username':username,'type':type,'uid':userid}
    return payload
}

function GenerateToken(payload, callback) {
    console.log(payload)
    jwt.sign(payload, appconst.SECRET_KEY, {
        expiresIn: 24 * 60 * 60 // expires in 24 hours
    }, function (err, token) {
        callback(err, token)
    });

}


function writeToken(user, token) {
    console.log("Writing token : ",token,user)
}

function getTokenValue(token, callback) {

    jwt.verify(token, appconst.SECRET_KEY, function (err, payload) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, payload)

        }
    })
}



function VerifyUser(req, authOrSecDef, scopesOrApiKey, callback) {
    if(req.path== '/login'){
        callback(null)
    }
    else if (req.headers['x-access-token']) {
        let token = req.headers['x-access-token']
        getTokenValue(token, function (err,payload) {

            if (payload == null) {
                callback(Error("cant access"))
            } else {
                apputils.getUserById(payload.uid).then(user =>{
                    if(user == null){
                        callback(Error("Wrong  Token"))
                    }else{
                        callback(null)
                    }

                })
                
            }
        })
    } else {
        callback(Error("Access Token Missing"))
    }

}



module.exports = {
    GenerateToken: GenerateToken,
    writeToken: writeToken,
    getTokenValue: getTokenValue,
    VerifyUser:VerifyUser,
    CreatePayload:CreatePayload
};