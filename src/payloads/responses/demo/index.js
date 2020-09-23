exports.demoResponse = (code, msg, records = []) => {
  return {
    code: code,
    msg: msg,
    records: records
  };
};
