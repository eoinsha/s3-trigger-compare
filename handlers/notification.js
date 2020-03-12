'use strict'

const AWS = require('aws-sdk');
const pino = require('pino');

const log = pino({name: 'notification'});
const s3 = new AWS.S3();

async function handleS3Notification(event, context) {
  const now = Date.now();

  const record = event.Records[0]
  const {bucket: {name: bucketName}, object: {key}} = record.s3

  const eventTime = Date.parse(record.eventTime);

  const data = await s3.headObject({Bucket: bucketName, Key: key}).promise();
  const keyTime = Date.parse(data.LastModified);

  const timings = {now, keyTime, eventTime};

  log.info({timings});
}

module.exports = {handleS3Notification};
