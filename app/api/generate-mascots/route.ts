import { NextRequest, NextResponse } from "next/server";
import * as fal from "@fal-ai/client";

fal.config({
  credentials: process.env.FAL_API_KEY,
});

const PET_PROMPTS = {
  cats: "cute kawaii cat character, playful expression, simple cartoon style, pastel colors, clean background",
  dogs: "adorable kawaii puppy character, happy expression, simple cartoon style, pastel colors, clean background",
  bunnies: "sweet kawaii bunny character, cute expression, simple cartoon style, pastel colors, clean background",
  foxes: "charming kawaii fox character, clever expression, simple cartoon style, pastel colors, clean background",
};

const THEMES = [
  {
    name: "funky",
    colors: "navy blue and purple with star accents",
    mood: "energetic and cosmic",
  },
  {
    name: "tipsy",
    colors: "burgundy and rose pink with wine bottle",
    mood: "romantic and cozy",
  },
  {
    name: "cloudy",
    colors: "teal and orange with cloud elements",
    mood: "dreamy and moody",
  },
  {
    name: "meowcha",
    colors: "olive green and lime with matcha bowl",
    mood: "calm and zen",
  },
];

export async function POST(req: NextRequest) {
  try {
    const { petVibe, customPrompt } = await req.json();

    if (!process.env.FAL_API_KEY) {
      return NextResponse.json(
        { error: "FAL_API_KEY not configured" },
        { status: 500 }
      );
    }

    const basePrompt = customPrompt || PET_PROMPTS[petVibe as keyof typeof PET_PROMPTS] || PET_PROMPTS.cats;

    // Generate 4 themed mascots in parallel
    const mascots = await Promise.all(
      THEMES.map(async (theme, index) => {
        const fullPrompt = `${basePrompt}, ${theme.colors}, ${theme.mood} vibe, minimalist illustration, no text`;

        const result = await fal.subscribe("fal-ai/flux-pro/v1.1", {
          input: {
            prompt: fullPrompt,
            image_size: "square",
            num_inference_steps: 28,
            guidance_scale: 3.5,
            num_images: 1,
            enable_safety_checker: true,
          },
          logs: true,
        });

        return {
          url: result.images[0].url,
          theme: theme.name,
        };
      })
    );

    return NextResponse.json({ mascots });
  } catch (error) {
    console.error("Error generating mascots:", error);
    return NextResponse.json(
      { error: "Failed to generate mascots" },
      { status: 500 }
    );
  }
}
