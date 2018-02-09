const AWS = require('aws-sdk');
const { rideMatchingIngress, driverTrackingIgress } = require('../config');

module.exports = {
  rideMatchingIngressSQS : new AWS.SQS({
    apiVersion: '2012-11-05',
    region: rideMatchingIngress.region,
    credentials: new AWS.Credentials(rideMatchingIngress.accessKeyId, rideMatchingIngress.secretAccessKey)
  }),

  driverTrackingIgressSQS: new AWS.SQS({
    apiVersion: '2012-11-05',
    region: rideMatchingEgress.region,
    credentials: new AWS.Credentials(driverTrackingIngress.accessKeyId, driverTrackingIngress.secretAccessKey)
  })
}
