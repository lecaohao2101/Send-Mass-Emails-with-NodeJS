const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
require("dotenv").config();

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const emails = await mongoose.connection.db
      .collection("users")
      .distinct("email");

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "emailcuaem@gmail.com",
        pass: "passwordcuaem",
      },
    });

    let info = await transporter.sendMail({
      from: '"Sale off Tran Hotel" <***-emailcuaem@gmail.com>',
      to: emails,
      subject: "Send Email",
      html: `
      <h1>Hello World</h1>

      `,
    });

    console.log(info.messageId);
    console.log(info.accepted);
    console.log(info.rejected);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((err) => console.log(err));
