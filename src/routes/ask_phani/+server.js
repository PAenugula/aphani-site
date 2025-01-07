import { json } from "@sveltejs/kit";
import { env } from '$env/dynamic/private';
import { GoogleGenerativeAI } from '@google/generative-ai';


export async function POST({request, cookies}) {
    const {question} = await request.json();

    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(question);
    return json({key: result.response.text()});
}