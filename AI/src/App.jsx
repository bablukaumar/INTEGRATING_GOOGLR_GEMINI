import axios from 'axios';
import React, { useState } from 'react'//4:10
import { FaPaperPlane } from 'react-icons/fa'; // Importing the send icon from react-icons
function App() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState('welcome i am AI')
  const [displayQuestion, setDisplayQuestion] = useState('')
  async function generate() {
    setResult('Loading..........')
    setDisplayQuestion(question);
    try {
      const response = await axios({
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCrNOy10zpGRWe80Rrdl9UJgyedlbDteKg',
        method: 'post',
        data: {
          contents: [{ parts: [{ text: question }] }]
        }
      })
      const text = response.data.candidates[0].content.parts[0].text;
      setResult(text)
    } catch (error) {
      setQuestion(error)
    }
    setQuestion('')
  }
  const formateData = (props) => {
    return props.split('\n').map((line, index) => (
      <div key={index}>{line}</div>
    ))
  }
  return (
    <div className='body'>
      <div className="container">
        <div className="row">
          <div className="col-12  heading">
            <h1>WELCOME to HUMAN</h1>
            <div className='input-box'>
              <textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder='ask any query...' className='input-field'></textarea>
              <button onClick={generate} className='button'>
                <FaPaperPlane size={50} />
              </button>
            </div>
          </div>
          <div className="col-12 result ">
            <p className='question'>  {displayQuestion} </p>
            <p className='resultData'>{result ? formateData(result) : ' '}</p>
            </div>
        </div>
      </div>
    </div>
  )
  
}

export default App
