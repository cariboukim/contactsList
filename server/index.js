const express = require('express');
const cors = require('cors');
const {readFile, writeFile} = require('fs');

const corsOptions= {
  origin: '*',
  credentials: true,
  optionSuccessStatus:200,
}

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

const PORT = 4000;

app.get('/api/get', (req, res) => {
  readFile('contacts.txt', (err, data) => {
    if (err) {console.error(err)}
    if (!data.toString()) {
      res.send([]);
    } else {
      res.send(JSON.parse(data));
    }
  })
})

app.post('/api/post', (req, res) => {
  readFile('contacts.txt', (err, data) => {

    const duplicate = JSON.parse(data).find(contact => {
      return (
        contact.name === req.body.name || contact.email === req.body.email || contact.phone === req.body.phone
      )
    });

    if (duplicate) {
      console.log('Duplicate found!');
      res.send({error: 409})
    } else {
      if (err) {
        writeFile('contacts.txt', JSON.stringify([req.body]), (err) => {
          if (err) {console.error(err)}
          console.log('Contact has been created!')
          res.sendStatus(201);
        })
      } else {
        const body = !data.toString() ? [req.body] : [...JSON.parse(data), req.body];
        writeFile('contacts.txt', JSON.stringify(body), (err) => {
          if (err) {console.error(err)}
          console.log('Contact has been created!');
          res.sendStatus(201);
        })
      }
    }
  });
})

app.put('/api/update', (req, res) => {
  readFile('contacts.txt', (err, data) => {
    if (err) {console.error(err)}
    const contact = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    }
    const id = req.body.id;
    const body = JSON.parse(data);
    body.splice(id, 1, contact);
    writeFile('contacts.txt', JSON.stringify(body), (err) => {
      if (err) {console.error(err)}
      console.log('Contact has been updated');
      res.sendStatus(200);
    })
  })
})

app.delete('/api/delete', (req, res) => {
  readFile('contacts.txt', (err, data) => {
    if (err) {console.error(err)}
    const body = JSON.parse(data);
    body.splice(req.query.id, 1);
    writeFile('contacts.txt', JSON.stringify(body), (err) => {
      if (err) {console.error(err)}
      console.log('Contact has been deleted');
      res.sendStatus(200);
    })
  })
})

app.listen(PORT, () => {
  console.log(`Connected to ${PORT}`);
})
