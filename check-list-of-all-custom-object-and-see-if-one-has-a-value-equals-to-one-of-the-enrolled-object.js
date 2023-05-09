const hubspot = require('@hubspot/api-client');

exports.main = async (event, callback) => {
  // Define variables
  const opsToken = process.env.YOUR_PRIVATE_APP_TOKEN;
  const objectType = "2-XXXXXX"; // replace by the object id
  const limit = 100;
  const properties = ["PROPERTY_HERE"];
  const archived = false;
  const property = event.inputFields['PROPERTY_HERE'];

  // Create the HubSpot client
  const hubspotClient = new hubspot.Client({ accessToken: opsToken });

  // Function to fetch a page of custom object records
  async function fetchRecords(objectType, limit, after, properties, archived) {
    try {
      const apiResponse = await hubspotClient.crm.objects.basicApi.getPage(
        objectType,
        limit,
        after,
        properties,
        archived
      );
      return apiResponse;
    } catch (e) {
      if (e.response) {
        console.error(JSON.stringify(e.response, null, 2));
      } else {
        console.error(e);
      }
    }
  }

  // Fetch all records
  let allRecords = [];
  let after = undefined;
  let hasMore = true;

  while (hasMore) {
    const recordsPage = await fetchRecords(objectType, limit, after, properties, archived);
    const { results, paging } = recordsPage;

    allRecords = allRecords.concat(results);
    hasMore = paging && paging.next;
    after = paging && paging.next && paging.next.after;
  }
  
  if (allRecords.length > 0) {
    console.log("List of records found");
    
      // Check if any records has the specified property
      const recordExists = allRecords.some(records => records.properties.PROPERTY_HERE === property);
      console.log("Record already exists for property " + property + " : " + recordsExists);

        callback({
          outputFields: {
            recordsExists: recordsExists
      }
    });
  } else {
    console.error("No records found");
  }
};
