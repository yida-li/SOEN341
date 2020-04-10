const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/fbAuth');

// Setup for notification.
const { db } = require('./util/admin');

const {
  getAllVibezs,
  //postOneVibez,
  getVibez,
  commentOnVibez,
  likeVibez,
  unlikeVibez,
  deleteVibez,
} = require('./handlers/vibezs');
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead,
  search,
} = require('./handlers/users');
//added new
const { postOneVibez, uploadImageForAVibez } = require('./handlers/sample');

//NEW
app.post('/user/upload', FBAuth, uploadImageForAVibez);
//-NEW
//search
app.post('/search/:handle', search); //
// Vibez routes
app.get('/vibezs', getAllVibezs);
app.post('/vibez', FBAuth, postOneVibez);
app.get('/vibez/:vibezId', getVibez);

//delete vibez
app.delete('/vibez/:vibezId', FBAuth, deleteVibez);

//like a vibez routes
app.get('/vibez/:vibezId/like', FBAuth, likeVibez);
//unlike a vibez routes
app.get('/vibez/:vibezId/unlike', FBAuth, unlikeVibez);

// comment
app.post('/vibez/:vibezId/comment', FBAuth, commentOnVibez);

// users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);
app.get('/user/:handle', getUserDetails);
app.post('/notifications', FBAuth, markNotificationsRead);

exports.api = functions.https.onRequest(app);

//create notification
exports.createNotificationOnLike = functions.firestore
  .document('likes/{id}')
  .onCreate((snapshot) => {
    return db
      .doc(`/vibezs/${snapshot.data().vibezId}`)
      .get()
      .then((doc) => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'like',
            read: false,
            vibezId: doc.id,
          });
        }
      })

      .catch((err) => console.error(err));
  });

//unlike then delete notification
exports.deleteNotificationOnUnLike = functions.firestore
  .document('likes/{id}')
  .onDelete((snapshot) => {
    return db
      .doc(`/notifications/${snapshot.id}`)
      .delete()

      .catch((err) => {
        console.error(err);
        return;
      });
  });

exports.createdNotificationOnComment = functions.firestore
  .document('comments/{id}')
  .onCreate((snapshot) => {
    return db
      .doc(`/vibezs/${snapshot.data().vibezId}`)
      .get()
      .then((doc) => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'comment',
            read: false,
            vibezId: doc.id,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });

exports.onUserImageChange = functions.firestore
  .document('/users/{userId}')
  .onUpdate((change) => {
    console.log(change.before.data());
    console.log(change.after.data());
    if (change.before.data().imageUrl !== change.after.data().imageUrl) {
      console.log('image has changed');
      const batch = db.batch();
      return db
        .collection('vibezs')
        .where('userHandle', '==', change.before.data().handle)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            const vibez = db.doc(`/vibezs/${doc.id}`);
            batch.update(vibez, { userImage: change.after.data().imageUrl });
          });
          return batch.commit();
        });
    } else return true;
  });

//delete all related vibez's info when it is triggered.
exports.onVibezDelete = functions.firestore
  .document('/vibezs/{vibezId}')
  .onDelete((snapshot, context) => {
    const vibezId = context.params.vibezId;
    const batch = db.batch();
    return db
      .collection('comments')
      .where('vibezId', '==', vibezId)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/comments/${doc.id}`));
        });
        return db.collection('likes').where('vibezId', '==', vibezId).get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/likes/${doc.id}`));
        });
        return db
          .collection('notifications')
          .where('vibezId', '==', vibezId)
          .get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/notifications/${doc.id}`));
        });
        return batch.commit();
      })
      .catch((err) => console.error(err));
  });
