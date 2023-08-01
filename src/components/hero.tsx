/** @format */

import { Flex, Avatar, Box, Container } from "@chakra-ui/react";
import { MotionBox, MotionFlex } from "./motion";
import Header from "./header";

const ANIMATION_DURATION = 0.5;

const IntroSection = () => {
  const color = "blue.400";

  return (
    <Container maxW="5xl" p={{ base: 5, md: 12 }}>
      <Flex direction={["column", "column", "row"]}>
        <MotionBox
          opacity="0"
          initial={{
            translateX: -150,
            opacity: 0,
          }}
          animate={{
            translateX: 0,
            opacity: 1,
            transition: {
              duration: ANIMATION_DURATION,
            },
          }}
          m="auto"
          mb={[16, 16, "auto"]}
        >
          <MotionBox whileHover={{ scale: 1.2 }} rounded="full" shadow="lg">
            <Avatar
              size="2xl"
              showBorder={true}
              borderColor={color}
              src={
                "https://res.cloudinary.com/ddw1u49ec/image/upload/q_auto:eco/v1690652131/image_bxeoze.webp"
              }
            />
          </MotionBox>
        </MotionBox>
        <MotionFlex
          position="relative"
          ml={["auto", "auto", 16]}
          m={["auto", "initial"]}
          w={["90%", "85%", "80%"]}
          maxW="800px"
          opacity="0"
          justify="center"
          direction="column"
          initial={{
            opacity: 0,
            translateX: 150,
          }}
          animate={{
            opacity: 1,
            translateX: 0,
            transition: {
              duration: ANIMATION_DURATION,
            },
          }}
        >
          <Box position="relative">
            <MotionBox whileHover={{ translateY: -5 }} width="max-content">
              <Header
                underlineColor={color}
                mt={0}
                cursor="pointer"
                width="max-content"
              >
                Hey!
              </Header>
            </MotionBox>
          </Box>
          <Box as="h2" fontSize="2xl" fontWeight="400" textAlign="left">
            My name is{" "}
            <Box as="strong" fontWeight="600">
              Tadeáš
            </Box>{" "}
            and I&apos;m{" "}
            <Box as="span" whiteSpace="nowrap">
              Data Engineer by day and
            </Box>{" "}
            <Box as="span" whiteSpace="nowrap">
              full-stack web developer by night.&nbsp;
            </Box>
          </Box>
          <Box as="h2" fontSize="2xl" fontWeight="400" mt={5} textAlign="left">
            This website serves as my blog, showcase of my coding skills and a
            place to display my photography portfolio. 🇨🇿
          </Box>
        </MotionFlex>
      </Flex>
    </Container>
  );
};

export default IntroSection;
