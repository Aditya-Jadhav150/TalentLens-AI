import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.featherless.ai/v1",
  apiKey: process.env.FEATHERLESS_API_KEY || "dummy",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, targetRole, experienceLevel } = body;

    const targetPos = targetRole ? `${experienceLevel} ${targetRole}` : "Software Engineer";
    
    const isFinishing = messages.length >= 11;

    let aiResponse = "";

    if (
      process.env.FEATHERLESS_API_KEY &&
      process.env.FEATHERLESS_API_KEY !== "your_featherless_api_key_here"
    ) {
      const formattedMessages = messages.map((m: any) => ({
        role: m.role === "ai" ? "assistant" : "user",
        content: m.content,
      }));

      let systemInstruction =
        `You are the TalentLens AI interviewer evaluating a candidate for a ${targetPos} position. Ask deep, specific follow-up questions based on their previous answers. Ask only one question at a time. Be conversational but ensure they demonstrate the required skills for a ${targetPos}.`;

      if (messages.length === 9) {
        systemInstruction =
          "You are now Agent Ada, the cynical Risk Evaluator for this panel. The official interview is over. You must explicitly start by saying 'I am Agent Ada, the Risk Evaluator.' Then, identify ONE glaring weakness, missing edge case, or assumption in the candidate's previous technical answers in this transcript. Aggressively but professionally challenge them to defend that choice.";
      } else if (messages.length >= 10 && isFinishing) {
        systemInstruction =
          "You are Agent Ada. Acknowledge the candidate's defense concisely. Do not ask any more questions. State clearly that the interview is now fully concluded and the panel will make its final decision based on their defense.";
      }

      const completion = await openai.chat.completions.create({
        model: "meta-llama/Meta-Llama-3.1-70B-Instruct",
        messages: [
          { role: "system", content: systemInstruction },
          ...formattedMessages,
        ],
        max_tokens: 1000,
      });

      aiResponse =
        completion.choices[0]?.message?.content ||
        "Could you elaborate further on that?";
    } else {
      if (messages.length === 9) {
        aiResponse =
          "I am Agent Ada, the Risk Evaluator. I noticed you didn't mention database caching in your previous architecture rundown. How would you handle a sudden 10x read spike? Defend your architecture.";
      } else if (messages.length >= 11) {
        aiResponse =
          "Noted. Your defense has been recorded. The interview is now concluded, and the panel will deliberate.";
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        aiResponse =
          "Mock: That's interesting. Could you dive deeper into that approach?";
      }
    }

    return NextResponse.json({
      success: true,
      message: {
        id: Date.now().toString(),
        role: "ai",
        content: aiResponse,
      },
      isComplete: isFinishing,
    });
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process interview response",
      },
      { status: 500 },
    );
  }
}
