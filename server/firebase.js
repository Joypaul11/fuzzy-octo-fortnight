const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
 credential: admin.credential.cert(serviceAccount),
 databaseURL: 'https://construyo-coding-challenge.firebaseio.com'
});

const db = admin.database();
// const Users = db.ref("/users");
const OrdersRef = db.ref('/orders');

module.exports = OrdersRef;