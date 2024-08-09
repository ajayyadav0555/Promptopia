import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Failed to fetch all prompts:', error); // Log the error for debugging
        return new Response("Failed to fetch all prompts", {
            status: 500,
            headers: { 'Content-Type': 'text/plain' }
        });
    }
};
