import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GrMailOption } from 'react-icons/gr';

import { createUser } from '../actions/users';
import tsawLogo from '../assets/images/tsawLogo.jpg';

const Register = () => {
  const [notRegistered, setNotRegister] = useState(true);
  const [user, setUser] = useState({name:'', email:'', department:""});
  const dispatch = useDispatch();
  const departments = [
    { label: 'Software', value: 'software' },
    { label: 'R&D', value: 'r&d' },
    { label: 'Finance', value: 'finance' },
    { label: 'Maintainance', value: 'maintainance' },
    { label: 'Aviation', value: 'aviation' },
    { label: 'Business', value: 'business' },
    { label: 'Marketing', value: 'marketing' }
  ];

  const handleNameChange = (e) => {
    setUser({name:e.target.value, email: user.email, department: user.department});
  };

  const handleEmailChange = (e) => {
    setUser({name:user.name, email: e.target.value, department: user.department});
  };

  const handleDepartmentChange = (e) => {
    setUser({ name:user.name, email: user.email, department: e.target.value }); 
  };
  useEffect(() => {
    if (user) setUser(user);
  }, [user]);

  const clear = () => {
    //setCurrentId(0);
    setUser({ name: '', email: '', department: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(user));
    clear();
    setNotRegister(false);
  };

  return (
    <div className= ' bg-zinc-200 h-screen bg-tsaw bg-contain bg-center bg-no-repeat' >
    {notRegistered ? (
      <div>
      {/* <h2 className='flex justify-center text-5xl p-4'>Register</h2>
      <p className='flex justify-center text-2xl p-4'>Fill out the form for atempting the test</p> */}
      <div className='flex justify-center p-5 border-black border-0 '>
        <div className=' h-auto bg-white relative rounded-lg p-4 my-11'>
          <span className='ml-2 top-2 text-xl'> Register</span>
          <img src={tsawLogo} className='inline object-contain h-9 absolute right-2 '/>
          <div className='flex justify-center'>
          <form className='p-2 leading-10' onSubmit={handleSubmit}>
            <label className='text-gray-600 mt-4 '>
              Name:
              <br />
              <input className=' border-2 border-gray-200 px-2 outline-none rounded-lg' 
                type="text" 
                value={user.name}  
                placeholder='Your Name'
                onChange={handleNameChange}
              />
            </label>
            <br />
            <label className='text-gray-600 mt-4'>
              Email:
              <br/>
              <input className=' border-2 border-gray-200 px-2 outline-none rounded-lg'
                type="email" 
                value={user.email} 
                placeholder='Your Email Address'
                onChange={handleEmailChange}
              />
            </label>
            <br />
            <label className='text-gray-600 mt-4'>
              Department:
              <br/>
              <select
                className='border-2 border-gray-200 outline-none rounded-md p-2'
                onChange={handleDepartmentChange}
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department.value} value={department.value}>
                    {department.label}
                  </option>
                ))}
              </select>

            </label>
            <br />
            <div className='flex justify-center'>
              <button className='bg-tblu text-white mt-5  px-4 rounded-lg mx-auto' type="submit">Register</button>
            </div>
          </form>
          </div>
        </div>
      </div>
      </div>
    ):(
      <div>
        <p className='flex justify-center text-5xl p-8'>Registeration Successful</p>
        <p className='flex justify-center text-2xl p-8 gap-2 m-auto'>You will recieve the test link via <GrMailOption/></p>
      </div>
      )}
    </div>
  );
};

export default Register;
