import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if(!identity) {
      throw new Error("Not authenticated");
    }

    const documents = await ctx.db.query("documents").collect();

    return documents;
  }
})

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents"))
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log('identity', identity)

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    console.log('userId', userId)

    const document = await ctx.db.insert("documents", {
      title: args.title,
      userId,
      parentDocument: args.parentDocument,
      isArchived: false,
      isPublished: false,
    });

    console.log('document', document)

    return document;
  }
});