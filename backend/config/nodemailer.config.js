require("dotenv").config();
const nodemailer = require("nodemailer");
//const config = require("../config/auth.config");

const ourEmail = "info@pitchr.dk";

const transport = nodemailer.createTransport({
  host: "smtp.zoho.com",
  secure: true,
  port: 465,
  auth: {
    user: ourEmail,
    pass: "JesperBuch6969690.112",
  },
});

module.exports.sendConfirmationEmail = (email, confirmationCode) => {
  transport.sendMail({
    from: ourEmail,
    to: ourEmail,
    subject: "You have a new invitation, to your platform!",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello Pitchr, ${email} has just requested access.</h2>
        <p>If you would like to let this person have access to the platform, click the link below. </p>
        <a href=https://my.pitchr.vc/auth/confirm/${confirmationCode}> Click here</a>
        </div>`,
  });
};

module.exports.sendFileRequest = (
  receiverEmail,
  from,
  to,
  confirmationCode
) => {
  transport.sendMail({
    from: ourEmail,
    to: receiverEmail,
    subject: "You have a new request to access your files.",
    html: `<h1>New request</h1>
        <h2>Hello ${to}, ${from} has just requested access to your files.</h2>
        <p>If you would like to let this person have access to your file room, click the link below. </p>
        <a href=https://my.pitchr.vc/auth/confirmFileAccess/${confirmationCode}> Click here to allow access</a>
        </div>`,
  });
};

module.exports.sendRegistrationEmail = (email) => {
  transport.sendMail({
    from: ourEmail,
    to: email,
    subject: "You have now gained access to Pitchr!",
    html: `<h1>Invitation accepted!</h1>
          <h2>Hello we have finally accepted your invitation</h2>
          <p>You now have access to our platform, click the link down below to complete your registration.</p>
          <a href=https://my.pitchr.vc/sign-up> Click here</a>
          </div>`,
  });
};

module.exports.sendAccessConfirmedMail = (email, receiver, owner, ownerID) => {
  transport.sendMail({
    from: ourEmail,
    to: email,
    subject: "You have now gained access to a file room!",
    html: `<h1>Invitation accepted!</h1>
          <h2>Hello ${receiver}, ${owner} has now accepted your request</h2>
          <p>You now have access to ${owner} file room, click the link down below to see their files.</p>
          <a href=https://my.pitchr.vc/investor/app/company/${ownerID}> Click here</a>
          </div>`,
  });
};

module.exports.sendWaitMail = (email) => {
  transport.sendMail({
    from: ourEmail,
    to: email,
    subject: "You are now on the waiting list!",
    html: `<h1>Your request has been received.</h1>
          <h2>Hello we are excited to see your interest.</h2>
          <p>Stay awake in the next following couple of days, as we will open op for users</p>
          <p>You will receive a link, reffering to a registration page where you have the possibility to create your account.</p>
          </div>`,
  });
};
