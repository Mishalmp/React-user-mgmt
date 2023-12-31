import './App.css';

import { Route,Routes } from 'react-router-dom';  
import { PrivateRoute } from './components/PrivateRoute';

import Login from './components/login/login';
import Register from './components/register/register';
import Admin from './components/admin/admin'
import Profile from './components/profile/profile';



function App() {
  return (
    <div>
      <Routes>
      <Route Component={PrivateRoute} path='/' />
      <Route Component={Login} path='/login' />
      <Route Component={Register} path='/register' />
      <Route Component={Admin} path='/admin' />
      <Route Component={Profile} path='/profile' />
      

    </Routes>
    </div>
    
  )
}

export default App;

