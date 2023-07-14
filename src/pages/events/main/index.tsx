import { Input, Pagination, Space } from 'antd';
import { IEvent, IEventResponse } from "../../../models/event";
import { useGetEvent } from "../../../services/event";
import { LeftOutlined, RightOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';


const EventMain = () => {
    
    const { Search } = Input;
  const [search,setSearch] = useState<string>()
  const [currentPage,setCurrentPage] = useState<number>(0)
    let query = {
        where: {
            name:(search) ? search : null,
            
        },
        take:6,
        skip:currentPage*6
    }
    const { isFetching, data: eventData, refetch } = useGetEvent(query);

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
     <div className="w-10/12 sm:w-80 mx-auto ">
     <Search
      placeholder="Mağdur Adı İle Arama"
      allowClear
      enterButton="Search"
      onSearch={onSearch}
    />
  </div>
      <div className="flex flex-wrap justify-center">
        {event?.map((item: IEvent, key: number) => {
          return (
            <div key={key} className="max-w-sm flex-shrink-0 w-full sm:w-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-5">
              <a href="#">
                {
                  (key >= 4) ?
                  <img className="rounded-t-lg" style={{width:"80%"}} src="https://cdn-icons-png.flaticon.com/128/10655/10655641.png" alt="" />
                  :
                  <img className="rounded-t-lg" style={{width:"100%"}} src={`../../src/assets/images${key}.jpeg`} alt="" />
                }
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.summary}</p>
                <a href={`/events/${item.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Vakayı Çöz
                  <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </a>
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
