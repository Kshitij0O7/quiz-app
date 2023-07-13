import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useForm } from 'react-hook-form';
import { Alert } from "@material-tailwind/react";

import { getQuestions } from '../actions/questions';
import { updateScore } from '../actions/users';
import Timer from './Timer';
import RenderOptions from './Options';


const Test = () => {
  const { token } = useParams();
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const questions = useSelector((state) => state.questions);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [notSubmitted, setNotSubmitted] = useState(true);
  //let timeLeft = useState(parseInt(localStorage.getItem('remainingTime')) || 60*60);

  const dispatch = useDispatch();
  const {register, handleSubmit, watch} = useForm()

  /* 
  To verify if the token is valid and get the department 
  */
  //setToken(useParams());
  useEffect(() => {
    dispatch(getQuestions(token));   
    try {
      const decodedToken = jwtDecode(token);
      let _department = decodedToken.department;
      let _email = decodedToken.email;
      setDepartment(_department);
      setEmail(_email);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(()=>{
    department&&dispatch(getQuestions(token));
  }, [department]);

  const renderOptions = (options, index) => {
    let state = watch(options.index)
    // console.log(options);
    // console.log(state,"<<<");

    // const handleOptionChange = (optionIndex, value) => {
    //   options.onOptionChange(optionIndex, value);
    // };
   
    //renders the options according to the index
    return options.map((option, _index) => (
      <div className='flex items-center text-xs' key={`option-${_index}`}>
        <div className={`flex relative rounded-lg flex-1 m-1 ${state[index]!==option ? "bg-gray-200": "bg-blue-400 text-white"}`}>
          <div className='p-2'>{option}</div>
            <input 
            type="radio" 
            id={`option-${index}${_index}`} 
            name={`question-${index}`} 
            value={option} 
            className='flex-1 opacity-0 absolute w-full h-full inset-0'
            //style={{ display: 'none' }}
            {...register(`${index}`)}
            //onChange={() => handleOptionChange(options.index, option)}
            />
            <label htmlFor={` option-${index}-${_index}`}></label>
        </div>
      </div> 
    ))    
  };

  /*
  Logic when the when exam is submitted
  */
  const handle_Submit = (data) => {
    let _selectedOptions = []
    console.log(data);

    localStorage.removeItem('remainingTime');
    
    questions.map((question, index)=>{
      let selectedOption = data[index+1];
      console.log(data[index+1]);
      _selectedOptions = [..._selectedOptions, selectedOption];
    });
    console.log(_selectedOptions);
    setSelectedOptions((prevOptions)=>[...prevOptions, ..._selectedOptions]);
    setNotSubmitted(false);
    }
    //console.log(selectedOptions);

  const handleComplete = () => {
    handleSubmit(handle_Submit)();
  }

  useEffect(()=>{
    //localStorage.removeItem('remainingTime')
    dispatch(updateScore(email, {selectedOptions, questions}));
  }, [selectedOptions]);

  return (
    <div className='bg-zinc-100 h-auto'>
      {questions.length !== 0 ? (
        //<h4>Test is Happening for {department}!</h4> 
        <div >
          {notSubmitted ?(
            <div>
              <div className="fixed top-4 left-4 z-50">
                <Timer duration={60*60} onComplete={handleComplete}/>
                <span className='flex justify-center text-red-500 text-xs'>Time Left</span>
              </div>
              <div className='fixed bottom-4 right-4 z-50 text-xs bg-yellow-300'>
                <Alert color='yellow'> 
                  <span>Please don't refresh the page during exam</span>
                </Alert>
              </div>
              <h2 className='flex justify-center text-2xl'>Test for the {department} department</h2>
              <form onSubmit={handleSubmit(handle_Submit)}>
                {questions.map((question, index) => (
                  <div className='flex justify-center'>
                    
                    <div key={`question-${index}`} className='box-border h-fit w-1/2 m-3 border-0 bg-white p-3 rounded-2xl'>
                      <div className='flex flex-col justify-center'>
                        <div className='flex justify-center'>
                          <h3 className = 'text-gray-400 text-xs' style={{marginBlock:'auto'}}>Question {index + 1}:</h3>
                        </div>
                        <div className='flex justify-center'>
                        <p className='text-md font-extrabold text-center'>{question.questionAsked}</p>
                        </div>
                      </div>
                      <div className='p-2 text-xs leading-5'>
                        {renderOptions(question.options, index+1)}
                        {/* <RenderOptions options = {question.options} index = {index+1} register={register}/> */}
                      </div>
                          {/* <br /> */}
                    </div>
                  </div>
              ))}
                <div className='flex justify-center p-2 '>
                  <div className='flex justify-center rounded-2xl w-1/2 bg-blue-500 '>
                    <button className='my-8 flex-1 text-white' type="submit">Finish Exam</button>
                  </div>
                </div>
              </form>          
            </div>  
          ):(
            <div className='h-screen flex flex-col justify-center items-center'>
              <div className='flex justify-center'>
                <h2 className='text-5xl '>Test is Completed</h2>
              </div>
              <br/>
              <div className='flex justify-center'>
                <h4 className='text-3xl'>Your results would be shared soon</h4>
              </div>
            </div>           
          )}
       </div>
      ) : (
        <div className='flex justify-center items-center h-screen'>
          <span className='text-xl font-extrabold'>Link is either Invalid or Expired. Please check your token or contact support.</span>
        </div>
      )}
    </div>
  );
};

export default Test;
