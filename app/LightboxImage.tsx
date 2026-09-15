import Image from "next/image";

type LightboxImageProps = {
  src: string;
  thumbnailSrc?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export default function LightboxImage({
  src,
  thumbnailSrc,
  alt,
  className = "",
  priority = false,
  sizes = "100vw",
}: LightboxImageProps) {
  return <Image src={thumbnailSrc ?? src} alt={alt} fill priority={priority} unoptimized sizes={sizes} className={`portfolio-image ${className}`} />;
}
