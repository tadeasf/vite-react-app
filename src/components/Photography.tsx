/** @format */

import { useEffect, useState } from "react";
import { Box, SimpleGrid, Container, Image, Text, Tag } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

interface Photo {
  id: number;
  attributes: {
    name: string;
    formats: {
      thumbnail: ImageFormat;
      small: ImageFormat;
      medium: ImageFormat;
      large: ImageFormat;
    };
    url: string;
  };
}

interface Gallery {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description: string;
    tags: string;
    gallery: {
      data: Photo[];
    };
  };
}

const baseURL = "https://tadeasfort.eu/strapi";

// Define a list of colors
const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
];

// Map of tags to colors
const tagColorMap: { [key: string]: string } = {};

// Function to get a color for a tag
function getTagColor(tag: string) {
  // If the tag already has a color, return it
  if (tag in tagColorMap) {
    return tagColorMap[tag];
  }

  // Find a color that hasn't been used yet
  const unusedColor = colors.find(
    (color) => !Object.values(tagColorMap).includes(color)
  );

  // If there's an unused color, assign it to the tag
  if (unusedColor) {
    tagColorMap[tag] = unusedColor;
    return unusedColor;
  }

  // If all colors are used, just return the first color
  return colors[0];
}

const Photography = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);

  useEffect(() => {
    fetch(`${baseURL}/api/galleries?populate=*`)
      .then((response) => response.json())
      .then((data) => setGalleries(data.data));
  }, []);

  return (
    <Container maxWidth="1200px" mx="auto" my="auto" p={{ base: 5, md: 10 }}>
      <SimpleGrid columns={[1, 2, 3]} spacing="15px">
        {galleries.map((gallery) => {
          const {
            title,
            description,
            gallery: galleryData,
          } = gallery.attributes;
          const image = galleryData.data[0].attributes.formats.medium.url; // Use the first image from the gallery
          return (
            <Box position="relative" key={gallery.attributes.slug}>
              <Link to={`/gallery/${gallery.attributes.slug}?id=${gallery.id}`}>
                <Box
                  borderWidth="1px"
                  shadow="md"
                  rounded="lg"
                  overflow="hidden"
                  position="relative"
                >
                  <Image src={`${baseURL}${image}`} alt={title} />
                  <Box p={{ base: 4, lg: 6 }}>
                    <Box alignItems="baseline">
                      <Box
                        fontWeight="semibold"
                        as="h2"
                        letterSpacing="wide"
                        textTransform="uppercase"
                        ml="2"
                      >
                        {title}
                      </Box>
                    </Box>
                    <Box>
                      <Box color="gray.600" fontSize="sm">
                        {gallery.attributes.tags
                          .split(",")
                          .map((tag, index) => (
                            <Tag
                              key={index}
                              colorScheme={getTagColor(tag.trim())} // Use the color based on the tag string
                              borderRadius="full"
                            >
                              {tag.trim()}
                            </Tag>
                          ))}
                      </Box>
                    </Box>
                    <Text
                      mt="1"
                      fontWeight="semibold"
                      noOfLines={3}
                      lineHeight="tight"
                      color="gray.600"
                      fontSize="sm"
                    >
                      {description}
                    </Text>
                  </Box>
                </Box>
              </Link>
            </Box>
          );
        })}
      </SimpleGrid>
    </Container>
  );
};
export default Photography;
