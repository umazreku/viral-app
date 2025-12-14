import { NextResponse } from "next/server";
import OpenAI from "openai";

// Ky funksion punon në server (Backend)
export async function POST(req) {
  try {
    // 1. Marrim të dhënat që na dërgon përdoruesi nga forma
    const body = await req.json();
    const { topic, platform, tone, language } = body;

    console.log("Kërkesë e re:", { topic, platform, tone, language });

    // 2. Këtu kontrollojmë nëse kemi API Key (për më vonë)
    const apiKey = process.env.OPENAI_API_KEY;

    // --- SKENARI A: KEMI PAGUAR (Do funksionojë në të ardhmen) ---
    if (apiKey) {
      const openai = new OpenAI({ apiKey: apiKey });
      
      const prompt = `
        You are a viral social media content creator.
        Topic: ${topic}
        Platform: ${platform}
        Tone: ${tone}
        Language: ${language}

        Return a JSON response with:
        - 5 viral hooks (short, catchy)
        - 1 engaging caption
        - 10 relevant hashtags
        
        Format strictly as JSON: { "hooks": [], "caption": "", "hashtags": [] }
      `;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
      });

      const data = JSON.parse(completion.choices[0].message.content);
      return NextResponse.json(data);
    }

    // --- SKENARI B: JEMI PA LEKË (Simulimi që do përdorim tani) ---
    console.log("⚠️ Nuk u gjet API Key. Duke përdorur simulimin...");
    
    // Këtu bëjmë sikur AI mendoi për 2 sekonda
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Kthejmë përgjigje statike (sa për të testuar aplikacionin)
    return NextResponse.json({
      hooks: [
        `Si të bëhesh mjeshtër në ${topic} brenda 24 orëve`,
        `Sekreti i fshehur i ${topic} që askush nuk ta thotë`,
        `Pse po dështoni me ${topic}? Ja zgjidhja.`,
        `Teknika 1-minute për ${topic} (Virale)`,
        `Stop! Mos bëj asgjë me ${topic} pa parë këtë.`
      ],
      caption: `Të gjithë flasin për ${topic}, por pak e kuptojnë të vërtetën. 🤔\n\nNëse doni rezultate reale në ${platform}, duhet të ndryshoni strategjinë.\n\n👇 Më tregoni në komente: Cila është vështirësia juaj më e madhe?`,
      hashtags: [`#${topic.replace(/\s/g, "")}`, `#${tone}`, "#viral", "#shqip", "#fy", "#sukses", "#mëso", "#këshilla", "#trending", `#${platform}`]
    });

  } catch (error) {
    console.error("Gabim në server:", error);
    return NextResponse.json(
      { error: "Ndodhi një gabim gjatë gjenerimit." },
      { status: 500 }
    );
  }
}