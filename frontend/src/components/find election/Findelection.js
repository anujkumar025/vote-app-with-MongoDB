import React, {useState, useContext} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './FIndelection.css'
import BackendAddress from './../../helper/Helper.js';
import { LoginContext } from './../../context/LoginContext.js';



export const Findelection = () => {
    const [objId, setObjId] = useState('');
    const [attemptedQues, setAttemptedQues] = useState();
    const [dataOfElection, setDataOfElection] = useState('');
    const [isAuthentic, setIsAuthentic] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState();
    const navigate = useNavigate();
    const { userEmail } = useContext(LoginContext);


    if(!isAuthentic){
        function handleCodeChange(e){
            setObjId(e.target.value);
            // console.log(objId);
        }
        
        async function handleSubmit(){
            if(objId){
                await axios.post(BackendAddress + "findelection", {objId})
                .then(res=>{
                    if(res.data.message){
                        // alert(res.data.message);
                        console.log(res.data.packet);
                        setDataOfElection(res.data.packet);
                        setIsAuthentic(true);
                        setAttemptedQues(new Array(res.data.packet.ques.length).fill(0))
                        setSelectedOptions(new Array(res.data.packet.ques.length).fill(''))
                        // console.log(res.data.packet);
                        // navigate('/');
                    }  
                    else{   
                        alert("some error occured please try again");
                    }
                })
            }
            else{
                alert("Invalid input");
            }
        }
    
      return (
        <div className='Find-main'>
            <div className='Find-box'>
                <h2>Enter Election Code</h2>
                <input type='text' onChange={handleCodeChange}/>
                <br></br>
                <button onClick={handleSubmit}>Search</button>
            </div>
        </div>
      )
    }
    else{
        const { title, desc, deadline, ques, opt, QObjId } = dataOfElection;

        const handleOptionChange = (index, value) => {
            const newSelectedOptions = [...selectedOptions];
            // newSelectedOptions[index] = value;
            const optionIndex = opt[index].indexOf(value);
            newSelectedOptions[index] = optionIndex;
            setSelectedOptions(newSelectedOptions);
            const newAttemptedQues = [...attemptedQues];
            newAttemptedQues[index] = 1;
            setAttemptedQues(newAttemptedQues);
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            // console.log(dataOfElection);
            if(selectedOptions.length !== 0)
                await axios.post(BackendAddress+"checkresult", {selectedOptions, objId, QObjId:dataOfElection.QobjId, attemptedQues:attemptedQues, email:userEmail})
                .then(res=>{
                    if(res.data.message){
                      // alert(res.data.message);
                      navigate('/election/submissionsuccess')
                    }
                    else{
                        alert("Try again");
                    }
                })
            else{
                alert("Invalid input");
            }
        };
        return(
            <div className='find-main2'>
            <div className='find-box2'>
              <div>
                <h1>Title: {title}</h1>
                <p>Description: {desc}</p>
                <p>Deadline: {new Date(deadline).toLocaleString()}</p>
                <h2>Questions:</h2>
              </div>
              <div className='find-question-box'>
              <form onSubmit={handleSubmit} className='find-form'>
                {ques.map((question, index) => (
                  <div key={index} className='find-each-ques'>
                    <p className='find-light-color'>Question {index + 1}: {question}</p>
                    <ul className='find-light-color'>
                      {opt[index].map((option, optIndex) => (
                        <li key={optIndex} className='find-light-color'>
                          <label className='find-light-color'>
                            <input
                              type="radio"
                              name={`question_${index}`}
                              value={option}
                              checked={selectedOptions[index] === opt[index].indexOf(option)}
                              onChange={() => handleOptionChange(index, option)}
                            /> {option}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <button type="submit">Submit</button>
              </form>
              </div>
            </div>
          </div>
        );
    }
}
