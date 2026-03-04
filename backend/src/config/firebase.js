const admin = require('firebase-admin');
const env = require('./env');

if (!admin.apps.length && env.firebase.projectId) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: env.firebase.projectId,
      clientEmail: env.firebase.clientEmail,
      privateKey: env.firebase.privateKey
    })
  });
}

module.exports = admin;
