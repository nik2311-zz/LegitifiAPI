
var util = require('util');

var neo_conn = require('../connections/neo_connection')

module.exports = {
    getuser: getuser
};

function getuser(req, res) {
    var uid = req.swagger.params.id.value || null;
    const session = neo_conn.session
    const resultPromise = session.run(
        'MATCH (a:UserNode {appFBId: $appFBId}) RETURN a',
        { appFBId: uid }
    );
    return resultPromise.then(result => {
        
        if(result.records.length > 0){
            const singleRecord = result.records[0];
            const node = singleRecord.get(0);
            res.json({appfbid:node.properties.appFBId,name:node.properties.fullName});
        }
        else{
            res.status(404).json({message:"Not Found"})
        }
        
    },error =>{


        console.log("errrrrrrrr!!!!!!!!!!!",error)
        res.status(500).json({message:"Not Found"})
        
    });
}