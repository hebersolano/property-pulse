"use client";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

function PropertyGallery({ images }) {
  console.log("gallery images:", images);
  return (
    <Gallery>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, i) => (
          <div key={i}>
            <Item original={image} thumbnail={image} width="1024" height="768">
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={image}
                  width={400}
                  height={400}
                  alt={`property photo #${1}`}
                  className="h-auto max-w-full rounded-lg"
                />
              )}
            </Item>
          </div>
        ))}
      </div>
    </Gallery>
  );
}

export default PropertyGallery;
