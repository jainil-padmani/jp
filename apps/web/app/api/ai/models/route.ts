import { NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/utils/prisma";
import { withError } from "@/utils/middleware";
import { Provider } from "@/utils/llms/config";

export type OpenAiModelsResponse = Awaited<ReturnType<typeof getOpenAiModels>>;

async function getOpenAiModels({ apiKey }: { apiKey: string }) {
  const openai = new OpenAI({ apiKey, baseURL: "https://api.analogai.in/v1" });
  
  const models = await openai.models.list();

  return models.data.filter((m) => m.id.startsWith("gpt-"));
}

export const GET = withError(async () => {
  const session = await auth();
  if (!session?.user.email)
    return NextResponse.json({ error: "Not authenticated" });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { aiApiKey: true, aiProvider: true },
  });

  if (!user || !user.aiApiKey || user.aiProvider !== Provider.OPEN_AI)
    return NextResponse.json([]);

  const result = await getOpenAiModels({ apiKey: user.aiApiKey });

  return NextResponse.json(result);
});
