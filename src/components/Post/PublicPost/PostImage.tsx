import Image from "next/image";

function PostImage({ urlImage }: { urlImage: string }) {
  return (
    <div className="rounded-lg overflow-hidden">
      <Image
        width={1280}
        height={760}
        src={urlImage}
        alt="Post content"
        className="w-full h-auto object-cover"
      />
    </div>
  );
}

export default PostImage;
