var path = require('path');

module.exports = async function (req, res) {

  try {
    await readUploadedFileASync(req, 'file1');
  }
  catch (err) {
    if (err.code === 'E_EXCEEDS_UPLOAD_LIMIT') {
      return res.badRequest('File size limit exceeded');
    }
    else {
      throw err;
    }
  }

  console.log('file successfully uploaded');
  return res.ok('file successfully uploaded');

};


//Promisify sails upload functionality that isnt bluebird promisify-able
var readUploadedFileASync = function (req, name) {
  return new Promise(function(resolve, reject) {
    req.file(name).upload({
      maxBytes: 6*1024*1024,
      dirname: path.resolve(sails.config.appPath, 'FILES/reads'),
    }, function (error, files) {
      return error ? reject(error) : resolve(files);
    });
  });
};
