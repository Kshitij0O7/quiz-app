import React from 'react';

import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers';

import Register from './components/Register';
import Test from './components/Test';
import Admin from './components/Admin';

const App = () => {
  //const [registered, setRegistered] = useState(false);
  //const [token, setToken] = useState('');

  // const handleRegistration = () => {
  //   // Perform registration logic here
  //   // Set the registered state to true when registration is successful
  //   setRegistered(true);
  //   setToken('GENERATED_TOKEN');
  // };

  const store = createStore(reducers, compose(applyMiddleware(thunk)));
  
  return (
    <Provider store={store}>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Register />} />
           
          <Route path="/test/:token" element={<Test/>} />
           
          <Route path="/admin/ZXTY289!@jbyu" element={<Admin/>}/>
        </Routes>
      </div>
    </Router>
    </Provider>
  );
};

export default App;
