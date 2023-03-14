// pages/_app.js
import { ChakraProvider, Container, VStack, Image, Text, Heading, Box, Divider, Button, Input, useDisclosure, Stack } from '@chakra-ui/react'
import React from 'react'
import {AppProps} from "next/app"
import theme from '@/theme'
import { Product } from "../product/types"


interface Props {
  products: Product[],
}




const App: React.FC<AppProps> = ({ Component, pageProps}) => {

  
  return (
    
    <ChakraProvider theme={theme}>
      <Box padding={4}>
        <Container borderRadius="sm" backgroundColor={"white"} boxShadow="md" maxWidth="container.xl" padding={4}>
        <VStack marginBottom={6}>
          <Image borderRadius={10} src="https://res.cloudinary.com/dhy1g5ude/image/upload/c_scale,h_128,w_128/v1678823085/default_jlgv5b.png" alt="logo"></Image>
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