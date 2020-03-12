'use strict';

const AWS = require('aws-sdk');
const pino = require('pino');

const log = pino({name: 'event-bridge'});
const s3 = new AWS.S3();


async function handleEvent(event, context) {
  const now = Date.now();

  const {bucketName, key} = event.detail.requestParameters;
  const eventBridgeTime = Date.parse(event.time);
  const eventTime = Date.parse(event.detail.eventTime);

  const data = await s3.headObject({Bucket: bucketName, Key: key}).promise();
  const keyTime = Date.parse(data.LastModified);

  const timings = {now, keyTime, eventTime, eventBridgeTime};

  log.info({timings});
}

module.exports = {handleEvent};
