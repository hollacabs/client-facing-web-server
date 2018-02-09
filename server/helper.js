module.exports = {
  sendToQueue: (queueSQS, queueUrl, message) => {
    let params = {
      MessageBody: JSON.stringify(message),
      QueueUrl: queueUrl
    };
    queueSQS.sendMessage(params, (err, data) => {
      if (err) console.log(err);
    });
  }
}