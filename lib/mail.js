// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export async function sendResetEmail(email, token) {
//   const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

//   await transporter.sendMail({
//     from: `"Smart Study" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: "Reset your password",
//     html: `
//       <h2>Password Reset Request</h2>

//       <p>You requested to reset your password.</p>

//       <p>
//         <a href="${resetLink}">
//           Click here to reset your password
//         </a>
//       </p>

//       <p>This link will expire in 15 minutes.</p>

//       <p>If you didn't request this, you can safely ignore this email.</p>
//     `,
//   });
// }

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendResetEmail(email, token) {
  const resetLink =
    `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"Smart Study" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset Password",
    html: `
      <h2>Reset Password</h2>

      <p>Click below to reset your password.</p>

      <a href="${resetLink}">
        Reset Password
      </a>

      <p>This link expires in 15 minutes.</p>
    `,
  });
}