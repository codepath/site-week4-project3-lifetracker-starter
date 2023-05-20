import { useState } from "react"
import apiClient from "../../services/apiClient"
import { Link as ReactRouterLink, useNavigate } from "react-router-dom"
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  // FormHelperText,
  InputRightElement,
} from "@chakra-ui/react"
import { FaLock, FaEnvelope } from "react-icons/fa"

// const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)
const CFaEnvelope = chakra(FaEnvelope)

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const Login = ({ setAppState }) => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    await sleep(2000)

    try {
      const { data, error, message } = await apiClient.login(form)
      if (error) {
        setErrors((e) => ({ ...e, form: String(message) }))
        setIsLoading(false)
        return
      }

      if (data) {
        // setAppState(data)
        setAppState((s) => ({ ...s, user: data.user, isAuthenticated: true }))
        localStorage.setItem("lifetracker_token", data.token)
        navigate("/activity")
      }
    } catch (err) {
      setIsLoading(false)
    }
  }

  const handleOnChange = (e) => {
    if (e.target.name === "email") {
      if (e.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleShowClick = () => setShowPassword(!showPassword)

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      minH="80vh"
      // height="100vh"
      // backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleOnSubmit}>
            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<CFaEnvelope color="gray.300" />} />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => handleOnChange(e)}
                    isInvalid={errors.email}
                    errorBorderColor="red.300"
                  />
                </InputGroup>
              </FormControl>
              {/* <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<CFaEnvelope color="gray.300" />} />
                  <Input type="email" placeholder="Email" />
                </InputGroup>
              </FormControl> */}
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300" children={<CFaLock color="gray.300" />} />
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => handleOnChange(e)}
                    isInvalid={errors.password}
                    errorBorderColor="red.300"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {/* <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300" children={<CFaLock color="gray.300" />} />
                  <Input type={showPassword ? "text" : "password"} placeholder="Password" />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
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
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" to="/register" as={ReactRouterLink}>
          Sign Up
        </Link>
      </Box>
    </Flex>
  )
}

export default Login
