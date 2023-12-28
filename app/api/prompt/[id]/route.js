import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET REQUEST (READ DATA)
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response("Post not found", { status: 404 })

        return new Response(JSON.stringify(prompt), {
            status: 200
        })
    } catch (error) {
        return new Response('Failed to fetch all prompts', { status: 500 })

    }
}

// PATCH REQUEST (UPDATING DATA)
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try{
        await connectToDB();

        // find post by id
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        //update the post with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        // await data to be saved
        await existingPrompt.save();

        return new Response(JSON.stringify (existingPrompt), {status: 200})
    } catch(error){
        return new Response("Failed to update prompt", {status: 500})
    } 

}

// DELETE (DELETE DATA)
export const DELETE = async (request, { params }) => {
    try{
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id);
        return new Response("Post deleted successfully", {status: 200})

    } catch (error) {
        return new Response("Failed to Delete Post", {status: 500})
    }
}