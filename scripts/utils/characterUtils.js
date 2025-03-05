// Generate a description using LLM
export const generateCharacterDescription = async (formData) => {
    try {
        const prompt = `Create a detailed character concept for a MOBA (Multiplayer Online Battle Arena) game.
        
Name: ${formData.name}
Role: ${formData.role}
Origin: ${formData.origin}
Difficulty: ${formData.difficulty}

Include the following in your response:
1. A brief backstory (3-4 sentences)
2. Physical appearance (2-3 sentences)
3. Personality traits (2-3 traits with brief explanation)
4. Combat style and weapons/tools
5. 4 unique abilities (name and brief description)
6. Ultimate ability (name and description)

Make the character feel unique, with interesting abilities that would work in a MOBA setting.
Keep everything concise but detailed.`;

        const completion = await window.websim.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a creative game designer specializing in creating detailed MOBA characters. Make each character unique and interesting with clear gameplay mechanics."
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        return completion.content;
    } catch (error) {
        console.error("Error generating character description:", error);
        throw new Error("Failed to generate character description. Please try again.");
    }
};

// Generate image prompt from the description
export const generateImagePrompt = async (description, formData) => {
    try {
        const prompt = `Based on this MOBA character description, create a detailed prompt for generating a high-quality character splash art:

${description}

The prompt should:
1. Describe the character's appearance in detail
2. Mention their pose, expression, and setting
3. Include relevant weapons/tools they use
4. Suggest an appropriate art style for a MOBA character
5. Include lighting and atmosphere details

Format the response as a single, detailed paragraph that could be used for an AI image generator.`;

        const completion = await window.websim.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are an expert at creating detailed image prompts for generating character art. Your prompts should be descriptive and result in high-quality, professional-looking character illustrations."
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        return completion.content;
    } catch (error) {
        console.error("Error generating image prompt:", error);
        throw new Error("Failed to generate image prompt. Please try again.");
    }
};

// Generate the character image using the prompt
export const generateCharacterImage = async (imagePrompt) => {
    try {
        const enhancedPrompt = `${imagePrompt}, splash art for a MOBA character, high quality, dramatic lighting, detailed, professional game art`;
        
        const result = await window.websim.imageGen({
            prompt: enhancedPrompt,
            aspect_ratio: "1:1"
        });

        return result.url;
    } catch (error) {
        console.error("Error generating character image:", error);
        throw new Error("Failed to generate character image. Please try again.");
    }
};

