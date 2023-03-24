var http = require("https");

exports.main = async (event, callback) => {
  
  const token = process.env.YOURTOKEN
  
  //define variables
  const recordId = event.inputFields['hs_object_id'];
  
  // define reusable function
  function findAssociations(objectType, objectId, toObjectType) {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'GET',
        hostname: 'api.hubapi.com',
        port: null,
        path: `/crm/v4/objects/${objectType}/${objectId}/associations/${toObjectType}?limit=500`,
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const req = http.request(options, (res) => {
        const chunks = [];

        res.on('data', (chunk) => {
          chunks.push(chunk);
        });

        res.on('end', () => {
          const body = Buffer.concat(chunks).toString();
          resolve(JSON.parse(body).results);
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.end();
    });
  }
  
  // use function
  
  var objectType = "tickets"; // object of the record enrolled in the workflow. Can be any of contacts, companies, deals, tickets, custom object (e.g. 2-XXXXXX), etc.
  var objectId = recordId;
  var toObjectType = "contacts"; // object of the associations you seek. Can be any of contacts, companies, deals, tickets, custom object (e.g. 2-XXXXXX), etc.

  
  
  const associations = await findAssociations(objectType, objectId, toObjectType)
  console.log(associations)
  
}
