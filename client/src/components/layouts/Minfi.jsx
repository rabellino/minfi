import React from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  Code, 
  useColorModeValue,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Icon,
  Flex,
  Badge,
  Link
} from '@chakra-ui/react';
import { FaDocker, FaGithub, FaShieldAlt, FaServer, FaChartLine, FaCode, FaCloud, FaSync } from 'react-icons/fa';
import { SiKubernetes } from 'react-icons/si';

const Minfi = () => {
  const bgColor = useColorModeValue('background.light', 'background.dark');
  const codeBgColor = useColorModeValue('gray.100', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const linkColor = useColorModeValue('blue.600', 'blue.400');

  const sections = [
    {
      title: "Infrastructure as Code (IaC)",
      description: "Infrastructure as Code is a key practice in modern DevOps. It allows us to version control our infrastructure and maintain consistency across environments.",
      icon: FaServer,
      code: `# Example Terraform configuration
resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "example-instance"
  }
}`,
      badge: "Terraform",
      githubPath: "/terraform"
    },
    {
      title: "Continuous Integration",
      description: "CI ensures that code changes are automatically tested and integrated into the main codebase.",
      icon: FaGithub,
      code: `# Example GitHub Actions workflow
name: CI Pipeline
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Tests
        run: npm test`,
      badge: "GitHub Actions",
      githubPath: "/.github/workflows"
    },
    {
      title: "Continuous Deployment",
      description: "CD automates the deployment process, ensuring consistent and reliable releases.",
      icon: FaCloud,
      code: `# Example deployment script
#!/bin/bash
# Deploy to production
echo "Deploying to production..."
docker-compose -f docker-compose.prod.yml up -d
echo "Running database migrations..."
npm run migrate:prod
echo "Deployment complete!"`,
      badge: "CD",
      githubPath: "/deployments"
    },
    {
      title: "Monitoring and Observability",
      description: "Proper monitoring and observability are crucial for maintaining system health.",
      icon: FaChartLine,
      code: `# Example Prometheus configuration
global:
  scrape_interval: 15s
scrape_configs:
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['localhost:9100']`,
      badge: "Prometheus",
      githubPath: "/monitoring"
    },
    {
      title: "Security Best Practices",
      description: "Security should be integrated into every stage of the development lifecycle.",
      icon: FaShieldAlt,
      code: `# Example Dockerfile with security best practices
FROM node:16-alpine
USER node
WORKDIR /app
COPY --chown=node:node . .
RUN npm ci --only=production
CMD ["npm", "start"]`,
      badge: "Security",
      githubPath: "/security"
    },
    {
      title: "Docker Containers",
      description: "Docker containers provide a consistent environment for applications across different stages of development.",
      icon: FaDocker,
      code: `# Example docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
  db:
    image: postgres:13
    environment:
      - POSTGRES_PASSWORD=secret
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`,
      badge: "Docker",
      githubPath: "/docker"
    },
    {
      title: "Kubernetes",
      description: "Kubernetes orchestrates containerized applications, providing scalability and reliability.",
      icon: SiKubernetes,
      code: `# Example Kubernetes deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: my-app:latest
        ports:
        - containerPort: 3000
        resources:
          limits:
            cpu: "1"
            memory: "1Gi"
          requests:
            cpu: "500m"
            memory: "512Mi"`,
      badge: "K8s",
      githubPath: "/kubernetes"
    },
    {
      title: "ArgoCD",
      description: "ArgoCD implements GitOps practices for Kubernetes, ensuring declarative configuration and automated deployments.",
      icon: FaSync,
      code: `# Example argocd-application.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/example/my-app.git
    targetRevision: HEAD
    path: k8s
  destination:
    server: https://kubernetes.default.svc
    namespace: my-app
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`,
      badge: "GitOps",
      githubPath: "/argocd"
    }
  ];

  return (
    <Box
      as="main"
      flex="1"
      minH="100vh"
      pt={{ base: "60px", md: "70px" }}
      bg={bgColor}
    >
      <Container maxW="1200px" py={{ base: 12, md: 20 }}>
        <VStack spacing={12} align="stretch">
          <Box textAlign="center" mb={8}>
            <Heading size="2xl" mb={4}>DevOps & CI/CD Best Practices</Heading>
            <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')}>
              Modern development practices for scalable and reliable applications
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
            {sections.map((section, index) => (
              <Card 
                key={index} 
                bg={cardBgColor}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
                overflow="hidden"
                transition="transform 0.2s"
                _hover={{ transform: 'translateY(-4px)' }}
              >
                <CardHeader>
                  <Flex align="center" justify="space-between" mb={2}>
                    <Icon as={section.icon} boxSize={6} />
                    <Badge colorScheme="blue">{section.badge}</Badge>
                  </Flex>
                  <Heading size="md">{section.title}</Heading>
                </CardHeader>
                <CardBody>
                  <Text mb={4}>{section.description}</Text>
                  <Code 
                    p={4} 
                    borderRadius="md" 
                    bg={codeBgColor} 
                    display="block" 
                    whiteSpace="pre"
                    fontSize="sm"
                    overflowX="auto"
                    mb={4}
                  >
                    {section.code}
                  </Code>
                  <Link 
                    href={`https://github.com/rabellino/minfi${section.githubPath}`}
                    color={linkColor}
                    isExternal
                    display="flex"
                    alignItems="center"
                    gap={2}
                    _hover={{ textDecoration: 'none', color: useColorModeValue('blue.500', 'blue.300') }}
                  >
                    <FaGithub />
                    View implementation on GitHub
                  </Link>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Minfi; 