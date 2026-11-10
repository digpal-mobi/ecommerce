
interface ResetPasswordEmailProps {
  username: string;
  resetUrl: string;
  expiryMinutes?: number;
}

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });

export const resetPasswordEmail = ({
  username,
  resetUrl,
  expiryMinutes = 15,
}: ResetPasswordEmailProps): string => {
  const safeUsername = escapeHtml(username);
  const safeResetUrl = escapeHtml(resetUrl);

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />

    <title>Reset Your Password</title>

    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f5f9;
        font-family: Arial, Helvetica, sans-serif;
        -webkit-text-size-adjust: 100%;
      }

      table {
        border-spacing: 0;
        border-collapse: collapse;
      }

      .container {
        width: 100%;
        max-width: 600px;
        margin: 30px auto;
        background-color: #ffffff;
        border-radius: 12px;
        overflow: hidden;
      }

      .header {
        background-color: #5b4bdb;
        padding: 35px 20px;
        text-align: center;
        color: #ffffff;
      }

      .header h1 {
        margin: 0;
        font-size: 26px;
        font-weight: 700;
      }

      .content {
        padding: 35px 30px;
        color: #333333;
        font-size: 15px;
        line-height: 1.7;
      }

      .reset-button {
        display: inline-block;
        padding: 15px 32px;
        background-color: #5b4bdb;
        color: #ffffff !important;
        text-decoration: none;
        font-size: 15px;
        font-weight: bold;
        border-radius: 8px;
      }

      .button-wrapper {
        padding: 20px 0;
        text-align: center;
      }

      .security-box {
        margin-top: 25px;
        padding: 18px;
        background-color: #fff7ed;
        border-left: 4px solid #f59e0b;
        border-radius: 6px;
        color: #92400e;
        font-size: 13px;
      }

      .url-box {
        padding: 15px;
        background-color: #f4f5f9;
        border-radius: 8px;
        word-break: break-all;
        font-size: 12px;
      }

      .url-box a {
        color: #5b4bdb;
      }

      .footer {
        padding: 20px;
        background-color: #f8f8fb;
        text-align: center;
        color: #888888;
        font-size: 12px;
        line-height: 1.6;
      }

      @media only screen and (max-width: 600px) {
        .container {
          width: 94% !important;
          margin: 15px auto !important;
        }

        .header {
          padding: 28px 15px !important;
        }

        .header h1 {
          font-size: 22px !important;
        }

        .content {
          padding: 25px 18px !important;
        }

        .reset-button {
          display: block !important;
          padding: 15px 20px !important;
        }

        .footer {
          padding: 18px 12px !important;
        }
      }
    </style>
  </head>

  <body>
    <table width="100%" role="presentation"
      cellpadding="0" cellspacing="0" border="0"
      bgcolor="#f4f5f9">

      <tr>
        <td align="center">

          <table class="container" width="600"
            role="presentation" cellpadding="0"
            cellspacing="0" border="0">

            <!-- Header -->
            <tr>
              <td class="header">
                <h1>Password Reset Request</h1>
                <p style="margin-bottom: 0;">
                  Let's help you get back into your account.
                </p>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td class="content">

                <h2>Hello ${safeUsername},</h2>

                <p>
                  We received a request to reset the password
                  associated with your account.
                </p>

                <p>
                  Click the button below to securely create
                  a new password.
                </p>

                <!-- Reset Button -->
                <div class="button-wrapper">
                  <a
                    href="${safeResetUrl}"
                    class="reset-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Reset My Password
                  </a>
                </div>

                <p>
                  This password reset link will expire in
                  <strong>${expiryMinutes} minutes</strong>.
                  Please use it before it expires.
                </p>

                <!-- Fallback URL -->
                <p>
                  If the button doesn't work, copy and paste
                  the following link into your browser:
                </p>

                <div class="url-box">
                  <a href="${safeResetUrl}">
                    ${safeResetUrl}
                  </a>
                </div>

                <!-- Security Notice -->
                <div class="security-box">
                  <strong>Security Notice:</strong>

                  <p style="margin-bottom: 0;">
                    If you didn't request a password reset,
                    please ignore this email. Your current
                    password will remain unchanged.
                  </p>
                </div>

                <p style="margin-top: 30px;">
                  Stay safe,<br />
                  <strong>The Team</strong>
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td class="footer">
                <p>
                  © ${new Date().getFullYear()} Your Company.
                  All rights reserved.
                </p>

                <p>
                  This is an automated email.
                  Please do not reply.
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
