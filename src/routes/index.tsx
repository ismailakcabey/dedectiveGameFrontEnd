 import { Component, ReactNode, useState } from 'react';
 import {
     BrowserRouter as Router,
     Routes,
     Route,
   } from 'react-router-dom';
 import Login from '../pages/auth/login';
 import Register from '../pages/auth/register';
 import DashBoard from '../pages/dashboard';
import ProtectedRoutes from './protected';
import NotFound from '../pages/notFound';
 class Routers extends Component {  
     render(): ReactNode {
         return(
             <Routes>
           <Route path="/login" element={<Login />}/>
           <Route path="*" element={<NotFound />}/>
           <Route path='/register' element={<Register/>}/>
          <Route element={<ProtectedRoutes/>}>
          <Route path='/profile' element={<></>}/>
           <Route path="/" element={<DashBoard />} />
          </Route>
           </Routes>
         )
     }
 }

 export default Routers;
