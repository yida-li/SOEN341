let db = {
  users: [
    {
      userId: 'dhasd2222',
      email: 'user@email.com',
      handle: 'user',
      createdAt: '2019-03-15T10:59:53.798V',
      imageUrl: 'image/loled/yolo',
      bio: 'Hello, this is the garden',
      webiste: 'https://google.com',
      location: 'Tokyo,Japan',
    },
  ],

  vibezs: [
    {
      userHandle: 'user',
      body: ' this is the vibez body',
      createdAt: '2020-03-15T24:18:00.018Z',
      likeCount: 5,
      commentCount: 2,
    },
  ],
  comments: [
    {
      userHandle: 'user',
      vibezId: '5elFcNxTqJfy4hwOkohb',
      body: 'it is the first comment',
      createdAt: '2020-03-17T17:18:00.018Z',
    },
  ],
  notifications: [
    {
      recipient: 'new2',
      sender: 'john',
      read: 'true | false',
      vibezId: '5elFcNxTqJfy4hwOkohb',
      type: 'like | comment',
      createdAt: '2020-03-21:18:00.018Z',
    },
  ],
};
const userDetails = {
  //Redux data
  credentials: {
    userId: 'N3nt3N13N1212',
    email: 'efefm@gmail.com',
    handle: 'user',
    createdAt: '2019-03-15T10:59:53.798V',
    imageUrl: 'image/loled/yolo',
    bio: 'Hello, this is the garden',
    webiste: 'https://google.com',
    location: 'Tokyo,Japan',
  },
  likes: [
    { userHandle: 'user', vibezId: '123123123123' },
    { userHandle: 'user', vibezId: '123132131vb3' },
  ],
};
