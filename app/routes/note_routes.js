// module.exports = function(app, db) {
//   app.post('/notes', (req, res) => {
//     // You'll create your note here.
//     console.log(req.body)
//     res.send('Hello')
//   });
// };


// var ObjectID = require('mongodb').ObjectID;
var { ObjectID } = require('mongodb'); // object destructuring

module.exports = function(app, db) {
  // GET BY ID -> e.g. localhost:8000/notes/5ebbcf3821b26e1641188e26
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };

    db.collection('notes').findOne(details, (err, item) => {
      if(err) {
        res.send({ 'error': 'An error has occured' });
      } else {
        res.send(item);
      }
    })
  })

  // POST : body -> { "title": "something", "body": "somebody!" }, url: localhost:8000/notes
  const collection = app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };

    db.collection('notes').insertOne(note, (err, result) => {
      if(err) {
        res.send({ 'error': err });
      } else {
        res.send(result.ops[0]);
      }
    })
  })

  // DELETE ONE -> e.g. localhost:8000/notes/5ebbcf3821b26e1641188e26
  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };

    db.collection('notes').deleteOne(details, (err, item) => {
      if(err) {
        res.send({ 'error': 'An error has occured' });
      } else {
        res.send('Note ' + id + ' deleted!');
      }
    })
  })

  // UPDATE ONE
  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };

    db.collection('notes').update(details, note, (err, result) => {
      if(err) {
        res.send({ 'error': 'An error has occured' });
      } else {
        res.send(note);
      }
    })
  })
}
