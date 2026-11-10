
interface VerificationEmailProps {
    username: string;
    otp: string;
  }
  
  export const verificationEmail = ({
    username,
    otp,
  }: VerificationEmailProps): string => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <title>Email Verification</title>
  
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #f4f5f9;
          font-family: Arial, Helvetica, sans-serif;
        }
  
        .container {
          width: 100%;
          max-width: 600px;
          margin: 30px auto;
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
        }
  
        .header {
          background: #5b4bdb;
          padding: 30px 20px;
          text-align: center;
          color: #ffffff;
        }
  
        .header h1 {
          margin: 0;
          font-size: 26px;
        }
  
        .content {
          padding: 35px 30px;
          color: #333333;
          line-height: 1.6;
        }
  
        .otp-box {
          margin: 30px 0;
          padding: 20px;
          text-align: center;
          background: #f4f3ff;
          border: 1px dashed #5b4bdb;
          border-radius: 10px;
        }
  
        .otp {
          font-size: 34px;
          font-weight: bold;
          letter-spacing: 10px;
          color: #5b4bdb;
        }
  
        .footer {
          padding: 20px;
          background: #f8f8fb;
          text-align: center;
          color: #888888;
          font-size: 12px;
        }
  
        @media screen and (max-width: 600px) {
          .container {
            width: 94% !important;
            margin: 15px auto !important;
          }
  
          .content {
            padding: 25px 18px !important;
          }
  
          .header h1 {
            font-size: 22px !important;
          }
  
          .otp {
            font-size: 27px !important;
            letter-spacing: 6px !important;
          }
        }
      </style>
    </head>
  
    <body>
      <table width="100%" cellpadding="0" cellspacing="0"
        border="0" bgcolor="#f4f5f9">
        <tr>
          <td align="center">
  
            <table class="container" width="600"
              cellpadding="0" cellspacing="0" border="0">
  
              <tr>
                <td class="header">
                  <h1>Verify Your Email</h1>
                  <p>One more step to get started!</p>
                </td>
              </tr>
  
              <tr>
                <td class="content">
  
                  <h2>Hello ${username},</h2>
  
                  <p>
                    Thank you for signing up! We're excited to have
                    you on board.
                  </p>
  
                  <p>
                    To complete your registration, please use the
                    verification code below:
                  </p>
  
                  <div class="otp-box">
                    <div class="otp">${otp}</div>
                  </div>
  
                  <p>
                    This verification code is valid for
                    <strong>10 minutes</strong>.
                  </p>
  
                  <p>
                    If you didn't request this verification,
                    you can safely ignore this email.
                  </p>
  
                  <p>
                    Best regards,<br />
                    <strong>The Team</strong>
                  </p>
  
                </td>
              </tr>
  
              <tr>
                <td class="footer">
                  <p>
                    © ${new Date().getFullYear()} Your Company.
                    All rights reserved.
                  </p>
                  <p>
                    This is an automated email. Please do not reply.
                  </p>
                </td>
              </tr>
  
            </table>
  
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;
  };
  