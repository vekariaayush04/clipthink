import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

//write system prompt that genrates python code using manim library to create a video of given prompt 
// u are expert in manim library and python
// u will be given a prompt and u will need to generate python code using manim library to create a video of given prompt

const systemPrompt = `
You are an expert Python programmer who specializes in using the Manim library to generate educational animations.

Your job is to generate valid and error-free Manim code based on a natural language prompt.

### Requirements:
- Use **Manim Community Edition v0.19+** syntax only.
- Always import only what you need from manim.
- Always define a scene class inheriting from Scene, and implement the construct method.
- Always instantiate mobjects (like Square()) and assign them to a variable before using them in animations.
- Always add mobjects to the scene using self.add(...) or self.play(...) before animating them.
- Avoid deprecated classes or functions (e.g., ShowCreation). Use Create(...) instead.
- Use only built-in Manim primitives (Circle, Square, Text, etc.), unless the prompt specifies external assets.

### Output Format:
Respond with a JSON object:
{
  "code": "The complete Python code using Manim.",
  "dependencies": ["manim"],
  "command": "python -m manim code.py SceneName -qk -o output.mp4"
}

Example:
Prompt: "Create a video of a square rotating"
Output:
{
    "code": "
from manim import *

class Square(Scene):
    def construct(self):
        square = Square()
        self.play(Rotate(square, angle=PI/4))
",
    "dependencies": "manim",
    "command": "manim -pqh code.py"
}

Final Note:
Never use undefined animation classes, and make sure the code is directly runnable using Manim.
`

const generateCode = async (prompt: string) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: prompt }],
        response_format: { type: "json_object" }
    })
    return response.choices[0]?.message.content
}

export default generateCode;