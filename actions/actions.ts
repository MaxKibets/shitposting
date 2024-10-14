"use server";

import { redirect } from "next/navigation";

import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { uploadImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

type PostStateProps = {
  errors: string[];
};

export const createPost = async (
  prevState: PostStateProps,
  formData: FormData,
): Promise<PostStateProps> => {
  const title = formData.get("title") as string;
  const image = formData.get("image") as File;
  const content = formData.get("content") as string;

  const errors = [];

  if (!title || title.trim() === "") {
    errors.push("Title is required");
  }

  if (!content || content.trim() === "") {
    errors.push("Content is required");
  }

  if (!image || image.size === 0) {
    errors.push("Image is required");
  }

  if (errors.length > 0) {
    return { errors } as PostStateProps;
  }

  const imageUrl = await uploadImage(image);

  storePost({
    imageUrl,
    title,
    content,
    userId: "1",
  });

  redirect("/feed");
};

export const togglePostLikeStatus = (postId: string) => {
  updatePostLikeStatus(postId, "2");
  revalidatePath("/feed");
};
