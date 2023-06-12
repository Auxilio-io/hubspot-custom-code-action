exports.main = async (event, callback) => {

  const list = event.inputFields['your_list_property'];
  
  const arr = list.split(',');
  console.log(arr);
  const numberInList = arr.length
  console.log(numberInList);

  callback({
    outputFields: {
      numberInList: numberInList
    }
  });
}
