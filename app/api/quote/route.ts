import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { adminQuoteTemplate, userQuoteTemplate } from "./email-template";

const ALLOWED_ORIGIN = "https://nuvexbiotech.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, x-api-key, authorization",
      },
    }
  );
}

export async function POST(request: Request) {
  try {
    // 🔐 Origin check
    const origin = request.headers.get("origin") || "";
    if (origin !== ALLOWED_ORIGIN) {
      return NextResponse.json(
        { error: "Forbidden: Invalid origin" },
        {
          status: 403,
          headers: {
            "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers":
              "Content-Type, x-api-key, authorization",
          },
        }
      );
    }

    const apiKey = request.headers.get("x-api-key");

    if (!apiKey || apiKey !== process.env.API_KEY) {
      return NextResponse.json(
        { error: "Unauthorized" },
        {
          status: 401,
          headers: {
            "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers":
              "Content-Type, x-api-key, authorization",
          },
        }
      );
    }

    const formData = await request.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const companyName = formData.get("companyName") as string;
    const projectDescription = formData.get("projectDescription") as string;
    const timeline = formData.get("timeline") as string;
    const budgetRange = formData.get("budgetRange") as string;

    const filesFieldExists = [...formData.keys()].includes("files");
    const files = filesFieldExists ? (formData.getAll("files") as File[]) : [];
    const fileNames = files.map((file) => file.name);

    const attachments =
      files.length > 0
        ? await Promise.all(
            files.map(async (file) => {
              const buffer = await file.arrayBuffer();
              return {
                filename: file.name,
                content: Buffer.from(buffer),
              };
            })
          )
        : [];

    if (!name || !email || !companyName || !projectDescription || !timeline) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers":
              "Content-Type, x-api-key, authorization",
          },
        }
      );
    }

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Quote Request",
      html: adminQuoteTemplate(
        name,
        email,
        companyName,
        projectDescription,
        timeline,
        budgetRange,
        fileNames
      ),
      attachments: attachments,
    };

    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for your quote request",
      html: userQuoteTemplate(name),
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return NextResponse.json(
      { message: "Quote request sent successfully" },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, x-api-key, authorization",
        },
      }
    );
  } catch (error) {
    console.error("Error processing quote request:", error);
    return NextResponse.json(
      { error: "Failed to process quote request" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, x-api-key, authorization",
        },
      }
    );
  }
}
