/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/** @format */

import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import {
  Heading,
  Box,
  useColorMode,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Grid,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

type Repo = {
  name: string;
  dateUpdated: string;
  numberOfCommits: number;
  numberOfDocuments: number;
  totalLinesOfCode: number;
  totalLinesAdded: number;
  totalLinesDeleted: number;
  commits: Array<{
    sha: string;
    date: string;
    linesAdded: number;
    linesDeleted: number;
  }>;
};

const GithubData = () => {
  const [data, setData] = useState<Repo[] | null>(null);
  const { colorMode } = useColorMode();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box
          bg={colorMode === "light" ? "white" : "gray.700"}
          color={colorMode === "light" ? "black" : "white"}
          p={2}
          boxShadow="md"
        >
          <p>Date: {data.date}</p>
          <p>Lines Added: {data.linesAdded}</p>
          <p>Lines Deleted: {data.linesDeleted}</p>
        </Box>
      );
    }

    return null;
  };

  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box
          bg={colorMode === "light" ? "white" : "gray.700"}
          color={colorMode === "light" ? "black" : "white"}
          p={2}
          boxShadow="md"
        >
          <p>{data.name}</p>
          <p>Total lines: {data.totalLinesOfCode}</p>
        </Box>
      );
    }

    return null;
  };

  const CustomBarTooltip2 = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box
          bg={colorMode === "light" ? "white" : "gray.700"}
          color={colorMode === "light" ? "black" : "white"}
          p={2}
          boxShadow="md"
        >
          <p>{data.name}</p>
          <p>Total commits: {data.numberOfCommits}</p>
        </Box>
      );
    }

    return null;
  };

  useEffect(() => {
    axios
      .get("https://tadeasfort.eu/node-express-mern/api/github-data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const repo = data.find((repo) => repo.name === "tadeasfort-chakra-ui");

  // Define the blinking animation
  const blink = keyframes`
    0% {opacity: 1;}
    50% {opacity: 0;}
    100% {opacity: 1;}
  `;

  const lineChartData = data[0].commits.map((commit) => ({
    date: format(parseISO(commit.date), "yyyy-MM-dd"),
    linesAdded: commit.linesAdded,
    linesDeleted: commit.linesDeleted,
  }));

  const barChartData = data.map((repo) => ({
    name: repo.name,
    totalLinesOfCode: repo.totalLinesOfCode,
  }));

  // Sort data for the second bar chart
  const sortedBarChartData = [...barChartData]
    .sort((a, b) => b.totalLinesOfCode - a.totalLinesOfCode)
    .slice(0, 10); // Take top 10

  // Create data for the third bar chart
  const commitsBarChartData = data
    .map((repo) => ({
      name: repo.name,
      numberOfCommits: repo.numberOfCommits,
    }))
    .sort((a, b) => b.numberOfCommits - a.numberOfCommits)
    .slice(0, 10); // Take top 10

  return (
    <Box
      bg={colorMode === "light" ? "white" : "gray.800"}
      color={colorMode === "light" ? "black" : "white"}
    >
      <Heading as="h1" size="xl" textAlign="center" my={5}>
        GitHub Data
      </Heading>
      {repo && (
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={6}
          justifyItems="center"
          alignItems="center"
          my={5}
        >
          <Stat>
            <StatLabel fontSize="lg">Repository Name</StatLabel>
            <StatNumber fontSize="2xl">{repo.name}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel fontSize="lg">Total Lines Added</StatLabel>
            <StatNumber fontSize="2xl" color="green.500">
              {repo.totalLinesAdded}
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel fontSize="lg">Total Lines Deleted</StatLabel>
            <StatNumber fontSize="2xl" color="red.500">
              {repo.totalLinesDeleted}
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel fontSize="lg">Last Commit Date</StatLabel>
            <StatNumber fontSize="2xl">
              <Text>
                {format(parseISO(repo.dateUpdated), "HH")}
                <Text as="span" animation={`${blink} 1s infinite`}>
                  :
                </Text>
                {format(parseISO(repo.dateUpdated), "mm")}
                <Text as="span" animation={`${blink} 1s infinite`}>
                  :
                </Text>
                {format(parseISO(repo.dateUpdated), "ss dd-MM-yyyy")}
              </Text>
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel fontSize="lg">Number of Commits</StatLabel>
            <StatNumber fontSize="2xl">{repo.numberOfCommits}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel fontSize="lg">Total Lines of Code</StatLabel>
            <StatNumber fontSize="2xl">{repo.totalLinesOfCode}</StatNumber>
          </Stat>
        </Grid>
      )}
      <Heading as="h1" size="l" textAlign="center" my={5}>
        Lines Added/Deleted for all repositories
      </Heading>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={lineChartData}>
          <Line type="monotone" dataKey="linesAdded" stroke="#8884d8" />
          <Line type="monotone" dataKey="linesDeleted" stroke="#82ca9d" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          {/* Use the CustomTooltip component */}
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
      <Heading as="h1" size="l" textAlign="center" my={5}>
        Repositories by lines of code
      </Heading>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={sortedBarChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          {/* Use the CustomTooltip component */}
          <Tooltip content={<CustomBarTooltip />} />
          <Bar dataKey="totalLinesOfCode" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <Heading as="h1" size="l" textAlign="center" my={5}>
        Repositories by number of commits
      </Heading>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={commitsBarChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          {/* Use the CustomTooltip component */}
          <Tooltip content={<CustomBarTooltip2 />} />
          <Bar dataKey="numberOfCommits" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default GithubData;
