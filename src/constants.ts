const contract_address = "0x480Efc3c0A6681F0261336Dd43e168390dCd9573";
const contract_functions = [
    "function mintNFT(address to, string memory tokenURI) public returns (uint256)",
    "function nextNFTId() public view returns (uint256)",
    "function tokenURI(uint256 tokenId) public view virtual override returns (string memory)",
]

export {contract_address, contract_functions};

