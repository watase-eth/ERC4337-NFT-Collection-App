import type { NextPage } from "next";
import { Box, Container, Flex, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useContract, useMetadata } from "@thirdweb-dev/react";
import { NFT_ADDRESS } from "../constant/addresses";
import NFTCard from "../components/NFTCard";

const Home: NextPage = () => {
  const  { contract } = useContract(NFT_ADDRESS);

  const { data: metadata, isLoading: loadingMetadata } = useMetadata(contract);
  const collectionImage = metadata?.image;
  const collectionName = metadata?.name;

  return (
    <Container maxW={"1200px"}>
      {loadingMetadata ? (
        <Flex h={"90vh"} direction={"column"} justifyContent={"center"} alignItems={"center"}>
          <Spinner />
        </Flex>
      ) : (
        <Container maxW={"1200px"}>
          <Box
            backgroundImage={`url(${collectionImage})`}
            h={"75vh"}
            p={8}
            borderRadius={8}
          >
            <Heading>{collectionName}</Heading>
          </Box>
          <SimpleGrid columns={2} spacing={10} my={10}>
            <NFTCard tokenId={"0"} />
            <NFTCard tokenId={"1"} />
            <NFTCard tokenId={"2"} />
            <NFTCard tokenId={"3"} />
          </SimpleGrid>
        </Container>
      )}
    </Container>
  );
};

export default Home;
