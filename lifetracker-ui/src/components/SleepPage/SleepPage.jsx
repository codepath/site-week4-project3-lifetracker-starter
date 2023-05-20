import { useState } from "react"
import { Routes, Route, Link as ReactRouterLink, useNavigate } from "react-router-dom"
import {
  // Badge,
  Avatar,
  Container,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  Stat,
  StatLabel,
  StatNumber,
  Button,
  Box,
  Flex,
  Grid,
  // Select,
  Stack,
  Heading,
  Link,
  Image,
} from "@chakra-ui/react"
import apiClient from "../../services/apiClient"
import Jumbo from "../Jumbo/Jumbo"
import Empty from "../Empty/Empty"
import emptyBed from "../../assets/empty-bed.jpg"
import moment from "moment"

import "./SleepPage.css"

export default function SleepPage({ appState, setAppState }) {
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
    <Box className="SleepPage" mt={10}>
      <Jumbo title="Sleep" bg="cyan.500" />
      <Flex maxW="1680px" mx="auto">
        <Routes>
          <Route path="/" element={<SleepPageHome appState={appState} setAppState={setAppState} />} />
          <Route path="/create" element={<SleepPageCreate appState={appState} setAppState={setAppState} />} />
        </Routes>
      </Flex>
    </Box>
  )
}

function SleepPageHome({ appState, setAppState }) {
  const sleepItems = appState.sleep || []

  const addButton = (
    <Link to="/sleep/create" as={ReactRouterLink} className="button">
      <Button>
        <>Add Sleep</>
      </Button>
    </Link>
  )

  return (
    <Flex mt={16} maxW="1680px" mx="auto" w="100%">
      <Flex mx="auto" flex="1" align="center" justify="center">
        <div className="sleep-feed">
          {sleepItems.length === 0 ? (
            <>
              <Empty>
                {addButton}

                <Image mt={10} my={10} boxSize="300px" objectFit="cover" src={emptyBed} borderRadius="lg" />
              </Empty>
            </>
          ) : (
            <>
              {addButton}
              {sleepItems.map((sleep) => (
                <SleepItem sleep={sleep} key={sleep.id} />
              ))}
            </>
          )}
        </div>
      </Flex>
    </Flex>
  )
}

const SleepItem = ({ sleep }) => {
  if (!sleep) return null
  const { startTime, endTime } = sleep
  const name = moment(startTime).format("MMM Do, YYYY")

  const hours = moment(endTime).diff(moment(startTime), "hours", true)

  return (
    <Stack my={5} display="flex" direction="column" w="100%">
      <Flex direction="column" shadow="lg" borderRadius="lg" px={10} py={5} backgroundColor="cyan.500">
        <Flex mb={10}>
          <Avatar name={String(hours) + "hr"} />
          <Box ml="3">
            <Heading color="white">
              <>{name}</>
            </Heading>
          </Box>
        </Flex>

        <Flex justify="space-between" align="center" className="white">
          <Stat>
            <StatLabel>Start Time</StatLabel>
            <StatNumber>{moment(startTime).format("LT")}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>End Time</StatLabel>
            <StatNumber>{moment(endTime).format("LT")}</StatNumber>
          </Stat>
        </Flex>
      </Flex>
    </Stack>
  )
}

function SleepPageCreate({ setAppState, appState }) {
  return (
    <Box>
      <Flex mt={16} maxW="1680px" mx="auto">
        <Stack spacing={16} flex={1} mx={[6, 10]} mb={32}>
          <Grid templateColumns={["1fr 1.5fr 1fr"]} columnGap={10} rowGap={12}>
            <div />
            <SleepPageCreateForm appState={appState} setAppState={setAppState} />
            <div />
          </Grid>
        </Stack>
      </Flex>
    </Box>
  )
}

function SleepPageCreateForm({ setAppState, appState }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState({
    startTime: "",
    endTime: "",
  })
  const [errors, setErrors] = useState({})

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data, error, message } = await apiClient.createSleep(form)

      if (error) {
        setErrors((e) => ({ ...e, form: message }))
        setIsLoading(false)
        return
      }
      if (data) {
        setAppState((s) => ({ ...s, sleep: [data.sleep, ...s.sleep] }))
        navigate("/sleep")
      }
    } catch (err) {
      setErrors((e) => ({ ...e, form: err }))
      setIsLoading(false)
    }
  }

  const handleOnChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
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
        <Heading color="cyan.500">Record Sleep</Heading>

        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleOnSubmit}>
            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
              <FormControl isRequired>
                <FormLabel>Start Time</FormLabel>
                <InputGroup>
                  <Input
                    name="startTime"
                    type="datetime-local"
                    placeholder="Start Time"
                    value={form.startTime}
                    onChange={(e) => handleOnChange(e)}
                    isInvalid={errors.startTime}
                    errorBorderColor="red.300"
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>End Time</FormLabel>
                <InputGroup>
                  <Input
                    name="endTime"
                    type="datetime-local"
                    placeholder="End Time"
                    value={form.endTime}
                    onChange={(e) => handleOnChange(e)}
                    isInvalid={errors.endTime}
                    errorBorderColor="red.300"
                  />
                </InputGroup>
              </FormControl>

              <Button
                isLoading={isLoading}
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="cyan"
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

// import { Routes, Route } from "react-router-dom"
// import { Box, Flex, Grid, Stack } from "@chakra-ui/react"
// import Jumbo from "../Jumbo/Jumbo"

// export default function SleepPage({ appState, setAppState }) {
//   return (
//     <Box>
//       <Jumbo title="Sleep" bg="cyan.500" />
//       <Flex mt={16} maxW="1680px" mx="auto">
//         <Routes>
//           <Route path="/" element={<SleepPageHome appState={appState} setAppState={setAppState} />} />
//           <Route path="/create" element={<SleepPageCreate appState={appState} setAppState={setAppState} />} />
//         </Routes>
//       </Flex>
//     </Box>
//   )
// }

// function SleepPageHome() {
//   return (
//     <Box>
//       <Jumbo title="Sleep" bg="cyan.500" />
//       <Flex mt={16} maxW="1680px" mx="auto">
//         <Stack spacing={16} flex={1} mx={[6, 10]} mb={32}>
//           <Grid templateColumns={["none", "none", "none", "none", "1.5fr 1fr"]} columnGap={10} rowGap={12}>
//             <></>
//           </Grid>
//         </Stack>
//       </Flex>
//     </Box>
//   )
// }

// function SleepPageCreate() {
//   return (
//     <Box>
//       <Jumbo title="Sleep" bg="cyan.500" />
//       <Flex mt={16} maxW="1680px" mx="auto">
//         <Stack spacing={16} flex={1} mx={[6, 10]} mb={32}>
//           <Grid templateColumns={["none", "none", "none", "none", "1.5fr 1fr"]} columnGap={10} rowGap={12}>
//             <></>
//           </Grid>
//         </Stack>
//       </Flex>
//     </Box>
//   )
// }
