import React, { useState, useEffect } from 'react';
import { createThirdwebClient } from 'thirdweb';
import { createWallet, smartWallet } from 'thirdweb/wallets';
import { baseSepolia } from 'thirdweb/chains';
import { deployContract } from "thirdweb/deploys";
import type { SmartWalletOptions } from "thirdweb/wallets";

//@ts-expect-error
const PollCreation = ({ clientId }) => {
  const [pollName, setPollName] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [options, setOptions] = useState(['', '']);
  const [isPublic, setIsPublic] = useState(true);
  const [pollCode, setPollCode] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    generatePollCode();
    getCategories();
  }, []);
  
  const client = createThirdwebClient({
    clientId: clientId,
  });

  const accountAbstraction: SmartWalletOptions = {
    chain: baseSepolia,
    factoryAddress: "0x70c11ddFBC035abD25cB629512126a873880b1a9",
    sponsorGas: true,
  };

  const adminWallet = createWallet("io.metamask");


  const handleConnect = async () => {
    const wallet = smartWallet(accountAbstraction);
    const personalAccount = await adminWallet.connect({
      client,
      chain: baseSepolia,
    });
    const smartAccount = await wallet.connect({
      client,
      personalAccount,
    })

    const bytecode = "0x6080604052348015600f57600080fd5b50600080546001600160a01b031916331790556103ee806100316000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063086ccf0e146100515780632997e86b146100665780638da5cb5b1461009e578063b99ef1fa146100c9575b600080fd5b61006461005f366004610274565b610102565b005b6100896100743660046102b9565b60026020526000908152604090205460ff1681565b60405190151581526020015b60405180910390f35b6000546100b1906001600160a01b031681565b6040516001600160a01b039091168152602001610095565b6100f46100d73660046102d2565b805160208183018101805160018252928201919093012091525481565b604051908152602001610095565b60008181526002602052604090205460ff161561015e5760405162461bcd60e51b8152602060048201526016602482015275155cd95c881a185cc8185b1c9958591e481d9bdd195960521b604482015260640160405180910390fd5b6001808360405161016f9190610333565b9081526020016040518091039020600082825461018c919061034f565b90915550506040517fc8890be6e657dc734d1fb91641621bd1bc2bf263edd04e4198b4db572cc680f6906101c39033908590610376565b60405180910390a15050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126101f657600080fd5b813567ffffffffffffffff811115610210576102106101cf565b604051601f8201601f19908116603f0116810167ffffffffffffffff8111828210171561023f5761023f6101cf565b60405281815283820160200185101561025757600080fd5b816020850160208301376000918101602001919091529392505050565b6000806040838503121561028757600080fd5b823567ffffffffffffffff81111561029e57600080fd5b6102aa858286016101e5565b95602094909401359450505050565b6000602082840312156102cb57600080fd5b5035919050565b6000602082840312156102e457600080fd5b813567ffffffffffffffff8111156102fb57600080fd5b610307848285016101e5565b949350505050565b60005b8381101561032a578181015183820152602001610312565b50506000910152565b6000825161034581846020870161030f565b9190910192915050565b8082018082111561037057634e487b7160e01b600052601160045260246000fd5b92915050565b60018060a01b038316815260406020820152600082518060408401526103a381606085016020870161030f565b601f01601f191691909101606001939250505056fea2646970667358221220b569e09e719334157fd5086bfcd2939aa3e20c6f29b1b339089fbbe3d9b2061264736f6c634300081a0033"

    // const address = await deployContract({
    //   client,
    //   baseSepolia,
    //   bytecode,
    //   constructorAbi: {
    //     inputs: [],
    //     type: "constructor",
    //   },
    // });

    //console.log(address);

    console.log(smartAccount);

  }

  const generatePollCode = async () => {
    const response = await fetch('api/code/codes.json');
    const data = await response.json();
    const existingCodes = data.map((item: {pollCode: number}) => item.pollCode.toString());
    let newCode;
    do {
      newCode = Math.floor(1000 + Math.random() * 9000).toString();
    } while (existingCodes.includes(newCode));
    setPollCode(newCode);
  };

  const getCategories = async () => {
    try {
      const response = await fetch('/api/category/categories.json');
      const data = await response.json();
      const categoryNames = data.map((category: { name: string }) => category.name);
      setCategories(categoryNames);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

 

  const addOption = () => {
    setOptions([...options, '']);
  };
  //@ts-expect-error
  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };
  //@ts-expect-error
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreatePoll = () => {
    console.log({ pollName, category, options, isPublic, pollCode: isPublic ? null : pollCode });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Poll Name"
        value={pollName}
        onChange={(e) => setPollName(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <div className="relative mb-6">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {category || "Select Category"}
        </button>
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {categories.map((cat) => (
              <div
                key={cat}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setCategory(cat);
                  setIsDropdownOpen(false);
                }}
              >
                {cat}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        {options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="flex-grow px-3 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {index > 1 && (
              <button
                onClick={() => removeOption(index)}
                className="p-2 text-red-500 hover:text-red-700 focus:outline-none"
              >
                -
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addOption}
          className="w-full px-3 py-2 text-black bg-white border border-black rounded-md hover:bg-gray-200 focus:outline-none"
        >
          + Add Option
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsPublic(true)}
          className={`w-1/2 mr-2 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
            isPublic ? "bg-black text-white" : "bg-white text-black border border-black hover:bg-gray-200"
          }`}
        >
          Public
        </button>
        <button
          onClick={() => setIsPublic(false)}
          className={`w-1/2 ml-2 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
            !isPublic ? "bg-black text-white" : "bg-white text-black border border-black hover:bg-gray-200"
          }`}
        >
          Private
        </button>
      </div>

      {!isPublic && (
        <div className="mb-4 text-center">
          <span className="text-sm text-gray-500">Poll Code: {pollCode}</span>
        </div>
      )}

      <button
        onClick={handleCreatePoll}
        className="w-full px-3 py-2 text-white bg-black rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700"
      >
        Create Poll
      </button>

      <button
        onClick={handleConnect}
        className="w-full px-3 py-2 text-white bg-black rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700"
>
  CONNECT HERE</button>

    </div>
  );
};

export default PollCreation;