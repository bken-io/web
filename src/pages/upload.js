import { Container, } from '@chakra-ui/react';
import Layout from '../components/Layout';
import Uploader from '../components/Uploader';

export default function Upload() {
  return (
    <Layout>
      <Container>
        <Uploader/>
      </Container>
    </Layout>
  );
}