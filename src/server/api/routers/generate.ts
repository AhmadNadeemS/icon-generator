import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import OpenAI from "openai";
import { env } from "~/env.mjs";
import { b64Image } from "~/data/b64Image";
import AWS from "aws-sdk";

const openai = new OpenAI({
  apiKey: env.DALLE_API_KEY,
});

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: env.NEXT_AWS_ACCESS_KEY,
    secretAccessKey: env.NEXT_AWS_SECRET_KEY,
  },
});

const BUCKET_NAME = "icons-generator-bucket"
async function generateIcon(prompt: string): Promise<string | undefined> {
  if (env.MOCK_DALLE === "true") {
    return b64Image;
  } else {
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });
    return response.data[0]?.b64_json;
  }
}

export const generateRouter = createTRPCRouter({
  generateIcon: publicProcedure
    .input(
      z.object({
        prompt: z.string(),
        color: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { count } = await ctx.prisma.user.updateMany({
        where: {
          id: ctx.session?.user.id,
          credits: {
            gte: 1,
          },
        },
        data: {
          credits: {
            decrement: 1,
          },
        },
      });

      if (count <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "you do not have enough credits",
        });
      }

      const icon = await ctx.prisma.icon.create({
        data: {
          prompt: input.prompt,
          userId: ctx.session?.user.id,
        },
      });

      const finalPrompt = `a modern icon in ${input.color} of a ${input.prompt}`

      const base64EncodedImage = await generateIcon(finalPrompt);

      await s3
        .putObject({
          Bucket: BUCKET_NAME,
          Key: icon.id,
          Body: Buffer.from(base64EncodedImage!, "base64"),
          ContentEncoding: "base64",
          ContentType: "image/png",
        })
        .promise();
      return {
        imageUrl: `https://${BUCKET_NAME}.s3.amazonaws.com/${icon.id}`,
      };
    }),
});
