import axios from "axios";
import { envConfig } from "../../config";

const { openaiKey, openaiURL } = envConfig;

const openai = axios.create({
  baseURL: openaiURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${openaiKey}`,
  },
});

export const getOpenAIResponse = async (prompt: string) => {
  const response = await openai.post("/completions", {
    model: "gpt-4o-mini",
    messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
    max_tokens: 100,
  });
  return response.data;
};
