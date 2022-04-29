

var http = require('https');

exports.main = async (event) => {


const contactId = event.inputFields['hs_object_id'];
const companyId = 8291785995

const apiKey = process.env.HAPIKEY


var options = {
  "method": "POST",
  "hostname": "api.hubapi.com",
  "port": null,
  "path": `/crm/v4/associations/contact/company/batch/archive?hapikey=${apiKey}`,
  "headers": {
    "accept": "application/json",
    "content-type": "application/json"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({inputs: [{from: {id: `${contactId}`}, to: [{id: `${companyId}`}]}]}));
req.end();


}
