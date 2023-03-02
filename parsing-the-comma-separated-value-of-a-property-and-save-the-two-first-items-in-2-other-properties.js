// Parsing the comma separated value of a property and save the two first items in 2 other properties

exports.main = async (event, callback) => {
  // get the value of the property connected_tools
  const connectedTools = event.inputFields['connected_tools']; //To define in the inputs above
  
  // transform comma separated list into an iterable array
  var arrayOfConnectedTools = connectedTools.split(', ');
  console.log(arrayOfConnectedTools);
    
  // Accessing individual values
  const connectedTool1 = arrayOfConnectedTools[0]; 
  const connectedTool2 = arrayOfConnectedTools[1]; 
  
  /*****
    Use the callback function to output data that can be used in later actions in your workflow.
  *****/
  callback({
    outputFields: {
      connectedTool1: connectedTool1, //To define in the outputs below. Use a copy property value action in your workflow to copie this in another property
      connectedTool2: connectedTool2 //To define in the outputs below. Use a copy property value action in your workflow to copie this in another property
    }
  });
}
