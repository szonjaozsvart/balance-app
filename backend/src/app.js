const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const connection = require("./db");
const app = express();
const PORT = 8080;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const bp = require("body-parser");
app.use(bp.json());
app.use(
  bp.urlencoded({
    extended: true,
  })
);

app.post("/registration", async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const items = [{
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  }, ];
  connection.query(
    "INSERT INTO bal_reg (first_name, last_name, email, password) VALUES ?",
    [
      items.map((item) => [
        item.firstName,
        item.lastName,
        item.email,
        item.password,
      ]),
    ],
    function (error, results) {
      if (error && error.code === "ER_DUP_ENTRY") {
        res.status(501).send({
          error: "Email already taken!",
        });
        return;
      } else if (error && error.code !== "ER_DUP_ENTRY") {
        res.status(500).send({
          error: "Database error",
        });
        return;
      }
      res.send(results);
    }
  );
});

const maxAge = 3 * 24 * 60 * 60;
const createToken = (email) => {
  return jwt.sign({
    email
  }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

app.post("/login", async (req, res) => {
  connection.query(
    `SELECT email, password FROM bal_reg WHERE email = "${req.body.email}"`,
    function (error, result) {
      if (error) {
        return res.status(400).send({
          error: "Cannot find user!",
        });
      }
      try {
        let givenPassword = result[0].password;
        let passwordMatch = bcrypt.compareSync(
          req.body.password,
          givenPassword
        );
        if (!passwordMatch) {
          return res.status(400).send({
            message: "Email or / and password not accepted!",
          });
        }
        const token = createToken(result[0].email);
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000
        });
        res.send({
          token: token
        });
        console.log("token", token);
      } catch (error) {
        console.log("error", error);
        console.log("token", token);
        res.send(error);
      }
    }
  );
});

app.get("/landing", async (req, res) => {
  connection.query(
    `SELECT id, first_name, last_name, email FROM bal_reg`,
    function (error, result) {
      if (error) {
        res.status(400).send({
          error: "Database error!",
        });
        return;
      }
      if (result.length === 0) {
        return res
          .status(500)
          .send({
            message: "There is no available member(s)."
          });
      }
      res.send(result);
    }
  );
});


app.post("/addPage", async (req, res) => {
  let emailAndId = 0;
  connection.query(
    `SELECT email, id FROM bal_reg WHERE email = "${req.body.their_email}"`,
    function (error, results) {
      if (error) {
        return res.status(400).send({
          error: "This person didn't registered!",
        });
      }
      emailAndId = results[0].id;
      let myId = 0;
      connection.query(
        `SELECT id FROM bal_reg WHERE email = "${req.body.my_email}"`,
        function (error, result) {
          if (error) {
            return res.status(400).send({
              error: "Didn't find my id!",
            });
          }
          myId = result[0].id;
          const items = [{
            my_id: myId,
            their_id: emailAndId,
            nickName: req.body.nickname
          }, ]
          console.log('my id',myId)
          console.log('their id',emailAndId)
          connection.query(
            `SELECT my_id, their_id FROM bal_conn WHERE (my_id = "${myId}" AND their_id = "${emailAndId}") 
            OR (my_id = "${emailAndId}" AND their_id = "${myId}")`,
            function (error, result) {
              if (error) {
                res.status(400).send({
                  error: "Database error!",
                });
                return;
              }
              console.log("result", result)
              if (result.length !== 0) {
                return res
                  .status(500)
                  .send({
                    message: "The connection has already done!"
                  });
              }
              res.send(result);
              connection.query(
                "INSERT INTO bal_conn (my_id, their_id, nickName) VALUES ?",
                [
                  items.map((item) => [
                    item.my_id,
                    item.their_id,
                    item.nickName
                  ]),
                ],
                function (error, results) {
                  if (error && error.code === "ER_DUP_ENTRY") {
                    res.status(501).send({
                      error: "This connection already in use!",
                    });
                    return;
                  } else if (error && error.code !== "ER_DUP_ENTRY") {
                    res.status(500).send({
                      error: "Database error",
                    });
                    return;
                  }
                  res.send(results);
            }
          );
            }
          );
        })
    })

});

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});