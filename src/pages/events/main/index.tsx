import { Input } from 'antd';
import { IEvent } from "../../../models/event";
import { useCreateEvent, useGetEvent } from "../../../services/event";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IUser } from '../../../models/user';
import { LocalStorageUtils } from '../../../utils/localstorage';
import { EKEYS } from '../../../config';


const EventMain = () => {
    const { Search } = Input;
  const [search,setSearch] = useState<string>()
  const navigate = useNavigate();
  //@ts-ignore
  const user:IUser = LocalStorageUtils.getItem(EKEYS.userKey)
  const [currentPage,setCurrentPage] = useState<number>(0)
    let query = {
        where: {
            name:(search) ? search : null,
            
        },
        loadRelationIds:true,
        take:6,
        skip:currentPage*6
    }

    const { data: eventData, refetch,isLoading } = useGetEvent(query);
    const { mutateAsync } = useCreateEvent();

    const createEvent = async () => {
      console.log("burada")
      const data = await mutateAsync({name:"",summary:"",news:"",realHistory:"",imageBase64:""})
      
      console.log(JSON.stringify(data),"data değeri bu")
      navigate({ pathname: `/event/update/${data.id}` });
    }
    console.log(isLoading)
    useEffect(()=>{
        console.log(search)
        console.log(currentPage)
        console.log(query)
        refetch();
      },[search,currentPage])
    console.log(eventData?.data,"eventData")
  let event = eventData?.data;
  console.log(event);
  const onSearch = (value: string) => {
    console.log(value);
    setSearch(value);
  }

  const onClickNext = () => {
    setCurrentPage(currentPage+1)
    console.log("sıradaki sayfa")
  }

  const onClickPrev = () => {
    setCurrentPage(currentPage-1)
    console.log("önceki sayfa")
  }

    
  return (
    <>
    
    {(isLoading)?<><div className="alert-container">
              <div id="alert-border-3" className="flex items-center p-4 mb-4 text-purple-800 border-t-4 border-purple-300 bg-purple-50 dark:text-purple-400 dark:bg-gray-800 dark:border-purple-800" role="alert">
                <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <div className="ml-3 text-sm font-medium">
                  Bir Sorun oluştu lütfen daha sonra tekrar deneyiniz
                </div>
                <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-3" aria-label="Close">
                </button>
              </div>
            </div>
</>:<></>}
     <div className="w-10/12 sm:w-80 mx-auto flex ">
     <Search
      placeholder="Mağdur Adı İle Arama"
      allowClear
      enterButton="Search"
      onSearch={onSearch}
      style={{width: '100%'}}
    /><button type="button" onClick={createEvent} className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Vaka oluştur</button>
  </div>
  
      <div className="flex flex-wrap justify-center">
      <>
      {(eventData?.data.length == 0)?<><div className="alert-container">
              <div id="alert-border-3" className="flex items-center p-4 mb-4 text-purple-800 border-t-4 border-purple-300 bg-purple-50 dark:text-purple-400 dark:bg-gray-800 dark:border-purple-800" role="alert">
                <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <div className="ml-3 text-sm font-medium">
                  Bulunduğunuz sayfada herhangi bir veri yoktur
                </div>
                <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-3" aria-label="Close">
                </button>
              </div>
            </div>
</> : <></>}
      </>
        {event?.map((item: IEvent, key: number) => {

          return (
            <div key={key} className="max-w-sm flex-shrink-0 w-full sm:w-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-5">
              <a href="#">
              <img className="rounded-t-lg" style={{width:"100%"}} src={`../../src/assets/event/images${key}.jpeg`} alt="" />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.summary}</p>
                <Link to={`/events/${item.id}`}>
                  <button  className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                  Vakayı Çöz
                  <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                  </button>
                  
                
                </Link>
                
                {
                  //@ts-ignore
                  (item?.createdUser == user.id) ? <>
                  <Link to={`/event/update/${item.id}`}>
                  <button className='text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                  Vakayı Güncelle 
                  <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                  </button>
                  
                </Link>
                  </>:<></>
                }
              </div>
            </div>
          );
        })}
        <nav className="flex justify-center fixed bottom-5 w-full">
        <div className="flex">
  <button onClick={onClickPrev}>
  <a className="flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
    <svg className="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
    </svg>
    Previous
  </a>
  </button>
  <div className="text-lg font-bold mx-3">{currentPage + 1}</div>
  <button onClick={onClickNext}>
  <a  className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
    Next
    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
    </svg>
  </a>
  </button>
  
</div>
</nav>
      </div>
    </>
  );
};

export default EventMain;
