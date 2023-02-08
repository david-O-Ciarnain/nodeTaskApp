import postmark from "postmark";

const serverToken = process.env.EMAILTOKEN;
const client = new postmark.ServerClient(serverToken);
const From = process.env.FROMEMAIL;

export function sendWelcomeEmail(To, name) {
  client
    .sendEmail({
      From,
      To,
      Subject: "Thanks for joining in!",
      HtmlBody: `<h1>Welcome to the app ${name}!</h1>\n <p>Let me know how you get along with the app.</p>`,
    });
}

export function sendCancelationEmail(email, name) {
  client
    .sendEmail({
      From,
      To: email,
      Subject: "I Guess it´s Time to say goodbye :(",
      HtmlBody: `${name} <h1>why are you leaving us?</h1> <p>We were a family</p> :)`,
    });
}
