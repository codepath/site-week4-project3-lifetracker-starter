import { Box, Heading, Stack } from "@chakra-ui/react"

export default function JumboTron({ title = "Exercise", bg = "teal.500", ...rest }) {
  return (
    <Box bg={bg} pt={24} pb={20} px={6} {...rest}>
      <Stack spacing={6} textAlign="center">
        <Heading color="white" fontWeight="extrabold" fontSize="5xl">
          {title}
        </Heading>
      </Stack>
    </Box>
  )
}
