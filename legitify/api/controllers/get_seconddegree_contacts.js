
var util = require('util');

const neo_conn = require('../connections/neo_connection')


const query = 'MATCH (me:UserNode {appFBId:$appFBId})-[pc1:phone_contacts]-(p2:PhoneContact)-[ur2:user_phone_number]-(u:UserNode)-[pc2:phone_contacts]-(pc3:PhoneContact)-[ur3:user_phone_number]-(u3:UserNode) where not (me)-[:phone_contacts]-()-[:user_phone_number]-(u3) return u3 AS connection'
module.exports = {
    getSeconddegreeConnections: getSeconddegreeConnections
};


function getSeconddegreeConnections(req, res) {
    let uid = req.swagger.params.id.value || null;
    const session = neo_conn.session;
    const resultPromise = session.run(query,
        { appFBId: uid }
    );
    return resultPromise.then(result => {
        
        
        if(result.records.length > 0){
            let connections = []
            result.records.forEach(user =>{
                let node = user.get('connection')
                connections.push({appfbid:node.properties.appFBId,name:node.properties.fullName})
            })
            res.json(connections);
        }
        else{
            res.status(404).json({message:"Not Found"})
        }
        
    },error =>{


        console.log("errrrrrrrr!!!!!!!!!!!",error)
        res.status(500).json({message:"Internal Server Error"})
        
    });
}