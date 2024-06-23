const mongoose = require('mongoose');
const assert = require('assert');
const db_url = process.env.DB_URL_LOCAL;

mongoose.connect(
  db_url,
).then((link) => {
  console.log('Database connection successful');
 // console.log(link);
}).catch((error) => {
  console.error('Database connection error:', error);
});
