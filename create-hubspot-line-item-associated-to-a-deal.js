const hubspot = require('@hubspot/api-client');

exports.main = (event) => {
  const hubspotClient = new hubspot.Client({
    accessToken: process.env.champ_perso_token
  });
 
  const dealId = event.object.objectId;
 
  console.log(`Deal ID: ${dealId}`);
  console.log(`Making API call to retrieve deal with ID ${dealId}...`);
 
  hubspotClient.crm.deals.basicApi.getById(dealId, ['shipping_fee']) //replace shipping_fee with any deal property you want to filter on
    .then(dealResults => {
      console.log('Deal results:', dealResults);
   
      let shipping_fee = dealResults.properties.shipping_fee;
   
      console.log(`Shipping fee found: ${shipping_fee}`);
   
      if (shipping_fee === '30') {
       
        console.log('Creating line item for shipping fee...');
       
        const properties = {
        quantity: "1",
        price: "10.00",
      };
      const SimplePublicObjectInputForCreate = { properties, associations: [{"to":{"id":`${dealId}`},"types":[{"associationCategory":"HUBSPOT_DEFINED","associationTypeId":2}]}] };

      try {
        const apiResponse = hubspotClient.crm.lineItems.basicApi.create(SimplePublicObjectInputForCreate);
        console.log(JSON.stringify(apiResponse));
      } catch (e) {
        e.message === 'HTTP request failed'
          ? console.error(JSON.stringify(e.response, null, 2))
          : console.error(e)
      }
     
      }
    })
    .catch(error => {
      console.error(`Error retrieving deal: ${error.message}`);
    });
};
