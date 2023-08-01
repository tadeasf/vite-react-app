/**
 * eslint-disable react-hooks/rules-of-hooks
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Box,
  Heading,
  Text,
  VStack,
  Image as ChakraImage,
  Divider,
  HStack,
  Tag,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import gfm from "remark-gfm";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { useLocation } from "react-router-dom";

interface Article {
  attributes: {
    title: string;
    content: string;
    published: string;
    tags: string;
    description: string;
    slug: string;
    hero: {
      data: {
        attributes: {
          formats: {
            large: {
              url: string;
              width: number;
              height: number;
            };
          };
        };
      };
    };
    gallery: {
      data: Array<{
        attributes: {
          formats: {
            large: {
              url: string;
              width: number;
              height: number;
            };
          };
        };
      }>;
    };
  };
}

const SinglePost = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const boxBg = useColorModeValue("whiteAlpha.800", "whiteAlpha.200");
  const boxShadowColor = useColorModeValue("gray.500", "whiteAlpha.200");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    fetch(`https://tadeasfort.eu/strapi/api/articles/${id}?populate=*`)
      .then((response) => response.json())
      .then((data) => setArticle(data.data));
  }, [id]);

  if (!article) {
    return <Box>Loading...</Box>;
  }

  return (
    <Container maxW="80%">
      <VStack spacing={4} align="start">
        <Box position="relative">
          <ChakraImage
            boxSize="100%"
            objectFit="cover"
            src={`https://tadeasfort.eu/strapi${article.attributes.hero.data.attributes.formats.large.url}`}
            alt={article.attributes.title}
            fallbackSrc="https://via.placeholder.com/150"
            aspectRatio={16 / 9} // for a 16:9 aspect ratio
          />

          <Box
            position="absolute"
            bottom="0"
            left="0"
            bg={boxBg}
            p={{ base: "2", md: "4" }}
          >
            <Heading as="h1" fontSize={{ base: "1.25rem", md: "2xl" }}>
              {article.attributes.title}
            </Heading>
          </Box>
        </Box>
        <Box
          p="4"
          boxShadow={`0 0 10px ${boxShadowColor}`}
          borderRadius="md"
          bg={boxBg}
        >
          <Text color="gray.500">
            {new Date(article.attributes.published).toLocaleDateString()}
          </Text>
          <Text>{article.attributes.description}</Text>
        </Box>
        <ReactMarkdown
          remarkPlugins={[gfm]}
          components={{
            h1: ({ node, ...props }) => (
              <Heading as="h1" size="xl" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <Heading as="h2" size="lg" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <Heading as="h3" size="md" {...props} />
            ),
            h4: ({ node, ...props }) => (
              <Heading as="h4" size="sm" {...props} />
            ),
            p: ({ node, ...props }) => <Text {...props} />,
            img: ({ node, ...props }) => (
              <ChakraImage
                boxSize="100%"
                objectFit="cover"
                {...props}
                fallbackSrc="https://via.placeholder.com/150"
              />
            ),
          }}
        >
          {article.attributes.content}
        </ReactMarkdown>
        <Divider marginTop="5" />
        <HStack spacing={2} marginTop="5">
          {article.attributes.tags.split(",").map((tag, index) => (
            <Tag key={index} colorScheme="orange" borderRadius="full">
              {tag.trim()}
            </Tag>
          ))}
        </HStack>
      </VStack>
      <Box marginTop="5">
        <Gallery>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gridGap: "12px",
            }}
          >
            {article.attributes.gallery?.data?.map((item, index) => {
              const imageUrl = `https://tadeasfort.eu/strapi${item.attributes.formats.large.url}`;
              return (
                <Item
                  key={index}
                  original={imageUrl}
                  thumbnail={imageUrl}
                  width={item.attributes.formats.large.width.toString()} // Use actual width from API response
                  height={item.attributes.formats.large.height.toString()} // Use actual height from API response
                >
                  {({ ref, open }) => (
                    <img
                      style={{
                        cursor: "pointer",
                        width: "100%",
                        height: "auto",
                      }}
                      ref={ref as React.RefObject<HTMLImageElement>}
                      onClick={open}
                      src={imageUrl}
                      alt={`Gallery ${index}`}
                    />
                  )}
                </Item>
              );
            })}
          </div>
        </Gallery>
      </Box>
    </Container>
  );
};

export default SinglePost;
