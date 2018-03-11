const Koa = require('koa');
const httpStats = require('koa-http-stats');
const bodyParser = require('koa-bodyparser');
const router = require('./router');

let app = new Koa();

app.use(httpStats(function (performance, stats, ctx) {
  // {"total":1,"connecting":0,"status":[0,0,1,0,0,0],"time":[1,0,0,0,0,0],"size":[1,0,0,0,0,0],"busy":[1,0,0,0,0]}
  console.info(JSON.stringify(performance));
  // {"connecting":0,"total":1,"use":4,"bytes":11,"code":200,"status":2,"spdy":0,"size":0,"busy":0}
  console.info(JSON.stringify(stats));
}));

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

let port = 3000;

app.listen(port, () => {
  console.log('Koa is listening on port ' + port);
});