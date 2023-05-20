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
  Image,
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
} from "@chakra-ui/react"
import emptyFridge from "../../assets/empty-fridge.jpg"
import apiClient from "../../services/apiClient"
import Jumbo from "../Jumbo/Jumbo"
import Empty from "../Empty/Empty"
import moment from "moment"

import "./NutritionPage.css"

export default function NutritionPage({ appState, setAppState }) {
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
    <Box className="NutritionPage" mt={10}>
      <Jumbo title="Nutrition" bg="blue.300" />
      <Flex maxW="1680px" mx="auto">
        <Routes>
          <Route path="/" element={<NutritionPageHome appState={appState} setAppState={setAppState} />} />
          <Route path="/create" element={<NutritionPageCreate appState={appState} setAppState={setAppState} />} />
        </Routes>
      </Flex>
    </Box>
  )
}

function NutritionPageHome({ appState, setAppState }) {
  const nutritionItems = appState.nutrition || []
  return (
    <Flex mt={16} maxW="1680px" mx="auto" w="100%">
      <Flex mx="auto" flex="1" align="center" justify="center">
        <div className="nutrition-feed">
          {nutritionItems.length === 0 ? (
            <>
              <Empty>
                <Link to="/nutrition/create" as={ReactRouterLink} className="button">
                  <Button>
                    <>Record Nutrition</>
                  </Button>
                </Link>

                <Image mt={10} my={10} boxSize="300px" objectFit="cover" src={emptyFridge} borderRadius="lg" />
              </Empty>
            </>
          ) : (
            <>
              <Link to="/nutrition/create" as={ReactRouterLink} className="button">
                <Button>
                  <>Record Nutrition</>
                </Button>
              </Link>
              {nutritionItems.map((nutrition) => (
                <NutritionItem nutrition={nutrition} key={nutrition.id} />
              ))}
            </>
          )}
        </div>
      </Flex>
    </Flex>
  )
}

const NutritionItem = ({ nutrition }) => {
  if (!nutrition) return null
  const { category, timestamp, name, calories, quantity, imageUrl } = nutrition

  return (
    <Stack my={5} display="flex" direction="column" w="100%">
      <Box as="span" fontSize="sm" color="gray.500">
        {moment(timestamp).calendar()}
      </Box>
      <Flex direction="column" shadow="lg" borderRadius="lg" px={10} py={5} backgroundColor="blue.300">
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
            <StatLabel>Calories</StatLabel>
            <StatNumber>{calories}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Quantity</StatLabel>
            <StatNumber>{quantity}</StatNumber>
          </Stat>
        </Flex>
      </Flex>
    </Stack>
  )
}

function NutritionPageCreate({ setAppState, appState }) {
  return (
    <Box>
      <Flex mt={16} maxW="1680px" mx="auto">
        <Stack spacing={16} flex={1} mx={[6, 10]} mb={32}>
          <Grid templateColumns={["1fr 1.5fr 1fr"]} columnGap={10} rowGap={12}>
            <div />
            <NutritionPageCreateForm appState={appState} setAppState={setAppState} />
            <div />
          </Grid>
        </Stack>
      </Flex>
    </Box>
  )
}

function NutritionPageCreateForm({ setAppState, appState }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState({
    name: "",
    category: "",
    quantity: 1,
    calories: "",
    imageUrl: "",
  })
  const [errors, setErrors] = useState({})

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data, error, message } = await apiClient.createNutrition(form)

      if (error) {
        setErrors((e) => ({ ...e, form: message }))
        setIsLoading(false)
        return
      }
      if (data) {
        setAppState((s) => ({ ...s, nutrition: [data.nutrition, ...s.nutrition] }))
        navigate("/nutrition")
      }
    } catch (err) {
      setErrors((e) => ({ ...e, form: err }))
    } finally {
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
        {/* <Avatar bg="teal.500" /> */}

        <Heading color="blue.300">Record Nutrition</Heading>

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
                  <option value="snack">Snack</option>
                  <option value="beverage">Beverage</option>
                  <option value="food">Food</option>
                </Select>
              </FormControl>

              <Flex direction="row" justify="space-between">
                <FormControl isRequired>
                  <FormLabel>Quantity</FormLabel>
                  <NumberInput
                    name="quantity"
                    step={1}
                    defaultValue={1}
                    min={1}
                    max={100}
                    value={form.quantity}
                    onChange={(v) => handleOnNumberInputChange("quantity", v)}
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
                  <FormLabel>Calories</FormLabel>
                  <NumberInput
                    name="calories"
                    step={10}
                    defaultValue={0}
                    min={0}
                    max={100000}
                    value={form.calories}
                    onChange={(v) => handleOnNumberInputChange("calories", v)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </Flex>

              <FormControl>
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
              </FormControl>

              <Button
                isLoading={isLoading}
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="blue"
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
