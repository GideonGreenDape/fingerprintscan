// config.js
export const DEVICE_DISC_METHOD = "MOSIPDISC";
export const DEVICE_DISC_TYPE = "Finger";
export const IP = "http://localhost";
export const STREAM_TIMEOUT = '10000';
export const DEVICE_ID = '1';
export const DEVICE_SUB_ID = '1';
export const CAPTURE_BODY = {
  env: 'Production',
  purpose: 'Registration',
  specVersion: '0.9.5',   
  captureTime: new Date().toISOString(),
  domainUri: '127.0.0.1:4503',
  timeout: '30000',
  transactionId: '1',
  bio: [
    {
      type: 'Finger',
      count: 1,
      bioSubType: ["Left IndexFinger"],
      requestedScore: '10',
      deviceId: '1',
      deviceSubId: 1,
      previousHash: '',
      exception: ["Left MiddleFinger", "Left RingFinger", "Left LittleFinger"],
    },
  ],
};
