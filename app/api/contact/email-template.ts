export const adminEmailTemplate = (
  firstName: string,
  lastName: string,
  email: string,
  message: string,
  phone: string,
  companyName: string
) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Contact Form Submission</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f8f9fa;
      }
      .email-container {
        background-color: #0a192f;
        max-width: 800px;
        margin: 40px auto;
        border-radius: 8px;
        padding: 30px;
        color: white;
      }
      .logo {
        text-align: right;
        margin-bottom: 20px;
      }
      .logo img {
        height: 50px;
        width: 119PX;
      }
      .header {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 30px;
      }
      .field {
        margin-bottom: 20px;
        background-color: rgba(255, 255, 255, 0.1);
        padding: 20px;
        border-radius: 8px;
      }
      .label {
        font-weight: 600;
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #ffffff;
      }
      .value {
        font-size: 16px;
        line-height: 1.6;
        color: #f0f0f0;
        white-space: pre-wrap;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://nuvex-eta.vercel.app/svg/logo.png" alt="Nuvex Biotech" />
      </div>
      <div class="header">New Contact Form Submission</div>
      <div class="field">
        <span class="label">Name</span>
        <div class="value">${firstName} ${lastName}</div>
      </div>
      <div class="field">
        <span class="label">Company</span>
        <div class="value">${companyName || "Not provided"}</div>
      </div>
      <div class="field">
        <span class="label">Email</span>
        <div class="value">${email}</div>
      </div>
      <div class="field">
        <span class="label">Phone</span>
        <div class="value">${phone || "Not provided"}</div>
      </div>
      <div class="field">
        <span class="label">Message</span>
        <div class="value">${message}</div>
      </div>
    </div>
  </body>
  </html>
  `;

export const userEmailTemplate = (firstName: string, lastName: string) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thank You for Contacting Nuvex Biotech</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f8f9fa;
      }
      .email-container {
        background-color: #0a192f;
        max-width: 800px;
        margin: 40px auto;
        border-radius: 8px;
        padding: 30px;
        color: white;
      }
      .logo {
        text-align: right;
        margin-bottom: 20px;
      }
      .logo img {
        height: 80px;
        width: 119PX;
      }
      .header {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 30px;
      }
      .message, .contact-info, .footer {
        background-color: rgba(255, 255, 255, 0.1);
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 20px;
        color: #f0f0f0;
      }
      .contact-info p, .footer p {
        margin: 5px 0;
        color: #f0f0f0;
      }
      .contact-info strong {
        color: #ffffff;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://nuvex-eta.vercel.app/svg/logo.png" alt="Nuvex Biotech" />
      </div>
      <div class="header">Thank You for Contacting Us</div>
      <div class="message">
        <p>Dear ${firstName} ${lastName},</p>
        <p>Thank you for reaching out to Nuvex Biotech. We have received your message and our team will review it promptly. We strive to respond to all inquiries within 24–48 business hours.</p>
        <p>We appreciate your interest in our services and look forward to discussing how we can help accelerate your pharmaceutical success through our advanced research, formulation, and manufacturing solutions.</p>
      </div>
      <div class="contact-info">
        <p><strong>Nuvex Biotech</strong></p>
        <p>Email: info@nuvexbiotech.com</p>
        <p>Phone: (+92) 335 882277</p>
        <p>Address: 3rd Floor, EOBI building, 5A, Crown Plaza,<br>Sector F7 Markaz, Islamabad, 44210</p>
      </div>
      <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
      </div>
    </div>
  </body>
  </html>
  `;
