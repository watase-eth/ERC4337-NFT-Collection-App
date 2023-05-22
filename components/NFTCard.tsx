import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Web3Button, useAddress, useContract, useNFT } from "@thirdweb-dev/react";
import { NFT_ADDRESS } from "../constant/addresses";

type Props = {
    tokenId: string;
};

const NFTCard: React.FC<Props> = ({ tokenId }) => {
    const address = useAddress();
    const  { contract } = useContract(NFT_ADDRESS);
    const { data } = useNFT(contract, tokenId);

    return(
       <Box 
        backgroundImage={`url(${data?.metadata.image})`}
        backgroundSize={"cover"}
        h={"50vh"}
        borderRadius={8}
        p={8}
        >
            <Flex h={"100%"} direction={"column"} justifyContent={"space-between"}>
                <Heading color={"white"}>{data?.metadata.name}</Heading>
                {!address ? (
                <Text color={"white"} fontWeight={"bold"}>Sign in to claim element</Text>
                ) : (
                <Web3Button
                    contractAddress={NFT_ADDRESS}
                    action={(contract) => contract.erc1155.claim(tokenId, 1)}
                >Claim Element</Web3Button>
                )}
            </Flex>
        </Box>
    )
};

export default NFTCard;