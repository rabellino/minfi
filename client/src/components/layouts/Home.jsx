import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Button,
  HStack,
} from "@chakra-ui/react";
import { FaCode, FaServer, FaDatabase, FaGithub, FaLinkedin } from "react-icons/fa";

const Feature = ({ icon, title, text }) => {
  return (
    <VStack
      p={6}
      bg={useColorModeValue("white", "gray.700")}
      rounded="xl"
      shadow="lg"
      align="start"
      spacing={4}
      h="full"
      _hover={{ transform: "translateY(-5px)", transition: "all 0.3s ease" }}
    >
      <Icon as={icon} w={10} h={10} color="brand.500" />
      <Heading size="md">{title}</Heading>
      <Text color={useColorModeValue("gray.600", "gray.300")}>{text}</Text>
    </VStack>
  );
};

const Home = () => {
  const bgColor = useColorModeValue('background.light', 'background.dark');
  const cardBg = useColorModeValue('card.light', 'card.dark');
  const textColor = useColorModeValue('text.light.primary', 'text.dark.primary');
  const subTextColor = useColorModeValue('text.light.secondary', 'text.dark.secondary');

  return (
    <Box
      as="main"
      flex="1"
      bg={bgColor}
      color={textColor}
      minH="100vh"
      pt={{ base: "60px", md: "70px" }}
      transition="background-color 0.2s"
    >
      {/* Hero Section */}
      <Container maxW="1200px" py={{ base: 12, md: 20 }}>
        <VStack spacing={8} textAlign="center">
          <Heading
            size={{ base: "xl", md: "2xl" }}
            bgGradient="linear(to-r, brand.400, brand.600)"
            bgClip="text"
            px={4}
          >
            Michael Rabellino
          </Heading>
          <Text 
            fontSize={{ base: "lg", md: "xl" }} 
            color={subTextColor}
            maxW="800px"
          >
            Full Stack Developer & Software Engineer
          </Text>
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
      </Container>

      {/* Features Section */}
      <Container maxW="1200px" py={{ base: 12, md: 20 }}>
        <SimpleGrid 
          columns={{ base: 1, md: 2, lg: 3 }} 
          spacing={{ base: 8, md: 10 }}
          px={{ base: 4, md: 0 }}
        >
          <Feature
            icon={FaCode}
            title="Frontend Development"
            text="Building modern, responsive web applications with React and modern JavaScript frameworks."
          />
          <Feature
            icon={FaServer}
            title="Backend Development"
            text="Creating robust server-side applications with Python, Node.js, and various backend technologies."
          />
          <Feature
            icon={FaDatabase}
            title="Database Design"
            text="Designing and implementing efficient database schemas and data management solutions."
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Home;