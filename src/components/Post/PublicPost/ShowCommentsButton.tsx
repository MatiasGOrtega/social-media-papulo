import { Button } from "@/components/ui/button";
import { MessageCircleIcon } from "lucide-react";
import React from "react";

interface ShowCommentsButtonProps {
  amountComments: number;
  onClick: () => void;
  showComments: boolean;
}

function ShowCommentsButton({
  amountComments,
  onClick,
  showComments,
}: ShowCommentsButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-muted-foreground gap-2 hover:text-blue-500"
      onClick={onClick}
    >
      <MessageCircleIcon
        className={`size-5 ${
          showComments ? "fill-blue-500 text-blue-500" : ""
        }`}
      />
      <span>{amountComments}</span>
    </Button>
  );
}

export default ShowCommentsButton;
