import { json } from "@sveltejs/kit";
import { env } from '$env/dynamic/private';
import { GoogleGenerativeAI } from '@google/generative-ai';
import promptFile from '$lib/about_phani/prompt.txt';
import phani_resume from '$lib/about_phani/phani_resume.txt';
import { read } from '$app/server';

const prompt = await read(promptFile).text();
const phani_resume = await read(phani_resume).text();

export async function POST({ request, cookies }) {
    const { question } = await request.json();

    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: prompt + '/n' + phani_resume
    });

    const result = await model.generateContent(question);
    return json({ key: result.response.text() });
}