const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const creds = require("./credential.json");
const mongoose = require("mongoose");

const messageSchema = require("./models/messageData.js");

require("./db")
const cors = require("cors")

let app = express();
const router = express.Router()
const path = require("path");
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

app.use((req, res, next) => {
  console.log(req.path);
  next();
});





let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  service: 'Gmail',
  // domain: "gmail.com",
  auth: {
    user: 'anuragkartik7@gmail.com',
    pass: 'siczffzeimgayigy'
  }
  
});

app.post("/mail",async(req, res, next) => {
  console.log(req.method);
  const createObject = {};

    createObject.email = req.body.email;
    createObject.message = req.body.message;
    createObject.subject = req.body.subject;
    createObject.name = req.body.name;
    createObject.company = req.body.company;

    //   console.log(req);

    const mailOptions = { 
      from: createObject.name,
      to: createObject.email,
      subject: createObject.subject,
      html: `${createObject.name} from ${createObject.company} <noreply@${createObject.name}.com> <br /><br /> ${createObject.message}`,
    };

    const aa= await messageSchema.create(createObject);
    console.log(aa,">>>>>>>>>>>>>>>>>>>>>>>>>")


    await transporter.sendMail(mailOptions, (err, data) => {
      console.log("helloooooooooo>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      if (err) {
        res.json({
          status: "err",
        });
        console.log({err});
      } else {
        
        res.json({
          status: "success",
        });
        console.log("Email Sent" + data.response);
      }
    });

});

transporter.verify(function (err, success) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is ready to take our messages!");
  }
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.info("server is started", PORT));
