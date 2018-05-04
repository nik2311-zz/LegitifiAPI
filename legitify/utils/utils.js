
var util = require('util');

var neo_conn = require('../api/connections/neo_connection')


function getUserById(userId) {

    const session = neo_conn.session
    const resultPromise = session.run(
        'MATCH (a:UserNode {appFBId: $appFBId}) RETURN a',
        { appFBId: userId }
    );
    return resultPromise.then(result => {

        if (result.records.length > 0) {
            const singleRecord = result.records[0];
            const node = singleRecord.get(0);
            return { appfbid: node.properties.appFBId, name: node.properties.fullName };
        }
        else {
            return null
        }

    }, error => {


        console.log("errrrrrrrr!!!!!!!!!!!", error)
        return null

    });
}



module.exports = {

getUserById:getUserById

}