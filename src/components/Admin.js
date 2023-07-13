import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
//import '../index.css';

import { createQuestion } from '../actions/questions';

const Admin = () => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [department, setDepartment] = useState('');
  const [question, setQuestion] = useState({questionAsked:"", options:[], answer:"", department:"", type:""});
  const dispatch = useDispatch();

  const handleQuestionAskedChange = (e) => {
    setQuestion({questionAsked:e.target.value, options: question.options, answer: question.answer, department: question.department, type: question.type});
  };

  const handleOptionsChange = (e) => {
    const optionsArray = e.target.value.split(",");
    setQuestion({questionAsked: question.questionAsked,answer: question.answer, options: optionsArray, department: question.department, type: question.type});
  };

  const handleAnswerChange = (e) => {
    setQuestion({ questionAsked: question.questionAsked, options: question.options, answer: e.target.value, department: question.department, type: question.type }); 
  };

  const handleDepartmentChange = (e) => {
    setQuestion({questionAsked: question.questionAsked,options: question.options,answer: question.answer, department: e.target.value, type: question.type});
  };

  const handleTypeChange = (e) => {
    setQuestion({questionAsked:question.questionAsked, options: question.options, answer: question.answer, department: question.department, type: e.target.value});
  };

  useEffect(() => {
    if (question) setQuestion(question);
  }, [question]);

  const clear = () => {
    //setCurrentId(0);
    setQuestion({ questionAsked: '', options: [], answer: '', department: '', type: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createQuestion(question));
    clear();
    // return(
    //   <div> 
    //     <h1>Successful Registration</h1>
    //   </div>
    // );
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Fill out the form to add new question:</p>
      <form onSubmit={handleSubmit}>
        <label>
          Question:
          <input className='border-2' type="text" value={question.questionAsked}  onChange={handleQuestionAskedChange}/>
        </label>
        <br />
        <label>
          Options:
          <input type="text" className='border-2 w-screen' value={question.options} onChange={handleOptionsChange} />
        </label>
        <br />
        <label>
          Answer:
          <input type="text" value={question.answer} className='border-2' onChange={handleAnswerChange} />
        </label>
        <br />
        <label>
          Department:
          <input className='border-2' type="text" value={question.department} onChange={handleDepartmentChange} />
        </label>
        <br />
        <label>
          Type:
          <input className='border-2' type="text" value={question.type}  onChange={handleTypeChange}/>
        </label>
        <br />
        <button className='bg-blue-500' type="submit">Add Question</button>
      </form>
    </div>
  );
};

export default Admin;
