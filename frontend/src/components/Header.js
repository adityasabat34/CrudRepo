import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex
      as="header"
      align="center"
      justifyContent="space-between"
      wrap="wrap"
      py="6"
      px="6"
      bgColor="gray.800"
      w="100%"
      pos="fixed"
      top="0"
      left="0"
    >
      <Heading
        as="h1"
        color="whiteAlpha.800"
        fontWeight="bold"
        size="md"
        letterSpacing="wide"
      >
        CRUD App
      </Heading>
    </Flex>
  );
};

export default Header;
