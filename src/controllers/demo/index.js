const demoRepository = require('../../repositories/demo');
const requestValidation = require('../../payloads/requests/demo/validation')
const responsePayload = require('../../payloads/responses/demo');
const responsePayloadValidation = require('../../payloads/responses/demo/validation');

exports.demoPost = async function (req, res, next) {
  try {
    const {startDate, endDate, minCount, maxCount} = req.body;
    const requestValidationResult = requestValidation.validate({startDate, endDate, minCount, maxCount});

    if (requestValidationResult.error) {
      const response = responsePayload.demoResponse(1, requestValidationResult.error);

      res.status(400);
      res.send(response);
    } else {
      const records = await demoRepository.demoPost(startDate, endDate, minCount, maxCount);

      const response = responsePayload.demoResponse(0, "Success", records);
      const responseValidationResult = responsePayloadValidation.validate(response);

      if (responseValidationResult.error)
        res.send(responsePayload.demoResponse(2, responseValidationResult.error, records));
      else
        res.send(response);
    }
  } catch (err) {
    next(err);
  }
};
