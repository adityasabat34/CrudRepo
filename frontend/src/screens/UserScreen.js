import {
  Flex,
  Button,
  Spacer,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Box,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { createUser, listUsers, deleteUser } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import { IoPencilSharp, IoTrashBinSharp } from 'react-icons/io5';
import { USER_LIST_RESET, USER_UPDATE_RESET } from '../constants/userConstants';

const UserScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  const userCreate = useSelector((state) => state.userCreate);
  const { loading, error, userData } = userCreate;

  const userList = useSelector((state) => state.userList);
  const { loading: loadingUser, error: errorUser, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { success } = userDelete;

  useEffect(() => {
    dispatch({ type: USER_LIST_RESET });
    dispatch({ type: USER_UPDATE_RESET });
    dispatch(listUsers());
  }, [dispatch, userData, success]);

  const addUserHandler = (e) => {
    e.preventDefault();
    dispatch(createUser(name, email, age));
    // Clear form fields after submission
    setName('');
    setEmail('');
    setAge(0);
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
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
              isRequired={true}
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
              isRequired={true}
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
              isRequired={true}
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" mt="4" isLoading={loading}>
            + Add User
          </Button>
        </form>

        {loadingUser ? (
          <Loader />
        ) : errorUser ? (
          <Message type="error">{error}</Message>
        ) : (
          <Box bgColor="white" rounded="lg" shadow="lg" px="5" py="5">
            <Heading as="h1" fontSize="3xl" mb="5">
              All Users
            </Heading>
            <Table variant="striped" colorScheme="gray" size="sm">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>NAME</Th>
                  <Th>EMAIL</Th>
                  <Th>AGE</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user) => (
                  <Tr key={user._id}>
                    <Td>{user._id}</Td>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.age}</Td>
                    <Td>
                      <Flex justifyContent="flex-end" alignItems="center">
                        <Button
                          mr="4"
                          as={RouterLink}
                          to={`/edit`}
                          colorScheme="teal"
                        >
                          <Icon as={IoPencilSharp} color="white" size="sm" />
                        </Button>
                        <Button
                          mr="4"
                          colorScheme="red"
                          onClick={() => deleteHandler(user._id)}
                        >
                          <Icon as={IoTrashBinSharp} color="white" size="sm" />
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </FormContainer>
    </Flex>
  );
};

export default UserScreen;
