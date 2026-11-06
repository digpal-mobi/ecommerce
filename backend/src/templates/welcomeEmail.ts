
interface WelcomeEmailProps {
    username: string;
    email: string;
  }
  
  export const welcomeEmail = ({
    username,
    email,
  }: WelcomeEmailProps): string => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <title>Welcome Aboard</title>
  
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
          padding: 45px 20px;
          text-align: center;
          color: #ffffff;
        }
  
        .header h1 {
          font-size: 30px;
          margin: 0;
        }
  
        .content {
          padding: 35px 30px;
          color: #333333;
          line-height: 1.7;
        }
  
        .success-box {
          margin: 25px 0;
          padding: 20px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 10px;
          text-align: center;
        }
  
        .success-icon {
          font-size: 40px;
          color: #16a34a;
        }
  
        .account-info {
          padding: 18px;
          margin: 25px 0;
          background: #f8f8fb;
          border-radius: 8px;
        }
  
        .account-info p {
          margin: 8px 0;
        }
  
        .button {
          display: inline-block;
          padding: 14px 28px;
          background: #5b4bdb;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 7px;
          font-weight: bold;
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
            font-size: 24px !important;
          }
  
          .button {
            display: block !important;
            text-align: center !important;
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
                  <h1>Welcome Aboard!</h1>
                  <p>Your journey starts here.</p>
                </td>
              </tr>
  
              <tr>
                <td class="content">
  
                  <h2>Hello ${username},</h2>
  
                  <div class="success-box">
                    <div class="success-icon">✓</div>
                    <h3>Account Created Successfully!</h3>
                    <p>
                      Your account is ready. You're officially
                      part of our community.
                    </p>
                  </div>
  
                  <p>
                    We're thrilled to have you with us!
                    Your registration was successful and
                    your account is now active.
                  </p>
  
                  <div class="account-info">
                    <h3>Account Details</h3>
                    <p>
                      <strong>Name:</strong> ${username}
                    </p>
                    <p>
                      <strong>Email:</strong> ${email}
                    </p>
                    <p>
                      <strong>Status:</strong> Active
                    </p>
                  </div>
  
                  <p>
                    You can now explore everything we have
                    to offer. We hope you enjoy your experience!
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