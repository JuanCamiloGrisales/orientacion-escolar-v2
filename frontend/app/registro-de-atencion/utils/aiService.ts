import { toast } from "@/hooks/use-toast";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateSummary(
  relatoEntrevistado: string,
): Promise<string | null> {
  const apiKey = localStorage.getItem("geminiApiKey");

  if (!apiKey) {
    toast({
      title: "API_KEY Faltante",
      description:
        "Por favor configura tu clave de API de Gemini en los ajustes para activar las funcionalidades de Inteligencia Artificial.",
      variant: "destructive",
    });
    return null;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

  const prompt = `Create a professional summary of 50 words or less synthesizing to the maximum information of the following transcription of attention to a student in psychorientation. Write your answer in Spanish. Do not specify the student's name, the name of the psychooriector or any other detail that may not be exclusively from this meeting.\n---\n${relatoEntrevistado}`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating summary:", error);
    toast({
      title: "Error",
      description: "Failed to generate summary using AI.",
      variant: "destructive",
    });
    return null;
  }
}
