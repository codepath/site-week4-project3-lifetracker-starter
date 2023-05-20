import { useState } from "react"
import { Link as ReactRouterLink, useNavigate } from "react-router-dom"
import apiClient from "../../services/apiClient"
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
  FormHelperText,
  InputRightElement,
  // Text,
} from "@chakra-ui/react"
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa"

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)
const CFaEnvelope = chakra(FaEnvelope)

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const Register = ({ setAppState }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState({})

  const handleShowClick = () => setShowPassword(!showPassword)

  // const handleFormSubmit = (e) => {
  //   e.preventDefault()
  //   setSubmitting(true)
  //   setTimeout(function () {
  //     setSubmitting(false)
  //   }, 700)
  // }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    await sleep(2000)

    try {
      const { data, error, message } = await apiClient.register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        username: form.username,
      })
      if (error) {
        setErrors((e) => ({ ...e, form: message }))
        setIsLoading(false)
        return
      }

      if (data) {
        setAppState((s) => ({ ...s, user: data, isAuthenticated: true }))
        localStorage.setItem("lifetracker_token", data.token)
        navigate("/activity")
      }
    } catch (err) {
      setErrors((e) => ({ ...e, form: err }))
      setIsLoading(false)
    }
  }

  const handleOnChange = (e) => {
    if (e.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== e.target.value) {
        setErrors((e) => ({ ...e, passwordConfirm: "Password's do not match" }))
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }))
      }
    }
    if (e.target.name === "passwordConfirm") {
      if (form.password && form.password !== e.target.value) {
        setErrors((e) => ({ ...e, passwordConfirm: "Password's do not match" }))
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }))
      }
    }
    if (e.target.name === "email") {
      if (e.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

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

        <Heading color="teal.400">Create an Account</Heading>

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
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
                  <Input
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={(e) => handleOnChange(e)}
                    isInvalid={errors.username}
                    errorBorderColor="red.300"
                  />
                </InputGroup>
              </FormControl>

              <Flex direction="row" justify="space-between">
                <FormControl isRequired>
                  <InputGroup>
                    {/* <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} /> */}
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={form.firstName}
                      onChange={(e) => handleOnChange(e)}
                      isInvalid={errors.firstName}
                      errorBorderColor="red.300"
                    />
                  </InputGroup>
                </FormControl>
                &nbsp;
                <FormControl isRequired>
                  <InputGroup>
                    {/* <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} /> */}
                    <Input
                      name="lastName"
                      type="text"
                      placeholder="Last name"
                      value={form.lastName}
                      onChange={(e) => handleOnChange(e)}
                      isInvalid={errors.lastName}
                      errorBorderColor="red.300"
                    />
                  </InputGroup>
                </FormControl>
              </Flex>

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
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300" children={<CFaLock color="gray.300" />} />
                  <Input
                    name="passwordConfirm"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={form.passwordConfirm}
                    onChange={(e) => handleOnChange(e)}
                    isInvalid={errors.passwordConfirm}
                    errorBorderColor="red.300"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.passwordConfirm ? (
                  <FormHelperText textAlign="right">Passwords don't match</FormHelperText>
                ) : null}
              </FormControl>
              <Button
                isLoading={isLoading}
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Sign up
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Have an account?{" "}
        <Link color="teal.500" to="/login" as={ReactRouterLink}>
          Login
        </Link>
      </Box>
    </Flex>
  )
}

export default Register
