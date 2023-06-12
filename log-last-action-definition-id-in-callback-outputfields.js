exports.main = async (event, callback) => {
    console.log(event.origin.actionDefinitionId)
    callback({
      outputFields: {
        lastActionDefinitionId: event.origin.actionDefinitionId
      }
    });
  }
