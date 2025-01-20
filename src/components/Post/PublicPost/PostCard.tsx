"use client";
import { SignInButton, useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { Card, CardContent } from "../../ui/card";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { LogInIcon, SendIcon } from "lucide-react";
import { Textarea } from "../../ui/textarea";
import { createComment, getPosts } from "@/actions/post.actions";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";
import PostCardTop from "./PostCardTop";
import PostImage from "./PostImage";
import LikeButton from "./LikeButton";
import ShowCommentsButton from "./ShowCommentsButton";

type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[number];

interface PostCardProps {
  post: Post;
  dbUserId: string | null;
}

function PostCard({ post, dbUserId }: PostCardProps) {
  const { user } = useUser();
  const isLogged = user ? true : false;
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleAddComment = async () => {
    if (!newComment.trim() || isCommenting) return;
    try {
      setIsCommenting(true);
      const result = await createComment(post.id, newComment);
      if (result?.success) {
        toast.success("Comentario agregado exitosamente");
        setNewComment("");
      }
    } catch (error) {
      console.error("Failed to add comment", error);
      toast.error("Fallo al agregar comentario");
    } finally {
      setIsCommenting(false);
    }
  };

  const handleShowComments = () => {
    setShowComments((prev) => !prev);
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          <PostCardTop post={post} dbUserId={dbUserId} />

          {/* POST IMAGE */}
          {post.image && <PostImage urlImage={post.image} />}

          {/* LIKE & COMMENT BUTTONS */}
          <div className="flex items-center pt-2 space-x-4">
            <LikeButton post={post} userLogin={isLogged} dbUserId={dbUserId} />

            <ShowCommentsButton
              amountComments={post.comments.length}
              showComments={showComments}
              onClick={handleShowComments}
            />
          </div>

          {/* COMMENTS SECTION */}
          {showComments && (
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-4">
                {/* DISPLAY COMMENTS */}
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <Avatar className="size-8 flex-shrink-0">
                      <AvatarImage
                        src={comment.author.image ?? "/avatar.png"}
                      />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-medium text-sm">
                          {comment.author.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          @{comment.author.username}
                        </span>
                        <span className="text-sm text-muted-foreground">·</span>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.createdAt))} atras
                        </span>
                      </div>
                      <p className="text-sm break-words">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {user ? (
                <div className="flex space-x-3">
                  <Avatar className="size-8 flex-shrink-0">
                    <AvatarImage src={user?.imageUrl || "/avatar.png"} />
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[80px] resize-none"
                    />
                    <div className="flex justify-end mt-2">
                      <Button
                        size="sm"
                        onClick={handleAddComment}
                        className="flex items-center gap-2"
                        disabled={!newComment.trim() || isCommenting}
                      >
                        {isCommenting ? (
                          "Comentando..."
                        ) : (
                          <>
                            <SendIcon className="size-4" />
                            Comentar
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center p-4 border rounded-lg bg-muted/50">
                  <SignInButton mode="modal">
                    <Button variant="outline" className="gap-2">
                      <LogInIcon className="size-4" />
                      Inicia Sesion para comentar
                    </Button>
                  </SignInButton>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default PostCard;
