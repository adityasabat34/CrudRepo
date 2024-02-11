import {
  Flex,
  Box,
  Button,
  FormLabel,
  FormControl,
  Input,
  Spacer,
  Link,
  Heading,
} from '@chakra-ui/react';
import { updateUser, getUserInfo } from '../actions/userActions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id: userId } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success } = userUpdate;

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserInfo(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setAge(user.setAge);
      }
    }
  }, [user, dispatch, navigate, success, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, age }));
  };

  return (
    <>
      <Link as={RouterLink} to="/">
        Go Back
      </Link>

      <Flex w="full" alignItems="center" justifyContent="center" py="5">
        <FormContainer>
          <Heading as="h1" fontSize="3xl" mb="8">
            Update User
          </Heading>

          {loadingUpdate && <Loader />}
          {errorUpdate && <Message type="error">{errorUpdate}</Message>}

          {loading ? (
            <Loader />
          ) : error ? (
            <Message type="error">{error}</Message>
          ) : (
            <form onSubmit={submitHandler}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <Spacer h="3" />
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <Spacer h="3" />
              <FormControl id="age" isRequired>
                <FormLabel>Age</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter Your Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </FormControl>
              <Spacer h="3" />

              <Button
                type="submit"
                isLoading={loading}
                colorScheme="teal"
                mt="4"
              >
                Update
              </Button>
            </form>
          )}
        </FormContainer>
      </Flex>
    </>
  );
};

export default UserEditScreen;
