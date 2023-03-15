import { GetStaticProps } from 'next';
import React from 'react';
import { Product } from "../product/types"
import api from "../product/api"
import {Button, ChakraProvider, Flex, Grid, Link, Stack, Text, Image } from '@chakra-ui/react';
import {motion, AnimatePresence, AnimateSharedLayout, LayoutGroup} from "framer-motion"

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from '@chakra-ui/react'

interface Props {
  products: Product[],
}

function parseCurrency(value: number): string {
  return value.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
  })
}

const IndexRoute: React.FC<Props> = ({products}) => {
  const [cart, setCart] = React.useState<Product[]>([])
  const [selectedImage, setSelectedImage] = React.useState<string>(null)
  const text = React.useMemo(
    () => {
    return cart
            .reduce(
              (message, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`), ``)
            .concat(`\nTotal: ${parseCurrency(cart.reduce((total, product) => total + product.price, 0))}`)
  }, [cart])

  return (
<LayoutGroup>
  <Stack spacing={6}>
      <Grid  gridGap={6} templateColumns={`repeat(auto-fill, minmax(240px, 1fr))`}>
        {products.map((product) => (
        <Stack  spacing={3} borderRadius='md' padding={4} key={product.id} backgroundColor='gray.200'>
            <Image  onClick={() => setSelectedImage(product.image)} as={motion.img} cursor="pointer" layoutId={product.image} borderRadius="md" maxHeight={128} objectFit="cover" src={product.image} alt={product.title}></Image>
            <Stack spacing={1}>
            <Text>
              {product.title}
            </Text>
            <Text fontSize='sm' fontWeight='500' color='green.500'>
              {parseCurrency(product.price)}
            </Text>
            </Stack>
            <Button colorScheme='primary' size="sm" variant='outline' onClick={() => setCart(cart => cart.concat(product))}>Agregar</Button>
        </Stack>
    ))}
      </Grid>
       <AnimatePresence>
       { Boolean(cart.length) && ( 
        <Flex animate={{scale: 1}} exit={{scale: 0}} initial={{scale: 0}} as={motion.div} position='sticky' bottom={4} alignItems='center' justifyContent='center'>
          <Button 
          width='fit-content'
          isExternal 
          as={Link}
          size="lg" 
          href={`https://wa.me/542346569585?text=${encodeURIComponent(text)}`} 
          colorScheme='whatsapp'
          leftIcon={<Image src={"https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff"}/>}>
            Completar pedido ({cart.length} productos)
          </Button>
        </Flex>
      )}

      </AnimatePresence>   
    </Stack>
    <AnimatePresence>
      {selectedImage && 
      <Flex key="backdrop" 
      alignItems="center" 
      as={motion.div} 
      backgroundColor="rgba(0,0,0,0.5)" 
      justifyContent="center" 
      layoutId={selectedImage} 
      position="fixed" 
      top={0} 
      left={0} 
      width='100%'
      onClick={() => setSelectedImage(null)}>
        <Image key="image" src={selectedImage} alt="product photo">

        </Image>

      </Flex>}
    </AnimatePresence>
  </LayoutGroup>
  );

}




export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  return {
    revalidate: 10,
    props: {
      products,
    },

  }
}

export default IndexRoute;
