import { Box, Flex, Heading } from "@chakra-ui/react"

export default function Empty({ children }) {
  return (
    <Box>
      <Flex direction="column">
        <Heading mb={10}>Nothing here yet.</Heading>
        {children}
      </Flex>
    </Box>
  )
}
