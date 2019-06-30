/**
 * Module dependencies
 */

var util = require('util');
var _ = require('@sailshq/lodash');



/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(data);
 *
 * @param  {JSON?} data
 * @param  {Ref?} noLongerSupported
 */

module.exports = function sendOK (data) {

  // Get access to `req` and `res`
  //var req = this.req;
  var res = this.res;

  // Set status code
  res.status(200);

  // If no data was provided, use res.sendStatus().
  if (_.isUndefined(data)) {
    return res.sendStatus(200);
  }

  return res.json(data);
};
