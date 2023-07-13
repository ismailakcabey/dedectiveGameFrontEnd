import Routers from './routes';
import SideBar from './components/Sidebar';
import './App.css'
import { LocalStorageUtils } from './utils/localstorage';
import { IUser } from './models/user';
import { EKEYS } from './config';
function App() {
  const menuElement= [
    {
      link:"/",
      name: "Dashboard"
  },
  {
    link:"/events",
    name: "Olaylar"
},
{
  link:"/team/meet",
  name: "Takım Çalışması"
},
{
  link:"/teams",
  name: "Takımlar"
}
  ]
  //@ts-ignore
  const data:IUser = LocalStorageUtils.getItem(EKEYS.userKey)
  
  return (
    <div id='body' className="flex h-screen">
      {(data)?<SideBar menuElement={menuElement} />:<></>}
      <div id='content' className="flex-grow mt-10 ml-5">
        <Routers />
      </div>
    </div>
  )
}

export default App
