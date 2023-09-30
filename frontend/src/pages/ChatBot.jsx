import React, { useState } from 'react';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleAskQuestion = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/receive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error asking question:', error);
    }
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Legal Chatbot</h1>
      <br/>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={handleQuestionChange}
          style={{ marginRight: '10px', padding: '5px', width: '60%' }}
        />
        <button onClick={handleAskQuestion} style={{ padding: '5px' }}>
          Ask
        </button>
      </div>
      <div className="response" style={{ marginTop: '20px', textAlign: 'center' }}>
        <p><strong>Response:</strong></p>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
