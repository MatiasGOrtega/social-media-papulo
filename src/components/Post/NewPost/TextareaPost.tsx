import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface TextareaPostProps {
  post: {
    content: string;
    imageUrl: string;
  };
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  user: { imageUrl: string } | null | undefined;
  isPosting: boolean;
}

function TextareaPost({ post, user, isPosting, onChange }: TextareaPostProps) {

  return (
    <div className="flex space-x-4">
      <Avatar className="w-10 h-10">
        <AvatarImage src={user?.imageUrl || "/avatar.png"} />
      </Avatar>
      <Textarea
        placeholder="What's on your mind?"
        className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
        value={post.content}
        onChange={onChange}
        disabled={isPosting}
      />
    </div>
  );
}

export default TextareaPost;
