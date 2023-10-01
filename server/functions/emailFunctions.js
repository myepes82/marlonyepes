const nodemailer = require("nodemailer");

const createTransporter = () => {
    const {
        MAIL_HOST_USER,
        MAIL_HOST_PASSWORD,
        MAIL_HOST,
        MAIL_HOST_SSL_ENABLED
    } = process.env;

    return nodemailer.createTransport({
        port: 465,
        host: MAIL_HOST || "",
        auth: {
            user: MAIL_HOST_USER || "",
            pass: MAIL_HOST_PASSWORD || "",
        },
        secure: MAIL_HOST_SSL_ENABLED === 'true'
    });
};

const buildEmailMessage = (emailRequest) => {
    const { email, message, name } = emailRequest;
  
    return {
      from: "Marlon Yepes - [GitHub]",
      to: "marlondevjs@gmail.com",
      subject: "New contact request - [Marlon Yepes]",
      cc: [email],
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
              }
              table.container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333;
              }
              .details {
                margin: 10px;
                color: #555;
              }
              .details i {
                color: #ff5733 !important;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <table class="container" cellspacing="0" cellpadding="0">
              <tr>
                <td>
                  <h1>You have a new contact request from: ${name}</h1>
                  <p class="details"><i>Email:</i> ${email}</p>
                  <p class="details"><i>Message:</i> ${message}</p>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    };
};

const sendEmail = (req, res) => {
    const transporter = createTransporter();

    if (!transporter) {
        console.error("Email host could not be established");
        return res.status(500).send({ description: "Failed to send email" });
    }

    transporter.sendMail(buildEmailMessage(req.body), (err, info) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ description: "Failed to send email" });
        }
        console.log(info);
        return res.status(200).send({ description: "Message was sent" });
    });
};

module.exports = {
    send: sendEmail
};
