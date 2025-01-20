"use client";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
import { createPost } from "@/actions/post.actions";
import { Card, CardContent } from "@/components/ui/card";
import TextareaPost from "./TextareaPost";
import { Button } from "@/components/ui/button";
import ImageUpload from "./ImageUpload";

function CreatePost() {
  const { user } = useUser();
  const [isPosting, setIsPosting] = useState(false);
  const [post, setPost] = useState({
    content: "",
    imageUrl: "",
    showImageUpload: false,
  });

  const handleSubmit = async () => {
    if (!post.content.trim() && !post.imageUrl) return;

    setIsPosting(true);
    try {
      const result = await createPost(post.content, post.imageUrl);
      if (result?.success) {
        // reset the form
        setPost({
          content: "",
          imageUrl: "",
          showImageUpload: false,
        });

        toast.success("Posteo creado exitosamente");
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      toast.error("Error al crear el post");
    } finally {
      setIsPosting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost((prevPost) => ({ ...prevPost, content: e.target.value }));
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <TextareaPost
            post={post}
            user={user}
            isPosting={isPosting}
            onChange={handleChange}
          />

          {(post.showImageUpload || post.imageUrl) && (
            <div className="border rounded-lg p-4">
              {/* AQUI VA EL FORM PARA CARGAR IMAGEN */}
              <ImageUpload
                endpoint="imageUploader"
                value={post.imageUrl}
                onChange={(url) => {
                  setPost({ ...post, imageUrl: url });
                  if (!url) {
                    setPost({ ...post, showImageUpload: false });
                  }
                }}
              />
            </div>
          )}

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
                onClick={() =>
                  setPost({ ...post, showImageUpload: !post.showImageUpload })
                }
                disabled={isPosting}
              >
                <ImageIcon className="size-4 mr-2" />
                Imagen
              </Button>
            </div>
            <Button
              className="flex items-center"
              onClick={handleSubmit}
              disabled={(!post.content.trim() && !post.imageUrl) || isPosting}
            >
              {isPosting ? (
                <>
                  <Loader2Icon className="size-4 mr-2 animate-spin" />
                  Publicando...
                </>
              ) : (
                <>
                  <SendIcon className="size-4 mr-2" />
                  Postear
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CreatePost;
