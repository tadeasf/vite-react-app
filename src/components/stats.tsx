/** @format */

import { Container, Text, SimpleGrid, Box } from "@chakra-ui/react";

interface StatData {
  id: number;
  label: string;
  score: string;
}

const statData: StatData[] = [
  {
    id: 1,
    label: "Websites built",
    score: "5",
  },
  {
    id: 2,
    label: "Years coded",
    score: "2+",
  },
  {
    id: 3,
    label: "Daily cups of coffee",
    score: "5+",
  },
];

const BlogStats = () => {
  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacing={5}
        mt={12}
        mb={4}
      >
        {statData.map((data) => (
          <Box key={data.id} p={5} boxShadow="md" rounded="md" borderWidth={1}>
            <Text fontWeight="extrabold" fontSize="x-large">
              {data.score}
            </Text>
            <Text>{data.label}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default BlogStats;
