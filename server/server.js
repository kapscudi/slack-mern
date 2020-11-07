import express from 'express';
import cors from 'cors';
import Pusher from 'pusher';
import mongoose from 'mongoose';
// import schema
import mongoData from './mongoData.js';

// app config
const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

const pusher = new Pusher({
  appId: '1096319',
  key: '0b78815f7d516f384a8d',
  secret: 'd15171b0899e5b3d5433',
  cluster: 'eu',
  useTLS: true,
});

//db config
const mongoURI =
  'mongodb+srv://admin:Ol9Lv3FPUCJKo3yl@cluster0.y3kfh.mongodb.net/slackDB?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('DB Connected');

  const changeStream = mongoose.connection.collection('conversations').watch();

  changeStream.on('change', (change) => {
    if (change.operationType === 'insert') {
      pusher.trigger('channels', 'newChannel', {
        change: change,
      });
    } else if (change.operationType === 'update') {
      pusher.trigger('conversation', 'newMessage', {
        change: change,
      });
    } else {
      console.log('Error triggering Pusher');
    }
  });
});

// api routes
app.get('/', (req, res) => res.status(200).send('Hello Clever men'));

app.post('/new/channel', (req, res) => {
  const dbData = req.body;

  mongoData.create(dbData, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post('/new/message', (req, res) => {
  const id = req.query.id;
  const newMessage = req.body;

  mongoData.update(
    { _id: id },
    { $push: { conversation: newMessage } },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    }
  );
});

app.get('/get/channelList', (req, res) => {
  mongoData.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let channels = [];

      data.map((channelData) => {
        const channelInfo = {
          id: channelData.id,
          name: channelData.channelName,
        };
        channels.push(channelInfo);
      });
      res.status(200).send(channels);
    }
  });
});

app.get('/get/conversation', (req, res) => {
  const id = req.query.id;

  mongoData.find({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// listen
app.listen(port, () => console.log(`listening on localhost:${port}`));
