import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  SimpleGrid,
  Icon,
  List,
  ListItem,
  ListIcon,
  HStack,
  Button,
} from "@chakra-ui/react";
import { FaCheckCircle, FaCode, FaServer, FaDatabase, FaTools, FaGithub, FaLinkedin } from "react-icons/fa";

const SkillSection = ({ icon, title, skills }) => {
  return (
    <VStack align="start" spacing={4} w="full">
      <HStack spacing={3}>
        <Icon as={icon} w={6} h={6} color="brand.500" />
        <Heading size="md">{title}</Heading>
      </HStack>
      <List spacing={2}>
        {skills.map((skill, index) => (
          <ListItem key={index}>
            <ListIcon as={FaCheckCircle} color="brand.500" />
            {skill}
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

const About = () => {
  const bgColor = useColorModeValue("background.light", "background.dark");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "gray.700");

  const skills = {
    frontend: [
      "React & Next.js",
      "TypeScript",
      "HTML5 & CSS3",
      "Responsive Design",
      "State Management (Redux, Context)",
    ],
    backend: [
      "Python",
      "Node.js",
      "RESTful APIs",
      "GraphQL",
      "Microservices",
    ],
    database: [
      "SQL Databases",
      "NoSQL Databases",
      "Database Design",
      "ORM Tools",
      "Data Modeling",
    ],
    tools: [
      "Git & GitHub",
      "Docker",
      "AWS",
      "CI/CD",
      "Testing (Jest, React Testing Library)",
    ],
  };

  return (
    <Box
      as="main"
      flex="1"
      minH="100vh"
      pt={{ base: "60px", md: "70px" }}
      bg={bgColor}
    >
      <Container maxW="1200px" py={{ base: 12, md: 20 }}>
        <VStack spacing={{ base: 8, md: 12 }} align="start">
          <VStack spacing={8} w="full" align="start">
            <Heading
              size={{ base: "xl", md: "2xl" }}
              bgGradient="linear(to-r, brand.400, brand.600)"
              bgClip="text"
            >
              About Me
            </Heading>
            
            <HStack spacing={4}>
              <Button
                as="a"
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={<FaGithub />}
                colorScheme="brand"
                size={{ base: "sm", md: "md" }}
              >
                GitHub
              </Button>
              <Button
                as="a"
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={<FaLinkedin />}
                colorScheme="linkedin"
                size={{ base: "sm", md: "md" }}
              >
                LinkedIn
              </Button>
            </HStack>
          </VStack>

          <Box
            p={6}
            bg={cardBg}
            rounded="xl"
            shadow="lg"
            w="full"
          >
            <Text fontSize={{ base: "md", md: "lg" }} color={textColor} mb={6}>
              I am a passionate Full Stack Developer with expertise in building modern web applications.
              My journey in software development began with a curiosity for creating things that live on the internet.
            </Text>

            <Text fontSize={{ base: "md", md: "lg" }} color={textColor}>
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing my knowledge through
              technical writing and mentoring.
            </Text>
          </Box>

          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 8, md: 10 }}
            w="full"
          >
            <SkillSection
              icon={FaCode}
              title="Frontend Development"
              skills={skills.frontend}
            />
            <SkillSection
              icon={FaServer}
              title="Backend Development"
              skills={skills.backend}
            />
            <SkillSection
              icon={FaDatabase}
              title="Database & Data"
              skills={skills.database}
            />
            <SkillSection
              icon={FaTools}
              title="Tools & Technologies"
              skills={skills.tools}
            />
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default About; 