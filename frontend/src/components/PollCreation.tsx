import React, { useState, useEffect } from 'react';

const PollCreation: React.FC = () => {
  const [pollName, setPollName] = useState('');
  const [category, setCategory] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [isPublic, setIsPublic] = useState(true);
  const [pollCode, setPollCode] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    generatePollCode();
  }, []);

  const generatePollCode = () => {
    const newCode = Math.floor(1000 + Math.random() * 9000).toString();
    setPollCode(newCode);
  };

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
            {["Category 1", "Category 2", "Category 3"].map((cat) => (
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
    </div>
  );
};

export default PollCreation;