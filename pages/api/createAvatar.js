import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  switch (req.method) {
    case "GET":
      const { rows: getRows } = await sql`SELECT * FROM avatars;`;
      res.status(200).json(getRows);
      break;
    case "POST":
      try {
        const { name, image, interests } = JSON.parse(req.body);
        const chat_completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Write a 1 paragraph, 3 sentence, description about a person named ${name} who is interested in ${interests}`,
            },
          ],
        });
        const message = chat_completion.data.choices[0].message.content;
        console.log("CHATGPT: ", message);
        await sql`INSERT INTO avatars (name, image, interests, description) VALUES (${name}, ${image}, ${interests}, ${message});`;
      } catch (error) {
        console.error(error);
        res.status(500).json({ error });
      }
      const { rows: postRows } = await sql`SELECT * FROM avatars;`;
      res.status(200).json(postRows);
      break;
    default:
      res.status(405).end(); //Method Not Allowed
  }
}
