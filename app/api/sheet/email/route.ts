/* eslint-disable @typescript-eslint/no-explicit-any */
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Thêm một bước kiểm tra email đơn giản
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: "Email không hợp lệ." }, { status: 400 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "email!A:B", 
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[email, new Date().toLocaleString("vi-VN")]],
      },
    });

    return NextResponse.json({ message: "Successfully subscribed!" });
  } catch (err: any) {
    console.error("Failed To Send Email:", err);
    return NextResponse.json({ error: "Please Try Again!" }, { status: 500 });
  }
}