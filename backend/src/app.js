const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');

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

app.post('/registration', async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const items = [{
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword
  }];
  connection.query('INSERT INTO bal_reg (first_name, last_name, email, password) VALUES ?',
    [items.map(item => [item.firstName, item.lastName, item.email, item.password])],
    function (error, results) {
      if (error && error.code === 'ER_DUP_ENTRY') {
        res.status(501).send({
          error: 'Email already taken!',
        });
        return;
      } else if (error && error.code !== 'ER_DUP_ENTRY') {
        res.status(500).send({
          error: 'Database error',
        });
        return;
      }
      res.send(results);
    })
})

app.post('/login', async (req, res) => {
    connection.query(`SELECT email, password FROM bal_reg WHERE email = "${req.body.email}"`, function (error, result) {
      if (error) {
        return res.status(400).send({
          error: "Cannot find user!"
        })
      }
      try {
        let givenPassword = result[0].password;
        let passwordMatch = bcrypt.compareSync(req.body.password, givenPassword)
        if(!passwordMatch) {
          return res.status(400).send({
            message: "Email or / and password not accepted!"
          })
        }
        res.send(result)
      } catch (error) {
        res.send(error)
      }
    })
  })

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});