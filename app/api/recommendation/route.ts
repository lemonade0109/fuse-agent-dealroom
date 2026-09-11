import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { company, employeeCount, opportunity, contact, signals } = body;

    const prompt = `
You are an AI sales strategy agent.

Analyze the account below and recommend the single best next action.

Company: ${company}
Employee count: ${employeeCount}
Opportunity: ${opportunity}
Target contact: ${contact}

Signals:
${signals
  .map(
    (signal: { label: string; description: string }) =>
      `- ${signal.label}: ${signal.description}`,
  )
  .join("\n")}

Return ONLY valid JSON in this exact structure:

{
  "recommendation": "short specific action",
  "reasoning": "brief explanation of why this action makes sense",
  "confidence": 0,
  "message": "short personalized outreach message"
}

Rules:
- confidence must be an integer from 1 to 100
- do not invent facts
- use only the information provided
- keep the recommendation specific
- keep the outreach message concise and natural
`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-3.6-flash",
      contents: prompt,
    });

    const text = response.text;

    if (!text) {
      throw new Error("Gemini returned no text");
    }

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(cleaned);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Gemini recommendation error:", error);

    return NextResponse.json(
      {
        error: "Failed to generate recommendation",
      },
      {
        status: 500,
      },
    );
  }
}
