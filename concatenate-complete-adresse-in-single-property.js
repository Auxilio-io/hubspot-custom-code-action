// This code gets all the address properties (Street address, City, Region, Country, Postal code) and concatenates them into a single property named "Complete Address".
// Useful when you want to display the complete address both on the sidebar or card of a contact record, and you are limited by the number of properties you can use.
// This can also be extended to be used as a personalization token in emails, pages, quotes, etc.

exports.main = (event, callback) => {

    const address = event.inputFields['address'];
    const city = event.inputFields['city'];
    const state = event.inputFields['state'];
    const country = event.inputFields['country'];
    const zip = event.inputFields['zip'];

    const completeAddress = `${address}, ${city}, ${state}, ${country}, ${zip}`


      callback({
        outputFields: {
          completeAddress: completeAddress
        }
      });
    }

