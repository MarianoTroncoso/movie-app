const sgMail = require('@sendgrid/mail');

module.exports = (email, username, token) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    from: process.env.FROM,
    to: email,
    subject: 'Welcome to my movie app',
    html: `
    <p>Hello, ${username}</p>

    <p>We're glad you've joined our movie app</p>
    
    <p>Verify your account</p>
    <button><a href='http://localhost:${process.env.PORT}/auth/verify?token=${token}'>Click here</a></button>
    `
  }
  sgMail.send(msg);
}