import Image from "next/image";
import React from "react";

function PostImage({ urlImage }: { urlImage: string }) {
  return (
    <div className="rounded-lg overflow-hidden">
      <Image
        width={100}
        height={100}
        src={urlImage}
        alt="Post content"
        className="w-full h-auto object-cover"
      />
    </div>
  );
}

export default PostImage;
