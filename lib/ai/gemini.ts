import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIFeedback } from '@/lib/types';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export interface QuizAnalysisInput {
  chapterContent: string;
  quizQuestions: string[];
  studentAnswers: number[];
  correctAnswers: number[];
  score: number;
}

export const analyzeQuizWithAI = async (input: QuizAnalysisInput): Promise<AIFeedback> => {
  const prompt = `You are an expert AI learning coach. Analyze the following quiz performance and provide personalized feedback.

Chapter Content:
${input.chapterContent}

Quiz Questions:
${input.quizQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

Student Answers: ${input.studentAnswers.join(', ')}
Correct Answers: ${input.correctAnswers.join(', ')}
Score: ${input.score}%

Provide a JSON response with the following structure:
{
  "strengths_summary": "A brief summary of what the student did well (2-3 sentences)",
  "gaps_summary": "Identify specific concepts the student struggled with (2-3 sentences)",
  "remedial_target_id": "The specific topic ID to focus on for remedial learning",
  "recommendations": ["Specific actionable recommendation 1", "Specific actionable recommendation 2", "Specific actionable recommendation 3"]
}

Respond ONLY with valid JSON, no additional text.`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    
    return {
      strengths_summary: parsed.strengths_summary,
      gaps_summary: parsed.gaps_summary,
      remedial_target_id: parsed.remedial_target_id,
      recommendations: parsed.recommendations || [],
      confidence_score: input.score / 100,
    };
  } catch (error) {
    console.error('Error analyzing quiz with AI:', error);
    throw error;
  }
};

export const generateLearningPath = async (weakAreas: string[], strongAreas: string[]): Promise<string[]> => {
  const prompt = `As an AI learning coach, create a personalized learning path for a student.

Weak Areas: ${weakAreas.join(', ')}
Strong Areas: ${strongAreas.join(', ')}

Provide a JSON array of 5 recommended learning topics in priority order:
["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5"]

Respond ONLY with valid JSON array, no additional text.`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const jsonMatch = responseText.match(/\[\s*"[^\[\]]*"\s*(?:,\s*"[^\[\]]*"\s*)*\]/);
    
    if (!jsonMatch) {
      return [];
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error generating learning path:', error);
    return [];
  }
};

export const generateStudyPlan = async (topics: string[], timeAvailableMinutes: number): Promise<string> => {
  const prompt = `Create a detailed study plan for the following topics within ${timeAvailableMinutes} minutes.

Topics to study: ${topics.join(', ')}

Provide a structured study plan with time allocations and key points to focus on.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating study plan:', error);
    throw error;
  }
};
