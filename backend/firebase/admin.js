/** 
 * admin.js 
 */

const admin = require('firebase-admin');
const serviceAccount = require('./admin-sdk.json'); // caminho relativo

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { admin, db };
