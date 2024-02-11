import { Flex } from '@chakra-ui/react';

const FormContainer = ({ children, width = '4xl' }) => {
  return (
    <Flex
      direction="column"
      boxShadow="md"
      rounded="md"
      bgColor="white"
      p="5"
      width={width}
      border="1px solid black"
    >
      {children}
    </Flex>
  );
};

export default FormContainer;
