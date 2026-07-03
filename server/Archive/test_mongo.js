const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CLUSTER = process.env.DB_CLUSTER;
const DB_NAME = process.env.DB_NAME || 'drariful_cms';
const uri = `mongodb+srv://${encodeURIComponent(DB_USERNAME)}:${encodeURIComponent(DB_PASSWORD)}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;
(async () => {
  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log('connected', conn.connection.readyState);
    const cols = await mongoose.connection.db.listCollections().toArray();
    console.log('collections', cols.map((c) => c.name));
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('mongo err', err.message);
    process.exit(1);
  }
})();
