const hubspot = require('@hubspot/api-client');

exports.main = (event) => {
  // Secrets can be accessed with environment variables.
  // Make sure to add your API key under "Secrets" above.
  if(!process.env.apiKey){
    console.log('API key not present');
    return;
  }
  const hubspotClient = new hubspot.Client({
    apiKey: process.env.apiKey
  });
  if(!(event.object.objectId && 	event.object.objectType == "CONTACT")){
    console.log('No contact object in workflow');
    return;
  }
  hubspotClient.crm.contacts.basicApi.archive(
		event.object.objectId)
    .catch(err => {
      console.error(err);
      // We will automatically retry when the code fails because of a rate limiting error from the HubSpot API.
      throw err;
    });
}
