import React from 'react';
import { Flex } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserScreen from './screens/UserScreen';
import Footer from './components/Footer';
import Header from './components/Header';
import UserEditScreen from './screens/UserEditScreen';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Flex
        as="main"
        mt="72px"
        direction="column"
        py="6"
        px="6"
        bgGradient="linear(to-r, gray.200, gray.400, white, gray.400, gray.200)"
      >
        <Routes>
          <Route path="/" element={<UserScreen />} />
          <Route path="user/edit/:id" element={<UserEditScreen />} />
        </Routes>
      </Flex>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
