import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { adminEmailTemplate, userEmailTemplate } from "./email-template";

// ✅ Reusable CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-api-key, authorization",
};

// ✅ Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// ✅ Handle OPTIONS request (CORS preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ✅ Handle actual POST request
export async function POST(request: Request) {
  try {
    const apiKey = request.headers.get("x-api-key");

    if (!apiKey || apiKey !== process.env.API_KEY) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: corsHeaders }
      );
    }

    const { firstName, lastName, email, message, phone, companyName } =
      await request.json();

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400, headers: corsHeaders }
      );
    }

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      html: adminEmailTemplate(
        firstName,
        lastName,
        email,
        message,
        phone,
        companyName
      ),
    };

    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting us",
      html: userEmailTemplate(firstName, lastName),
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500, headers: corsHeaders }
    );
  }
}
