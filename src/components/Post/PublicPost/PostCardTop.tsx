import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { getPosts } from "@/actions/post.actions";
import DeletePost from "./DeletePost";

interface PostCardTopProps {
  post: Awaited<ReturnType<typeof getPosts>>[number];
  dbUserId: string | null;
}

function PostCardTop({ post, dbUserId }: PostCardTopProps) {
  return (
    <div className="flex space-x-3 sm:space-x-4">
      <Link href={`/profile/${post.author.username}`}>
        <Avatar className="size-8 sm:w-10 sm:h-10">
          <AvatarImage src={post.author.image ?? "/avatar.png"} />
        </Avatar>
      </Link>

      {/* POST HEADER & TEXT CONTENT */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 truncate">
            <Link
              href={`/profile/${post.author.username}`}
              className="font-semibold truncate"
            >
              {post.author.name}
            </Link>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href={`/profile/${post.author.username}`}>
                @{post.author.username}
              </Link>
              <span>•</span>
              <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
            </div>
          </div>
          {/* Check if current user is the post author */}
          {dbUserId === post.author.id && (
            <DeletePost postId={post.id} />
          )}
        </div>
        <p className="mt-2 text-sm text-foreground break-words">
          {post.content}
        </p>
      </div>
    </div>
  );
}

export default PostCardTop;
