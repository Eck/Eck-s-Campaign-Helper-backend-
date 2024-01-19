// Looks for a required parameter and if it isn't there, it marks the response with a 400 status.
// Returns true if the parameter is set. Otherwise, false.
function isRequiredParameterPresent(res, parameter, parameterName)
{
	if(!parameter || parameter == "")
	{
		res.status(400);
		res.send({"error": `${parameterName} is a required field.`});
		return false;
	}

	return true;
}

function sendSuccessMessage(res, message, dataObject)
{
	res.send({"message": `${message}`, "dataObject": dataObject});
}



export {isRequiredParameterPresent, sendSuccessMessage}