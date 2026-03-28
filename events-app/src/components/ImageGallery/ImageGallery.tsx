"use client";

import { useState } from "react";
import Image from "next/image";
import { IMAGE_GALLERY_STYLES } from "./ImageGallery.styles";
import { isDataImageSrc } from "@/lib/nextImage";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='446' height='600' viewBox='0 0 446 600'%3E%3Crect fill='%23e4e4e7' width='446' height='600'/%3E%3Ctext fill='%2371717a' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18'%3ESlika događaja%3C/text%3E%3C/svg%3E";

export const ImageGallery = ({ images, alt }: ImageGalleryProps) => {
  const [selected, setSelected] = useState(0);
  const safeImages = images.length > 0 ? images : [PLACEHOLDER];

  return (
    <div className={IMAGE_GALLERY_STYLES.container}>
      {/* Main image */}
      <div className={`${IMAGE_GALLERY_STYLES.mainImage.wrapper} ${IMAGE_GALLERY_STYLES.mainImage.responsive}`}>
        <Image
          src={safeImages[selected] ?? safeImages[0]}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 446px"
          priority
          unoptimized={isDataImageSrc(safeImages[selected] ?? safeImages[0])}
        />
      </div>
      
      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className={`${IMAGE_GALLERY_STYLES.thumbnails.container} ${IMAGE_GALLERY_STYLES.thumbnails.responsive}`}>
          {safeImages.slice(0, 3).map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              className={`
                ${IMAGE_GALLERY_STYLES.thumbnails.button}
                ${IMAGE_GALLERY_STYLES.thumbnails.buttonSize}
                ${selected === i 
                  ? IMAGE_GALLERY_STYLES.thumbnails.buttonActive 
                  : IMAGE_GALLERY_STYLES.thumbnails.buttonInactive
                }
              `}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 25vw, 133px"
                unoptimized={isDataImageSrc(src)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};