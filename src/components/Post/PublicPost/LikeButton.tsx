import { getPosts, toggleLike } from "@/actions/post.actions";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { HeartIcon } from "lucide-react";
import { useState } from "react";

interface LikeButtonProps {
  post: Awaited<ReturnType<typeof getPosts>>[number];
  userLogin: boolean;
  dbUserId: string | null;
}

function LikeButton({ post, userLogin, dbUserId }: LikeButtonProps) {
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(
    post.likes.some((like) => like.userId === dbUserId)
  );
  const [optimisticLikes, setOptmisticLikes] = useState(post._count.likes);
  
  const handleLike = async () => {
    if (isLiking) return;
    try {
      setIsLiking(true);
      setHasLiked((prev) => !prev);
      setOptmisticLikes((prev) => prev + (hasLiked ? -1 : 1));
      await toggleLike(post.id);
    } catch (error) {
      console.error("Failed to like post", error);
      setOptmisticLikes(post._count.likes);
      setHasLiked(post.likes.some((like) => like.userId === dbUserId));
    } finally {
      setIsLiking(false);
    }
  };
  return userLogin ? (
    <Button
      variant="ghost"
      size="sm"
      className={`text-muted-foreground gap-2 ${
        hasLiked
          ? "text-red-500 hover:text-red-600"
          : "hover:text-red-500"
      }`}
      onClick={handleLike}
    >
      {hasLiked ? (
        <HeartIcon className="size-5 fill-current" />
      ) : (
        <HeartIcon className="size-5" />
      )}
      <span>{optimisticLikes}</span>
    </Button>
  ) : (
    <SignInButton mode="modal">
      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground gap-2"
      >
        <HeartIcon className="size-5" />
        <span>{optimisticLikes}</span>
      </Button>
    </SignInButton>
  );
}

export default LikeButton;
