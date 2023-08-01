'use client'

import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  useColorModeValue,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { DiPython, DiMongodb, DiPostgresql } from 'react-icons/di'
import { FaNodeJs, FaReact, FaServer } from 'react-icons/fa'

interface StatsCardProps {
  title: string
  icon: ReactNode
}

function StatsCard(props: StatsCardProps) {
  const { title, icon } = props
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}
      textAlign={'center'} // added for centering text
    >
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  )
}

export default function TechStack() {
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
        Techstack
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={'React'} icon={<FaReact size={'3em'} />} />
        <StatsCard title={'Node.js Express'} icon={<FaNodeJs size={'3em'} />} />
        <StatsCard title={'Python'} icon={<DiPython size={'3em'} />} />
        <StatsCard title={'Serverless'} icon={<FaServer size={'3em'} />} />
        <StatsCard title={'MongoDB'} icon={<DiMongodb size={'3em'} />} />
        <StatsCard title={'PostgreSQL'} icon={<DiPostgresql size={'3em'} />} />
      </SimpleGrid>
    </Box>
  )
}
