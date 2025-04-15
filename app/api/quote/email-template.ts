export const adminQuoteTemplate = (
  name: string,
  email: string,
  companyName: string,
  projectDescription: string,
  timeline: string,
  budgetRange: string,
  files: string[]
) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Quote Request</title>
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
      .files-list {
        margin-top: 10px;
      }
      .file-item {
        margin-bottom: 5px;
        padding: 5px;
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 4px;
      }
      a {
        color: #ffffff;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://nuvex-eta.vercel.app/svg/logo.png" alt="Nuvex Biotech" />
      </div>
      <div class="header">New Quote Request</div>
      <div class="field">
        <span class="label">Name</span>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <span class="label">Email</span>
        <div class="value">${email}</div>
      </div>
      <div class="field">
        <span class="label">Company</span>
        <div class="value">${companyName}</div>
      </div>
      <div class="field">
        <span class="label">Project Description</span>
        <div class="value">${projectDescription}</div>
      </div>
      <div class="field">
        <span class="label">Timeline</span>
        <div class="value">${timeline}</div>
      </div>
      <div class="field">
        <span class="label">Budget Range</span>
        <div class="value">${budgetRange || "Not specified"}</div>
      </div>
      ${
        files.length > 0
          ? `
        <div class="field">
          <span class="label">Attached Files</span>
          <div class="files-list">
            ${files
              .map(
                (file) => `
              <div class="file-item">${file}</div>
            `
              )
              .join("")}
          </div>
        </div>
      `
          : ""
      }
    </div>
  </body>
  </html>
`;

export const userQuoteTemplate = (name: string) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thank You for Your Quote Request</title>
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
      .note {
        background-color: rgba(255, 193, 7, 0.2);
        border-left: 4px solid #ffc107;
        padding: 15px;
        margin: 20px 0;
        font-style: italic;
      }
      a {
        color: #ffffff;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://nuvex-eta.vercel.app/svg/logo.png" alt="Nuvex Biotech" />
      </div>
      <div class="header">Thank You for Your Quote Request</div>
      <div class="message">
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to us with your quote request. We have received your information and will review it carefully.</p>
        <div class="note">
          <p>Please note that all quotes are custom and based on specific needs of your project. We aim to respond within 2 to 3 business days.</p>
        </div>
        <p>Our team will analyze your requirements and get back to you with a detailed proposal that best suits your needs.</p>
        <p>If you have any additional questions or need to provide more information, please don't hesitate to contact us.</p>
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
