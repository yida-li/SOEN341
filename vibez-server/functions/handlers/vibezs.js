const { db } = require('../util/admin');

exports.getAllVibezs = (req, res) => {
  db.collection('vibezs')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let vibezs = [];
      data.forEach((doc) => {
        vibezs.push({
          vibezId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount,
          userImage: doc.data().userImage,
          vibezImageUrl: doc.data().vibezImageUrl,
        });
      });
      return res.json(vibezs);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//exports.postOneVibez = (req, res) => {
//if (req.body.body.trim() === "") {
// return res.status(400).json({ body: "Body must not be empty" });
//}
//const newVibez = {
//body: req.body.body,
//userHandle: req.user.handle,
//userImage: req.user.imageUrl,
//createdAt: new Date().toISOString(),
//likeCount: 0,
//commentCount: 0
//};
//db.collection("vibezs")
//.add(newVibez)
//.then(doc => {
//const resVibez = newVibez;
//resVibez.vibezId = doc.id;
//res.json(resVibez);
// })
// .catch(err => {
// res.status(500).json({ error: "something went wrong" });
//console.err(err);
//});
//};

//comment #1 - fetch 1 vibez
exports.getVibez = (req, res) => {
  let vibezData = {};
  db.doc(`/vibezs/${req.params.vibezId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res
          .status(404)
          .json({ error1_comment: 'Vibez not found_comment' });
      }
      vibezData = doc.data();
      //add id to vibez of the data.
      vibezData.vibezId = doc.id;
      //fetch the comment
      return db
        .collection('comments')
        .orderBy('createdAt', 'desc')
        .where('vibezId', '==', req.params.vibezId)
        .get();
    })
    .then((data) => {
      vibezData.comments = [];
      data.forEach((doc) => {
        vibezData.comments.push(doc.data());
      });
      return res.json(vibezData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//comment on a comment
exports.commentOnVibez = (req, res) => {
  if (req.body.body.trim() === '')
    return res.status(400).json({ comment: 'Must not be empty' });

  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    vibezId: req.params.vibezId,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
  };
  //confirm of vibez existance.
  db.doc(`/vibezs/${req.params.vibezId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res
          .status(404)
          .json({ error: 'Vibez not found_confirm comment' });
      }
      return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
    })
    .then(() => {
      return db.collection('comments').add(newComment);
    })
    .then(() => {
      res.json(newComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong_1' });
    });
};

//Like a vibez
exports.likeVibez = (req, res) => {
  //check like exist or not
  const likeDocument = db
    .collection('likes')
    .where('userHandle', '==', req.user.handle)
    .where('vibezId', '==', req.params.vibezId)
    .limit(1);

  const vibezDocument = db.doc(`/vibezs/${req.params.vibezId}`);

  //check
  let vibezData;

  //check all the functionality of like.
  vibezDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        vibezData = doc.data();
        vibezData.vibezId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error_1: 'Vibez not found_like' });
      }
    })
    .then((data) => {
      if (data.empty) {
        // will return the collection likes to firebase
        return db
          .collection('likes')
          .add({
            vibezId: req.params.vibezId,
            userHandle: req.user.handle,
          })
          .then(() => {
            vibezData.likeCount++;
            return vibezDocument.update({ likeCount: vibezData.likeCount });
          })
          .then(() => {
            return res.json(vibezData);
          });
      } else {
        return res.status(400).json({ error_2: 'Vibez already liked' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//create unlike

exports.unlikeVibez = (req, res) => {
  //check like exist or not
  const likeDocument = db
    .collection('likes')
    .where('userHandle', '==', req.user.handle)
    .where('vibezId', '==', req.params.vibezId)
    .limit(1);

  const vibezDocument = db.doc(`/vibezs/${req.params.vibezId}`);

  let vibezData;

  //check all the functionality of like.
  vibezDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        vibezData = doc.data();
        vibezData.vibezId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error_3: 'Vibez not found_unlike' });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error_4: 'Vibez not liked' });
      } else {
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            vibezData.likeCount--;
            return vibezDocument.update({ likeCount: vibezData.likeCount });
          })
          .then(() => {
            res.json(vibezData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//delete a vibez.
exports.deleteVibez = (req, res) => {
  const document = db.doc(`/vibezs/${req.params.vibezId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Vibez not found_delete' });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: 'Unauthorized' });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: 'Vibez deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
//continue
