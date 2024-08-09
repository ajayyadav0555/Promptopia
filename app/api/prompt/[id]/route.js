import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET=async(request,{params})=>{
    try {
        await connectToDB();
        const prompt=await Prompt.findById(params.id).populate('creator');
        if(!prompt) new Response(JSON.stringify(prompt),{
            status:200
        });
        return new Response(JSON.stringify(prompt),{
            status:200
        })
    } catch (error) {
        return new Response("failed to fetch all prompts",{
            status:500
        })
    }
}


export const PATCH=async(request,{params})=>{
    const{prompt,tag}=await request.json();

    try {
        await connectToDB();
        const existprompt=await Prompt.findById(params.id);
        if(!existprompt) return new Response("no prompt is found",{
            status:404
        })
        existprompt.prompt=prompt;
        existprompt.tag=tag
        await existprompt.save();
        return new Response(JSON.stringify(existprompt),{
            status:200
        })

    } catch (error) {
        new Response("failed to update the prompt",{
            status:500
        })
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        
        const result = await Prompt.findByIdAndDelete(params.id); 
        
        if (!deletedPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Failed to delete prompt:", error);
        return new Response("Failed to delete prompt", { status: 500 });
    }
};