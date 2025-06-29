import nodemailer from "nodemailer";

export const sendEmail = async (residentEmail, pickUpCode) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mh47098@gmail.com",
      pass: "wqwm xges xyjl dclg",
    },
  });

  let mailOptions = {
    from: "Concierge CityWharf",
    to: residentEmail,
    subject: "Sending Email using Node.js",
    text: `Dear Resident,

We hope you're doing well. This is to inform you that a parcel has been received for you at the concierge office.

To collect your parcel, please visit the concierge and present the following pick-up code:

Pick-Up Code: ${pickUpCode}

Kindly ensure you bring this code with you to verify and complete the collection.

Thank you,  
Concierge Office`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
