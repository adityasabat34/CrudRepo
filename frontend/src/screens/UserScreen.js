import {
  Flex,
  Button,
  Spacer,
  FormControl,
  FormLabel,
  Heading,
  Input,
  // Box,
  // Icon,
  // Table,
  // Tbody,
  // Td,
  // Th,
  // Thead,
  // Tr,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';

const UserScreen = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  const userCreate = useSelector((state) => state.userCreate);
  const { loading, error, userData } = userCreate;

  const userList = useSelector((state) => state.userList);
  const { loading: loadingUser, error: errorUser, users } = userList;

  const addUserHandler = (e) => {
    e.preventDefault();
    dispatch(createUser(name, email, age));
    // Clear form fields after submission
    setName('');
    setEmail('');
    setAge(0);
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="space-between" py="5">
      <FormContainer>
        <Heading as="h1" mb="8" fontSize="3xl">
          Add User
        </Heading>

        {error && <Message type="error">{error}</Message>}
        {loading && <Loader />}

        <form onSubmit={addUserHandler}>
          <FormControl id="name">
            <FormLabel htmlFor="name">Your Name</FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <Spacer h="2" />

          <FormControl id="email">
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="age">
            <FormLabel htmlFor="age">Age</FormLabel>
            <Input
              id="age"
              type="number"
              placeholder="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" mt="4" isLoading={loading}>
            + Add User
          </Button>
        </form>
      </FormContainer>
    </Flex>
  );
};

export default UserScreen;
