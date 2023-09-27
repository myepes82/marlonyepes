const smtp = require("nodemailer")

const smtpHost = _ => {
    const {
        MAIL_HOST_USER,
        MAIL_HOST_PASSWORD,
        MAIL_HOST,
        MAIL_HOST_SSL_ENABLED
    } = process.env;
    return smtp.createTransport({
        port: 465,
        host: MAIL_HOST || "",
        auth : {
            user: MAIL_HOST_USER || "",
            pass: MAIL_HOST_PASSWORD || "",
        },
        secure: MAIL_HOST_SSL_ENABLED
    })
};

const buildEmailMessageFromExpressBody = (emailRequest) => {
    const { email, message, name } = emailRequest;
  
    return {
      from: "contacts.github.marlon@gmail.com",
      to: "marlondevjs@gmail.com",
      subject: "New contact request - [Marlon Yepes]",
      cc: [email],
      html: `
        <html>
          <head>
            <style>
              /* Estilos CSS en línea para dar formato al correo electrónico */
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

const getMailInstanceAndSend = (req) => {
    const client = smtpHost();
    if(!client){
        console.error("Email host could be stablishied")
    }
    client.sendMail(buildEmailMessageFromExpressBody(req), (err, _) => {
        if(err) console.error(err);
        console.log(_)
    })
}
const postMessage = (res) => {
    return res.send({
        "description": "message was sent"
    }).status(200)
}
function processor(f, g){
    getMailInstanceAndSend(f["body"]);
    return postMessage(g);
}


module.exports = {
    sent: processor
}