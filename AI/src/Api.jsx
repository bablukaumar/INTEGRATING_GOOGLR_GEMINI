import React, { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState('');
  const [submittedQuestion, setSubmittedQuestion] = useState(''); // State to store the submitted question
async function generate() {
    setResult('Loading...');
    setSubmittedQuestion(question)
    try {
      const response = await axios({
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCrNOy10zpGRWe80Rrdl9UJgyedlbDteKg',
        method: 'post',
        data: {
          contents: [{ parts: [{ text: question }] }]
        }
      });
      const text = response.data.candidates[0].content.parts[0].text;
      setResult(text);
    } catch (error) {
      setResult('Error fetching data');
      console.error(error);
    }
    setQuestion('')
  }
  const formatResult = (param) => {
    return param.split('\n').map((line, index) => (
      <div key={index}>{line}</div>
    ));
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Welcome Human! You can ask me anything!!!!</h1>
          <textarea 
            value={question} 
            onChange={(e) => setQuestion(e.target.value)} 
            placeholder="Enter your query..."
          ></textarea>
          <button onClick={generate}>Generate</button>
        </div>
        <div className="col-12 mt-5">
          {submittedQuestion && (
            <div>
              <h1>{submittedQuestion}..</h1>
            </div>
          )}
          {result && (
            <div>
              {formatResult(result)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
