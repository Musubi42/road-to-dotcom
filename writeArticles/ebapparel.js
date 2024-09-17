import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant designed to output JSON. Please generate a structured JSON article including the following fields: title, subtitle, image, and sections with their titles and content."
      },
      {
        role: "user",
        content: "Title: One Piece Episode 1109 Will Feature The New Yonko!\nContent: This episode is going to be sick. it will release on June 16 2024. The episode is titled: \"Making History! The Turbulent Old and New Four Emperors.\" According to the preview released in Episode 1108, fans can expect to see all the pirates who serve among the Four Emperors. This means even those who have passed away and have the title taken away from them. The episode will feature the following characters: Edward Newgate (Whitebeard), Kaido, Charlotte Linlin (Big Mom), Shanks, Blackbeard, Monkey D. Luffy, Buggy. Join the Sub @animecontent on reddit."
      }
    ],
    model: "gpt-4o", // or "gpt-3.5-turbo"
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 1000,
    n: 1,
    seed: 42 // Set your desired seed for reproducibility
  });

  console.log(completion.choices[0].message.content);
  console.log("System Fingerprint:", completion.system_fingerprint);
}

main();