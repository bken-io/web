import { useSession, } from 'next-auth/client';
import { Flex, Avatar, VStack, SkeletonCircle, Heading, SkeletonText, Text, } from '@chakra-ui/react';
import Layout from '../components/Layout';

export default function Account() {
  const [session, loading] = useSession();

  return (
    <Layout>
      <Flex justify='center' pt='5' direction='row'>
        <Flex direction='column' rounded='lg' p='5' minW='400px'>
          <Flex direction='row' justify='center' w='100%' h='75px'>
            <SkeletonCircle w='60px' h='60px' isLoaded={Boolean(!loading && session?.user?.image)}>
              <Avatar
                w='60px' h='60px'
                name={session?.user?.name}
                src={session?.user?.image}
              />
            </SkeletonCircle>
            <SkeletonText
              ml='5' w='100%' noOfLines={3} spacing={3}
              isLoaded={Boolean(!loading && session?.user?.name)}
            >
              <Heading size='sm'>
                {session?.user?.name}
              </Heading>
              <Text fontSize='.85rem'>{session?.user?.email}</Text>
              <Text fontSize='.85rem'>User ID: {session?.id}</Text>
            </SkeletonText>
          </Flex>
          <SkeletonText
            w='100%' noOfLines={3} spacing={3}
            isLoaded={Boolean(!loading && session?.user?.name)}
          >
            <VStack w='100%'>
              <Flex alignItems='center' justifyContent='space-between' w='100%'>
                <Text>Videos Uploaded</Text>
                <Text>N/A</Text>
              </Flex>
              <Flex alignItems='center' justifyContent='space-between' w='100%'>
                <Text>Minutes Uploaded</Text>
                <Text>N/A</Text>
              </Flex>
              <Flex alignItems='center' justifyContent='space-between' w='100%'>
                <Text>Video Views</Text>
                <Text>N/A</Text>
              </Flex>
              <Flex alignItems='center' justifyContent='space-between' w='100%'>
                <Text>Data Stored</Text>
                <Text>N/A</Text>
              </Flex>
            </VStack>
          </SkeletonText>
        </Flex>
      </Flex>
    </Layout>
  );
}