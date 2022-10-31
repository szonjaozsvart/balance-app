const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const connection = require('./db');
const app = express();
const PORT = 8080;

const cors = require('cors');

app.use(cors());
app.use(express.json());

const bp = require('body-parser');
app.use(bp.json())
app.use(bp.urlencoded({
    extended: true
}))

app.post('/registration', function (req,res) {
  const items = [
    {firstName: req.body.firstName, 
      lastName: req.body.lastName, 
      email: req.body.email,
      password:req.body.password }
    ];
  connection.query('INSERT INTO bal_reg (first_name, last_name, email, password) VALUES ?', 
  [items.map(item=>[item.firstName, item.lastName, item.email, item.password])], 
  function(error, results) {
    if (error) {
      console.log(error)
        res.status(500).send({
            error: 'Database error',
        });
        return;
      }
      res.send(results);
    })
})


app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
