module.exports = {
  sendToQueue: (queueSQS, queueUrl, message, ctx) => {
    let params = {
      MessageBody: JSON.stringify(message),
      QueueUrl: queueUrl
    }
    queueSQS.sendMessage(params, (err, data) => {
      if (err) console.log(err);
      else {
        ctx.send(200);
      }
    });
  }
}
