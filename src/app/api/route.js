import { NextResponse, NextRequest } from "next/server";

const chat_gpt3_url = "https://api.openai.com/v1/chat/completions"
const gpt3_headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
}

export async function POST(req, res) {

    const {text} = await req.json();
    console.log("text: ", text)

    try {
        const messages = [
            {
                role: "system",
                content: "You specialise in sheet music publications. When given the text from the front cover and first page of music of a piece of sheet music, you extract the following key pieces of information: Song title, composer and music publisher."
            },
            {
                role: "user",
                content: text
            }
        ]

        const chatGptPayload = {
            model: "gpt-3.5-turbo-16k",
            messages: messages,
            temperature: 1.3,
            max_tokens: 2000,
            top_p: 1,
            stop: ["###"],
        };

        const response = await fetch(chat_gpt3_url, {
            headers: gpt3_headers,
            method: "POST",
            body: JSON.stringify(chatGptPayload),
            cache: "no-cache"
        })

        if (!response.ok) throw new Error("GPT-3 API fetch error");

        const responseJson = await response.json();

        console.log("responseJson ", responseJson)
        console.log("message choices ",responseJson.choices[0].message.content.trim())

        const output = JSON.parse(
            responseJson.choices[0].message.content.trim()
        );

        return output;
        
    } catch (error) {
        console.log("Error!!!")
        
    }



}