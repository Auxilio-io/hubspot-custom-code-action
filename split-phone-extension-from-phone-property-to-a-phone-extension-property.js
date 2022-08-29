exports.main = async (event, callback) => {

    const phone = event.inputFields['phone'];
    const mobilePhone = event.inputFields['mobilephone'];

    if (phone != undefined && phone.includes("ext", 1)) {
        const extensionNumber = phone.split('ext').pop();
        const extension = `Extension: ${extensionNumber}`
        const newPhone = phone.split('ext', 1)[0];
        const newMobilePhone = "null"

        callback({
            outputFields: {
                newMobilePhone: newMobilePhone,
                newPhone: newPhone,
                extension: extension
            }
        });
        console.log("Phone extension has been found");
    } else if (mobilePhone != undefined && mobilePhone.includes("ext", 1)) {
        const mobileExtNumber = mobilePhone.split('ext').pop();
        const mobileExt = `Extension: ${mobileExtNumber}`
        const newMobilePhone = mobilePhone.split('ext', 1)[0];
        const newPhone = "null"

        callback({
            outputFields: {
                newMobilePhone: newMobilePhone,
                newPhone: newPhone,
                extension: mobileExt
            }
        });
        console.log("Mobile phone extension has been found");
    } else {
        console.log("No extensions found");
    }
}
