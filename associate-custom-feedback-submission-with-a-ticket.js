const hubspot = require('@hubspot/api-client');

exports.main = async (event, callback) => {

  const hubspotClient = new hubspot.Client({
    apiKey: process.env.hsApiKey
  });

  const feedbackId = event.object.objectId;
  
  const ticketId = event.inputFields['ticket_id'];

const BatchInputPublicAssociation = { inputs: [{"from":{"id":`${ticketId}`},"to":{"id":`${feedbackId}`},"type":"ticket_to_feedback_submission"}] };
const fromObjectType = "ticket";
const toObjectType = "feedback_submission";

try {
  const apiResponse = await hubspotClient.crm.associations.batchApi.create(fromObjectType, toObjectType, BatchInputPublicAssociation);
  console.log(JSON.stringify(apiResponse.body, null, 2));
} catch (e) {
  e.message === 'HTTP request failed'
    ? console.error(JSON.stringify(e.response, null, 2))
    : console.error(e)
}

  callback({
    outputFields: {
      feedbackId: feedbackId,
      ticketId: ticketId
    }
  });
}
