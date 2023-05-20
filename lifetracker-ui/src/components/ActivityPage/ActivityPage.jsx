import React from "react"
import { useNavigate } from "react-router-dom"
import {
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Stack,
  Text,
  Flex,
  Icon,
  Badge,
  Container,
  Heading,
  Button,
  Box,
} from "@chakra-ui/react"
import { FaChevronUp, FaChevronDown } from "react-icons/fa"
import Card from "../Card/Card"

import "./ActivityPage.css"

const Actions = ({ title = "Activity Feed" }) => {
  const navigate = useNavigate()

  return (
    <>
      <Stack direction="row" alignItems="top" marginBottom="1.5rem">
        <Heading size="lg">{title}</Heading>
        <Stack direction={["column", "row"]} style={{ marginLeft: "auto" }}>
          <Button onClick={() => navigate("/exercise/create")} colorScheme="teal" size="sm">
            {"Add Exercise"}
          </Button>
          <Button onClick={() => navigate("/sleep/create")} colorScheme="cyan" variant="outline" size="sm">
            {"Log Sleep"}
          </Button>
          <Button onClick={() => navigate("/nutrition/create")} colorScheme="blue" variant="outline" size="sm">
            {"Record Nutrition"}
          </Button>
        </Stack>
      </Stack>
    </>
  )
}

export default function ActivityPage({ appState, setAppState, ...props }) {
  if (!appState.isAuthenticated) {
    return (
      <Flex
        bg="secondary.background"
        minHeight="100%"
        width="100%"
        alignItems="center"
        justifyContent="top"
        flexDirection="column"
        {...props}
        className="ActivityPage"
        pt={30}
      >
        <Container maxW="container.lg" paddingTop="1.5rem">
          <Heading>Log in to see your data.</Heading>
        </Container>
      </Flex>
    )
  }

  return (
    <Flex
      bg="secondary.background"
      minHeight="100%"
      width="100%"
      alignItems="center"
      justifyContent="top"
      flexDirection="column"
      {...props}
      className="ActivityPage"
      pt={30}
    >
      <Container maxW="container.lg" paddingTop="1.5rem">
        <Actions />
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10}>
          <Card title="Total Exercise Minutes" bg="teal.500" color="white">
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontSize="4em" lineHeight="4rem" fontWeight="700">
                {Number(appState.totalExerciseMinutes).toFixed(1)}
              </Text>
              <Stack alignItems="center">
                <Icon as={FaChevronUp} color="gray.100" fontSize="2em" />
                <Badge colorScheme="green">+2.5%</Badge>
              </Stack>
            </Flex>
          </Card>
          <Card title="Average Hours of Sleep" bg="cyan.500" color="white">
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontSize="4em" lineHeight="4rem" fontWeight="700">
                {Number(appState.averageHoursSleep).toFixed(1)}
              </Text>
              <Stack alignItems="center">
                <Icon as={FaChevronDown} color="gray.100" fontSize="2em" />
                <Badge colorScheme="red">-2.5%</Badge>
              </Stack>
            </Flex>
          </Card>
          <Card bg="blue.300" color="white" title="Average Daily Calories">
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontSize="4em" lineHeight="4rem" fontWeight="700">
                {Number(appState.averageDailyCalories).toFixed(2)}
              </Text>
              <Stack alignItems="center">
                <Icon as={FaChevronUp} color="gray.100" fontSize="2em" />
                <Badge colorScheme="green">+5.5%</Badge>
              </Stack>
            </Flex>
          </Card>
          <Card title="More Stats">
            <StatGroup justifyContent="space-between">
              <Stat>
                <StatLabel>Max Calories In One Meal</StatLabel>
                <StatNumber>{Number(appState.maxCaloriesInOneMeal).toFixed(1)}</StatNumber>
              </Stat>

              <Stat>
                <StatLabel>Average Exercise Intensity</StatLabel>
                <StatNumber>{Number(appState.averageExerciseIntensity).toFixed(1)}</StatNumber>
              </Stat>

              <Stat>
                <StatLabel>Total Number of Hours Slept</StatLabel>
                <StatNumber>{Number(appState.totalHoursSlept).toFixed(1)}</StatNumber>
              </Stat>
            </StatGroup>
          </Card>
        </SimpleGrid>

        <Box bg="transparent" w="100%" p={4} color="white"></Box>

        {/* <FeedTiles /> */}
      </Container>
    </Flex>
  )
}
