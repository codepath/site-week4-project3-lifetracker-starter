import { Flex, Link, Button } from "@chakra-ui/react"
import { Link as ReactRouterLink, useNavigate } from "react-router-dom"
import codepath from "../../assets/codepath.svg"

import "./Navbar.css"

export default function DesktopNav({ appState, setAppState, ...props }) {
  const navigate = useNavigate()

  const signOut = () => {
    localStorage.setItem("lifetracker_token", null)
    setAppState({
      user: null,
      isAuthenticated: false,
      nutrition: [],
      sleep: [],
      exercise: [],
    })
    navigate("/")
  }

  return (
    <Flex
      margin="0 auto"
      maxWidth="1310px"
      {...props}
      className="Navbar"
      pt={50}
      px="20px"
      height="70px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex alignItems="center">
        <Link mr={50} variant="unstyled" as={ReactRouterLink} to="/">
          <img src={codepath} alt="logo" />
        </Link>
        <Link
          mr={50}
          opacity={0.7}
          color="primary"
          fontWeight={600}
          variant="unstyled"
          _hover={{ opacity: 1 }}
          as={ReactRouterLink}
          to="/activity"
        >
          Activity
        </Link>
        <Link
          mr={50}
          opacity={0.7}
          color="primary"
          fontWeight={600}
          variant="unstyled"
          _hover={{ opacity: 1 }}
          as={ReactRouterLink}
          to="/exercise"
        >
          Exercise
        </Link>
        <Link
          mr={50}
          opacity={0.7}
          color="primary"
          fontWeight={600}
          variant="unstyled"
          _hover={{ opacity: 1 }}
          as={ReactRouterLink}
          to="/nutrition"
        >
          Nutrition
        </Link>
        <Link
          mr={50}
          opacity={0.7}
          color="primary"
          fontWeight={600}
          variant="unstyled"
          _hover={{ opacity: 1 }}
          as={ReactRouterLink}
          to="/sleep"
        >
          Sleep
        </Link>
      </Flex>

      {appState?.user ? (
        <>
          <Flex alignItems="center">
            <Button mr="20px" variant="outline" colorScheme="cyan" onClick={() => signOut()}>
              Sign out
            </Button>
          </Flex>
        </>
      ) : (
        <Flex alignItems="center">
          <Link to="/login" as={ReactRouterLink}>
            <Button mr="20px" variant="outline" colorScheme="cyan">
              Sign In
            </Button>
          </Link>
          <Link to="/register" as={ReactRouterLink}>
            <Button variant="solid" colorScheme="cyan">
              Register
            </Button>
          </Link>
        </Flex>
      )}
    </Flex>
  )
}
