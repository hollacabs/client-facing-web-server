const Router = require('koa-router');
const router = new Router();
const axios = require('axios');
const helper = require('./helper');
const { rideMatchingIngressSQS, driverTrackingIngressSQS } = require('./sqs');
const { rideMatchingIngress, driverTrackingIngress, pricingService } = require('./config');

router
  // forwards pricing requests to Pricing, then forwards the Pricing response back to the client. 
  .get('/pricing:id', (ctx) => {
    axios.post(pricingService.url, ctx.params.id)
      .then(({ body }) => {
        ctx.response.body = body;
        ctx.response.status = 200;
      })
  })
  
  // forwards requests to the Ride Matching queue
  .post('/ridematching', (ctx) => {
    helper.sendToQueue(rideMatchingIngressSQS, rideMatchingIngress.url, ctx.request.body);
    ctx.response.status = 200;
  })

  // forwards driver location update requests to the Driver Tracking queue
  .post('/drivertracking', (ctx) => {
    helper.sendToQueue(driverTrackingIngressSQS, driverTrackingIngress.url, ctx.request.body);
    ctx.response.status = 200;
  })

  // forwards driver sign-off requests to the Driver Tracking queue
  .del('/drivertracking:id', (ctx) => {
    helper.sendToQueue(driverTrackingIngressSQS, driverTrackingIngress.url, ctx.params.id);
    ctx.response.status = 200;
  })

module.exports = router;