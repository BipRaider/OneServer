const { Storage } = require('@google-cloud/storage');
const DEFAULT_BUCKET_NAME = 'goit-hw-6';
const storage = new Storage({ keyFilename: path.join(__dirname, 'goit-bip-cca58d87b62f.json') });

exports.bucket = storage.bucket(DEFAULT_BUCKET_NAME);
exports.storage = storage;
