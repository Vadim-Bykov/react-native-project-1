const functions = require('firebase-functions');
// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.sendNotificationTopic = functions.firestore
  .document('forums/{forumId}')
  .onWrite(event => {
    try {
      //  const docId = event.after.id;
      const tittle = event.after.get('title');
      const description = event.after.get('description');
      const message = {
        notification: {
          title: tittle,
          body: description,
        },
        topic: 'namelesscoder',
      };

      admin
        .messaging()
        .send(message)
        .then(res => console.log(res));
    } catch (error) {
      console.error(error);
    }
  });

exports.sendNotificationToken = functions.firestore
  .document('forums/{forumId}')
  .onWrite(event => {
    try {
      const title = event.after.get('title');
      const description = event.after.get('description');
      const userRef = event.after.get('userRef');

      const userDoc = admin
        .firestore()
        .doc(userRef)
        .get()
        .then(userDoc => {
          const token = userDoc.get('tokens');

          const message = {
            notification: {
              title,
              description,
            },
            token,
          };

          return admin.messaging(message);
        })
        .then(res => console.log(res));
    } catch (error) {
      console.error(error);
    }
  });

// // Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info('Hello logs!', {structuredData: true});
//   response.send('Hello from Firebase!');
// });
