 import { Component, ReactNode } from 'react';
 import {
     Routes,
     Route,
   } from 'react-router-dom';
 import Login from '../pages/auth/login';
 import Register from '../pages/auth/register';
 import DashBoard from '../pages/dashboard';
import ProtectedRoutes from './protected';
import NotFound from '../pages/notFound';
import EventMain from '../pages/events/main';
import EventDetail from '../pages/events/detail';
import EventUpdate from '../pages/events/update';
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
           <Route path="/events" element={<EventMain />} />
           <Route path="/events/:id" element={<EventDetail />} />
           <Route path="/event/update/:id" element={<EventUpdate />} />
          </Route>
           </Routes>
         )
     }
 }

 export default Routers;
