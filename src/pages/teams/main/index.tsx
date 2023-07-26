import { Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import {  useGetTeam, useJoinTeam } from "../../../services/team";
import { ITeam } from "../../../models/team";
import { LocalStorageUtils } from "../../../utils/localstorage";
import { EKEYS } from "../../../config";
import TeamAction from "../action";
import TeamCreate from "../action/create";



const TeamsMain = () => {
    const { Search } = Input;
    const [search,setSearch] = useState<string>()
    const [currentPage,setCurrentPage] = useState<number>(0)
    const [joinStatusTeam,setJoinStatusTeam] = useState<boolean>(false)
    const { mutateAsync } = useJoinTeam()
    //@ts-ignore
    const user:IUser = LocalStorageUtils.getItem(EKEYS.userKey)
    let query = {
        where: {
            name:(search) ? search : null,
            
        },
        loadRelationIds:true,
        take:6,
        skip:currentPage*6
    }
    const [api, contextHolder] = notification.useNotification();
      const [teamActionData, setTeamActionData] = useState<ITeam>();
    const {data:teams,refetch,isLoading} = useGetTeam(query)
    useEffect(()=>{
        console.log(search)
        console.log(currentPage)
        console.log(query)
        refetch();
        if(isLoading){
            //@ts-ignore
            openNotificationWithIcon('warning','Veriler yükleniyor')
        }
      },[search,currentPage,joinStatusTeam,setJoinStatusTeam,setTeamActionData,teamActionData])
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
      const joinTeam = async (item:ITeam) => {
        const data = await mutateAsync({id:item.id})
        if(data){
            //@ts-ignore
            openNotificationWithIcon('success','Başarılı bir şekilde katıldınız')
        }
        else{
            //@ts-ignore
            openNotificationWithIcon('error','Takıma zaten üyesiniz')
        }
      }
      
  const openNotificationWithIcon = (type: Notification,desc:string) => {
    //@ts-ignore
    api[type]({
      message: 'Bildirim',
      description:
        desc,
    });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);

  const showModal = (item:ITeam) => {
    setTeamActionData(item)
    setIsModalOpen(true);
  };

  const showModalCreate = () => {
    setIsModalOpenCreate(true);
  };

    return(
        <>
        {contextHolder}
        <Modal
        visible={isModalOpenCreate}
        onCancel={() => setIsModalOpenCreate(false)}
        footer={null}
      >
        <TeamCreate />
      </Modal>
<div className="w-10/12 sm:w-80 mx-auto flex ">
     <Search
      placeholder="Takım Adı İle Arama"
      allowClear
      enterButton="Search"
      onSearch={onSearch}
      style={{width: '100%',margin:"5px"}}
    /><button onClick={() => showModalCreate()} type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Takım oluştur</button>
  </div>
  <div className="flex flex-wrap justify-center">
    <>
    {(teams?.data.length == 0)?<><div className="alert-container">
              <div id="alert-border-3" className="flex items-center p-4 mb-4 text-purple-800 border-t-4 border-purple-300 bg-purple-50 dark:text-purple-400 dark:bg-gray-800 dark:border-purple-800" role="alert">
                <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <div className="ml-3 text-sm font-medium">
                  Bulunduğunuz sayfada herhangi bir veri yoktur
                </div>
              </div>
            </div>
</> : <></>}
    </>
    
    {
        teams?.data.map((item:ITeam,key:number)=>{
            return(
                <div key={key} className="max-w-sm flex-shrink-0 w-full sm:w-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-5">
              <a href="#">
              <img className="rounded-t-lg" style={{width:"100%"}} src={`../../src/assets/event/images${key}.jpeg`} alt="" />
              </a>
              <div className="p-5">
              <Modal
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <TeamAction 
        //@ts-ignore
        team={teamActionData} />
      </Modal>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                  <button onClick={()=>joinTeam(item)}  className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                  Takıma Katıl
                  <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                  </button>
              </div>
              {
                //@ts-ignore
                (item.createdUser == user.id)
                ?
                <div className="m-5">
              <button onClick={() => showModal(item)} className='text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                  Takımı Güncelle 
                  <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                  </button>
              </div>
              :
              <>
              </>
              }
            </div>
            )
        })
    }
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
    )
}

export default TeamsMain