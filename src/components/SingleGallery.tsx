/** @format */

import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Masonry from "react-masonry-css";
import { Item } from "react-photoswipe-gallery";
import "./SingleGallery.css"; // Import the CSS file
import { useLocation } from "react-router-dom";

interface ImageFormat {
  url: string;
  width: number;
  height: number;
}

interface Image {
  attributes: {
    formats: {
      large: ImageFormat;
    };
  };
}

interface Gallery {
  attributes: {
    slug: string;
    gallery: {
      data: Image[];
    };
  };
}

const SingleGallery = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [gallery, setGallery] = useState<Gallery | null>(null);

  useEffect(() => {
    fetch(`https://tadeasfort.eu/strapi/api/galleries/${id}?populate=*`)
      .then((response) => response.json())
      .then((data) => setGallery(data.data))
      .catch((error) => console.error("Error:", error));
  }, [id]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Box minH="100vh" p={{ base: 5, md: 10 }}>
      {gallery && (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {gallery.attributes.gallery.data.map((item, index) => {
            const imageUrl = `https://tadeasfort.eu/strapi${item.attributes.formats.large.url}`;
            return (
              <Item
                key={index}
                original={imageUrl}
                thumbnail={imageUrl}
                width={item.attributes.formats.large.width} // Use actual width from API response
                height={item.attributes.formats.large.height} // Use actual height from API response
              >
                {({ ref, open }) => (
                  <img
                    style={{ cursor: "pointer", width: "100%", height: "auto" }}
                    ref={ref as React.RefObject<HTMLImageElement>}
                    onClick={open}
                    src={imageUrl}
                    alt={`Gallery ${index}`}
                  />
                )}
              </Item>
            );
          })}
        </Masonry>
      )}
    </Box>
  );
};

export default SingleGallery;
