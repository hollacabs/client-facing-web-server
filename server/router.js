const Router = require('koa-router');
const router = new Router();
const axios = require('axios');
const helper = require('./helper');
const { rideMatchingIngressSQS, driverTrackingIngressSQS } = require('./sqs');
const { rideMatchingIngress, driverTrackingIngress, pricingService } = require('../config');

router
  // forwards pricing requests to Pricing, then forwards the Pricing response back to the client. 
  .post('/pricing', (ctx) => {
    axios.post(pricingService.url, ctx.request.body)
      .then(({ body }) => {
        ctx.response.body(body);
      })
  })
  
  // forwards requests to the Ride Matching queue
  .post('/ridematching', (ctx) => {
    helper.sendToQueue(rideMatchingIngressSQS, rideMatchingIngress.url, ctx.request.body, ctx)
  })

  // forwards requests to the Drive Tracking queue
  .post('/drivertracking', (ctx) => {
    helper.sendToQueue(driverTrackingIngressSQS, driverTrackingIngress, ctx.request.body, ctx);
  })

module.exports = router;