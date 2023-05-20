import { useState } from "react"
import { Routes, Route, Link as ReactRouterLink, useNavigate } from "react-router-dom"
import {
  Badge,
  Avatar,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  Stat,
  StatLabel,
  StatNumber,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Container,
  Button,
  Box,
  Flex,
  Grid,
  Select,
  Stack,
  Heading,
  Link,
  Image,
} from "@chakra-ui/react"
import apiClient from "../../services/apiClient"
import Jumbo from "../Jumbo/Jumbo"
import Empty from "../Empty/Empty"
import bikepath from "../../assets/bikepath.jpg"
import moment from "moment"

import "./ExercisePage.css"

export default function ExercisePage({ appState, setAppState }) {
  if (!appState.isAuthenticated) {
    return (
      <Flex
        bg="secondary.background"
        minHeight="100%"
        width="100%"
        alignItems="center"
        justifyContent="top"
        flexDirection="column"
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
    <Box className="ExercisePage" mt={10}>
      <Jumbo title="Exercise" bg="teal.500" />
      <Flex maxW="1680px" mx="auto">
        <Routes>
          <Route path="/" element={<ExercisePageHome appState={appState} setAppState={setAppState} />} />
          <Route path="/create" element={<ExercisePageCreate appState={appState} setAppState={setAppState} />} />
        </Routes>
      </Flex>
    </Box>
  )
}

function ExercisePageHome({ appState, setAppState }) {
  const exerciseItems = appState.exercises || []

  const addButton = (
    <Link to="/exercise/create" as={ReactRouterLink} className="button">
      <Button>
        <>Add Exercise</>
      </Button>
    </Link>
  )

  return (
    <Flex mt={16} maxW="1680px" mx="auto" w="100%">
      <Flex mx="auto" flex="1" align="center" justify="center">
        <div className="exercise-feed">
          {exerciseItems.length === 0 ? (
            <>
              <Empty>
                {addButton}

                <Image mt={10} my={10} boxSize="300px" objectFit="cover" src={bikepath} borderRadius="lg" />
              </Empty>
            </>
          ) : (
            <>
              {addButton}
              {exerciseItems.map((exercise) => (
                <ExerciseItem exercise={exercise} key={exercise.id} />
              ))}
            </>
          )}
        </div>
      </Flex>
    </Flex>
  )
}

const ExerciseItem = ({ exercise }) => {
  if (!exercise) return null
  const { category, timestamp, name, duration, intensity, imageUrl } = exercise

  return (
    <Stack my={5} display="flex" direction="column" w="100%">
      <Box as="span" fontSize="sm" color="gray.500">
        {moment(timestamp).calendar()}
      </Box>
      <Flex direction="column" shadow="lg" borderRadius="lg" px={10} py={5} backgroundColor="teal.500">
        <Flex mb={10}>
          <Avatar src={imageUrl} name={name} />
          <Box ml="3">
            <Heading color="white">
              {name}
              <Badge ml="1" fontSize="0.9rem" colorScheme="green">
                {category}
              </Badge>
            </Heading>
          </Box>
        </Flex>

        <Flex justify="space-between" align="center" className="white">
          <Stat>
            <StatLabel>Duration</StatLabel>
            <StatNumber>{duration}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Intensity</StatLabel>
            <StatNumber>{intensity}/10</StatNumber>
          </Stat>
        </Flex>
      </Flex>
    </Stack>
  )
}

function ExercisePageCreate({ setAppState, appState }) {
  return (
    <Box>
      <Flex mt={16} maxW="1680px" mx="auto">
        <Stack spacing={16} flex={1} mx={[6, 10]} mb={32}>
          <Grid templateColumns={["1fr 1.5fr 1fr"]} columnGap={10} rowGap={12}>
            <div />
            <ExercisePageCreateForm appState={appState} setAppState={setAppState} />
            <div />
          </Grid>
        </Stack>
      </Flex>
    </Box>
  )
}

function ExercisePageCreateForm({ setAppState, appState }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState({
    name: "",
    duration: "",
    intensity: 1,
    category: "",
  })
  const [errors, setErrors] = useState({})

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data, error, message } = await apiClient.createExercise(form)

      if (error) {
        setErrors((e) => ({ ...e, form: message }))
        setIsLoading(false)
        return
      }
      if (data) {
        setAppState((s) => ({ ...s, exercises: [data.exercise, ...s.exercises] }))
        navigate("/exercise")
      }
    } catch (err) {
      setErrors((e) => ({ ...e, form: err }))
      setIsLoading(false)
    }
  }

  const handleOnChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleOnNumberInputChange = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }))
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      // minH="80vh"
      // height="100vh"
      // backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
        <Heading color="teal.500">Record Exercise</Heading>

        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleOnSubmit}>
            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
              <FormControl isRequired>
                <InputGroup>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => handleOnChange(e)}
                    isInvalid={errors.name}
                    errorBorderColor="red.300"
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Select name="category" placeholder="Select a category" value={form.category} onChange={handleOnChange}>
                  <option value="run">Run</option>
                  <option value="bike">Bike</option>
                  <option value="lift">Lift</option>
                  <option value="swim">Swim</option>
                  <option value="sports">Sports</option>
                </Select>
              </FormControl>

              <Flex direction="row" justify="space-between">
                <FormControl isRequired>
                  <FormLabel>Duration (min)</FormLabel>
                  <NumberInput
                    name="duration"
                    step={1}
                    defaultValue={1}
                    min={1}
                    max={100}
                    value={form.duration}
                    // onChange={handleOnChange}
                    // onChange={(e) => handleOnChange(e)}
                    onChange={(v) => handleOnNumberInputChange("duration", v)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                &nbsp;
                <FormControl isRequired>
                  <FormLabel>Intensity</FormLabel>
                  <NumberInput
                    name="intensity"
                    step={1}
                    defaultValue={1}
                    min={1}
                    max={10}
                    value={form.intensity}
                    onChange={(v) => handleOnNumberInputChange("intensity", v)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </Flex>

              {/* <FormControl>
                <InputGroup>
                  <Input
                    name="imageUrl"
                    type="text"
                    placeholder="url for image"
                    value={form.imageUrl}
                    onChange={(e) => handleOnChange(e)}
                    isInvalid={errors.imageUrl}
                    errorBorderColor="red.300"
                  />
                </InputGroup>
              </FormControl> */}

              <Button
                isLoading={isLoading}
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Save
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}
