require("dotenv").config();

const express = require("express");
let bodyParser = require("body-parser");
const { startDatabase } = require("./database");

const TwilioService = require("./twilio");

const app = express();
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/echo", (req, res) => {
  res.json(req.body);
});

app.post("/send", async (req, res) => {
  try {
    //Use an array of numbers for sending to multiple recipients
    await TwilioService.sendMessage("+2347068006051", "Hi from my project");
    res.status(200).send("Sent successfully");
  } catch (error) {
    console.log(error);
    res.end();
  }
});

app.post("/sendmail", async (req, res) => {
  try {
    let mailObject = {
      to: "fik4christ@yahoo.com", //['recipient1@example.org', 'recipient2@example.org'] For multiple
      subject: "A mail sent",
      text: "This is a mail from me to you"
    };
    await TwilioService.sendMail(mailObject);
    res.status(200).send("Mail Sent successfully");
  } catch (error) {
    console.log(error);
    res.end();
  }
});

app.get("/locations", async (req, res) => {
  const db = await startDatabase();

  const locations = await db.collection("locations").find().toArray();

  res.status(200).send(locations);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
