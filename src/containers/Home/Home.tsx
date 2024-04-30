'use client';

import { Button, Center, Flex } from '@chakra-ui/react';

import RobotComponents from './components/RobotComponents';
import firestore from '@/firebase/fireStore';
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import { ENV } from '@/config/env';

const DOC_ID = ENV.DOC ?? '';
const Home = () => {
  const handleAPI = async () => {
    // await addDoc(collection(firestore, `temp`), {
    //   id: '테스트',
    // });

    // const res = await getDocs(collection(firestore, 'temp')).then(
    //   (results: any) => {
    //     let tempList: any[] = [];
    //     results.forEach((doc: any) => {
    //       const data = doc.data();
    //       tempList.push(data);
    //     });
    //     return tempList;
    //   }
    // );
    deleteDoc(doc(firestore, 'temp', DOC_ID));

    // const res = await getDocs(collection(firestore, 'temp'));
    // console.log(
    //   '성공',
    //   res.forEach((list) => list)
    // );

    console.log('성공');
  };
  return (
    <Center
      as="main"
      flexDirection="column"
      w="100%"
      h="100vh"
      position="relative"
      zIndex={2}
    >
      <Button onClick={handleAPI}>테스트</Button>
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <RobotComponents />
      </Flex>
    </Center>
  );
};

export default Home;
