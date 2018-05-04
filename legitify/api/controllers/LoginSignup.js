
const auth = require('../../auth/jwt_auth.js')
const apputils = require('../../utils/utils.js')



//Login Api generates a json token  that expires in 24 hours
function login(req, res) {

    console.log("login caled")
    let uid = req.swagger.params.Credentials.value.username

    apputils.getUserById(uid).then(user => {
        if (user == null) {
            res.status(404).json({ message: "Error Not Found"});
        } else {
            console.log(user)
            let payload = auth.CreatePayload(user.name, user.appfbid, 'appuser')
            auth.GenerateToken(payload, function (err, token) {
                auth.writeToken(user.appfbid,token)
                res.json({ message: "success", token: token });
            })
        }
    })

}


module.exports = {
    login: login
}