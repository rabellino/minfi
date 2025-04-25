import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Link,
  Button,
} from "@chakra-ui/react";
import { FaDownload, FaLinkedin } from "react-icons/fa";

const Resume = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <Box bg={bgColor} minH="100vh" pt="70px">
      <Container maxW="1200px" py={20}>
        <VStack spacing={8} align="start">
          <Heading
            size="2xl"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
          >
            Resume
          </Heading>

          <HStack spacing={4}>
            <Button
              as="a"
              href="/path-to-your-resume.pdf"
              target="_blank"
              leftIcon={<FaDownload />}
              colorScheme="blue"
            >
              Download PDF
            </Button>
            <Button
              as="a"
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              leftIcon={<FaLinkedin />}
              colorScheme="linkedin"
            >
              LinkedIn Profile
            </Button>
          </HStack>

          <Box w="100%" p={6} bg={cardBg} rounded="xl" shadow="lg">
            <VStack align="start" spacing={6}>
              <Box>
                <Heading size="md" mb={2}>Experience</Heading>
                <VStack align="start" spacing={4}>
                  <Box>
                    <Text fontWeight="bold">Senior Software Engineer</Text>
                    <Text color={textColor}>Company Name • 2020 - Present</Text>
                    <Text mt={2}>• Led development of multiple full-stack applications</Text>
                    <Text>• Implemented modern frontend architectures using React</Text>
                    <Text>• Developed RESTful APIs and microservices</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Software Developer</Text>
                    <Text color={textColor}>Previous Company • 2018 - 2020</Text>
                    <Text mt={2}>• Developed and maintained web applications</Text>
                    <Text>• Collaborated with cross-functional teams</Text>
                  </Box>
                </VStack>
              </Box>

              <Box>
                <Heading size="md" mb={2}>Education</Heading>
                <VStack align="start" spacing={4}>
                  <Box>
                    <Text fontWeight="bold">Bachelor of Science in Computer Science</Text>
                    <Text color={textColor}>University Name • 2014 - 2018</Text>
                  </Box>
                </VStack>
              </Box>

              <Box>
                <Heading size="md" mb={2}>Skills</Heading>
                <Text color={textColor}>
                  JavaScript, React, Node.js, Python, SQL, Git, AWS, Docker,
                  REST APIs, GraphQL, TypeScript, HTML/CSS
                </Text>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Resume; 