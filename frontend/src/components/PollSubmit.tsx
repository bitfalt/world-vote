import React, { useState, useEffect } from 'react';

const PollSubmission = () => {
  const [pollName, setPollName] = useState('');
  const [category, setCategory] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [pollCode, setPollCode] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    setPollName('Which programming language do you prefer?');
    setCategory('Technology');
    // @ts-expect-error
    setOptions(['JavaScript', 'Python', 'Java', 'C++']);
    setIsPublic(true);
}, []);

const handleSubmitVote = () => {
  if (!selectedOption) {
    alert('Please select an option before submitting.');
    return;
  }
  console.log({ pollName, selectedOption });
};

const handlePollCodeSubmit = () => {
  console.log('Submitted poll code:', pollCode);
};

if (!isPublic && !pollName) {
  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white border-2 border-black rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Enter Poll Code</h2>
      <input
        type="text"
        placeholder="Enter Poll Code"
        value={pollCode}
        onChange={(e) => setPollCode(e.target.value)}
        className="w-full px-4 py-3 mb-4 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
      />
      <button
        onClick={handlePollCodeSubmit}
        className="w-full px-4 py-3 text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
      >
        Submit Code
      </button>
    </div>
  );
}

return (
  <div className="max-w-md mx-auto mt-10 p-8 bg-white border-2 border-black rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold mb-2 text-center">{pollName}</h2>
    <p className="text-gray-600 mb-6 text-center">Category: {category}</p>
    <div className="mb-8">
      {options.map((option, index) => (
        <div key={index} className="mb-3">
          <label className={`flex items-center p-3 rounded-lg transition duration-300 cursor-pointer ${
            selectedOption === option 
              ? 'bg-black text-white' 
              : 'bg-white text-black border-2 border-black hover:bg-gray-100'
          }`}>
            <input
              type="radio"
              name="pollOption"
              value={option}
              checked={selectedOption === option}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="hidden"
            />
            <span className="ml-3">{option}</span>
          </label>
        </div>
      ))}
    </div>
    <button
      onClick={handleSubmitVote}
      className="w-full px-4 py-3 text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
    >
      Submit Vote
    </button>
  </div>
);
};

export default () => <PollSubmission />;