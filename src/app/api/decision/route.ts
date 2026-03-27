import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.featherless.ai/v1",
  apiKey: process.env.FEATHERLESS_API_KEY || "dummy", 
});

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const candidateId = searchParams.get('id');
    const body = await req.json();
    const { transcript, profile, targetRole, experienceLevel } = body;

    const targetPos = targetRole ? `${experienceLevel} ${targetRole}` : "Software Engineer";

    if (!candidateId) {
      return NextResponse.json({ success: false, error: "Missing candidate ID" }, { status: 400 });
    }
    
    const conversationStr = (transcript && transcript.length > 0)
      ? transcript.map((m: any) => `${m.role === 'ai' ? 'Interviewer' : 'Candidate'}: ${m.content}`).join("\n\n")
      : "Candidate provided no interview responses.";
      
    const basePrompt = `
      You are an elite multi-agent AI hiring committee evaluating a candidate for a ${targetPos} position.
      Below is the candidate's active Git/Portfolio profile signals AND their actual interview transcript.
      
      [CANDIDATE BASE PROFILE & GITHUB SIGNALS]
      ${profile || 'Not provided.'}

      [INTERVIEW TRANSCRIPT]
      ${conversationStr}
      
      You must evaluate the candidate's answers and their profile signals deeply against the specific requirements and industry standards for a ${targetPos}.
      Note where they show insight, and where they gave generic or weak answers.
      Respond with ONLY a valid JSON object matching this exact shape (no markdown, no backticks, just raw JSON):
      {
        "score": <number 0-100 reflecting their true performance based on transcript depth>,
        "decision": "<string: STRONG HIRE, HIRE, LEANING HIRE, or NO HIRE>",
        "insights": [
          { "label": "Technical Depth", "value": "<High/Medium/Low>", "desc": "<1 punchy sentence specifically referencing their technical arguments from the transcript>" },
          { "label": "Problem Solving", "value": "<High/Medium/Low>", "desc": "<1 punchy sentence evaluating their specific problem solving approach>" },
          { "label": "Communication", "value": "<High/Medium/Low>", "desc": "<1 punchy sentence evaluating how clearly they articulated complex ideas>" }
        ],
        "trajectory": {
          "industryFit": "<2 sentences explaining how their current skills map to the industry standard for a ${targetPos}>",
          "skillGaps": ["<specific skill 1>", "<specific skill 2>", "<specific skill 3>"],
          "careerPath": "<1 sentence predicting their trajectory if hired in this role>"
        },
        "agents": [
          {
            "role": "Technical Lead",
            "name": "Agent Alan",
            "verdict": "<Hire or No Hire>",
            "color": "blue",
            "reasoning": "<2 sentences evaluating their technical architecture choices or code intuition specifically cited from the transcript>"
          },
          {
            "role": "Culture & Product",
            "name": "Agent Grace",
            "verdict": "<Hire or No Hire>",
            "color": "purple",
            "reasoning": "<2 sentences evaluating their pragmatism and user empathy based on how they answered>"
          },
          {
            "role": "Risk Evaluator",
            "name": "Agent Ada",
            "verdict": "<Hire or No Hire>",
            "color": "amber",
            "reasoning": "<2 sentences explicitly calling out the weakest points of their answers or potential onboarding risks>"
          }
        ]
      }
    `;

    if (process.env.FEATHERLESS_API_KEY && process.env.FEATHERLESS_API_KEY !== 'your_featherless_api_key_here') {
      const completion = await openai.chat.completions.create({
        model: "meta-llama/Meta-Llama-3.1-70B-Instruct",
        messages: [
          { role: "system", content: "You are a JSON-only API. You must evaluate strictly based on the provided typescript and output raw JSON without code blocks." },
          { role: "user", content: basePrompt }
        ],
        max_tokens: 1500,
        temperature: 0.1
      });
      
      const content = completion.choices[0]?.message?.content || "";
      let jsonStr = content.replace(/```json/g, '').replace(/```/g, '').trim();
      
      // Safety fix if the model wrapped it in markdown anyway
      if (jsonStr.startsWith("json")) jsonStr = jsonStr.substring(4).trim();
      
      let parsedData;
      try {
        parsedData = JSON.parse(jsonStr);
      } catch (e) {
        console.error("Failed to parse JSON from AI", jsonStr);
        throw new Error("AI returned malformed JSON decision");
      }
      
      return NextResponse.json({ success: true, data: parsedData });
    } else {
      // Mock fallback
      await new Promise(resolve => setTimeout(resolve, 3000));
      return NextResponse.json({
        success: true,
        data: {
          score: 87,
          decision: "STRONG HIRE",
          insights: [
            { label: "Technical Depth", value: "High", desc: "Mock evaluation without API key." },
            { label: "Problem Solving", value: "High", desc: "Mock evaluation without API key." }
          ],
          agents: [
            { role: "Technical Lead", name: "Agent Alan", verdict: "Hire", color: "blue", reasoning: "Mock reasoning." },
            { role: "Culture & Product", name: "Agent Grace", verdict: "Hire", color: "purple", reasoning: "Mock reasoning." },
            { role: "Risk Evaluator", name: "Agent Ada", verdict: "Hire", color: "amber", reasoning: "Mock reasoning." }
          ],
          trajectory: {
            industryFit: "The candidate's technical background strongly aligns with modern standards for a " + targetPos + ". They demonstrate a solid understanding of core principles required at this level.",
            skillGaps: ["Advanced System Design", "Performance Profiling", "Cross-team Leadership"],
            careerPath: "Potential to grow into a senior leadership position within 2-3 years."
          }
        }
      });
    }
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to generate decision" }, { status: 500 });
  }
}
