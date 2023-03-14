// pages/_app.js
import { ChakraProvider, Container, VStack, Image, Text, Heading, Box, Divider } from '@chakra-ui/react'
import React from 'react'
import {AppProps} from "next/app"
import theme from '@/theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
        <Container borderRadius="sm" backgroundColor={"white"} boxShadow="md" maxWidth="container.xl" padding={4}>
        <VStack marginBottom={6}>
          <Image borderRadius={9999} src="https://placehold.it/128x128" alt="logo"></Image>
          <Heading>Sabina sahumerios</Heading>
          <Text>Tienda de aromas</Text>
        </VStack>         
        <Divider marginY={6} />
        <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App