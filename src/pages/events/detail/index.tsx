import { useParams } from "react-router-dom";
import { useGetEventId } from "../../../services/event";
import { useEffect, useState } from "react";
import ExpressionComponent from "../../../components/Expression";
import CardExtreComponent from "../../../components/CardExtre";
import MessageComponent from "../../../components/Message";
import ClueComponent from "../../../components/Clue";
import HappendSchema from "../../../components/HappendSchema";
import { IExpression } from "../../../models/expression";
import { Modal } from 'antd';

const EventDetail = () => {
    const { id } = useParams();
    //@ts-ignore
    const { isFetching, data: event, refetch,isLoading ,isError} = useGetEventId(id);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [component,setComponent] = useState<number>(2)
    const [currentExpression,setCurrentExpression] = useState<IExpression>()
    useEffect(()=>{
        console.log(component)
        console.log(currentExpression)
    }, [component,setComponent,currentExpression,setCurrentExpression])
    console.log(event)
    const buttonArray = [
        {
            name:"Kart Ekstreleri",
            number:1
        },
        {
            name:"İfadeler",
            number:2
        },
        {
            name:"İpuçları",
            number:3
        },
        {
            name:"Mesajlar",
            number:4
        },
        {
            name:"Olay Şeması",
            number:5
        }
    ]

    const CmpReturn = (cmp:number) => {
        if(cmp == 1){
            return(
               <CardExtreComponent value={event?.cardExtra}/>
            )
        }
        if(cmp == 2){
            return(
                <ExpressionComponent value={event?.expression}/>
            )
        }
        if(cmp == 3){
            return(
                <ClueComponent value={event?.clue}/>
            )
        }
        if(cmp == 4){
            return(
                <MessageComponent value={event?.message}/>
            )
        }
        if(cmp == 5){
            return(
                <HappendSchema value={event?.expression}/>
            )
        }
    }

    const showModal = (index:number) => {
      console.log("indexinci eleman: " + JSON.stringify(index))
      setCurrentExpression(event?.expression[index])
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const ResolveComponent = () => {
      return(
        <div>
          {
            (currentExpression?.guilty == true) ? <>
            Cevap Doğru Olayın Tam Hikayesi Bu Şekildedir.
            <br />
            {event?.event.realHistory}
            </>: <><svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <div className="ml-3 text-sm font-medium">
                Verdiğiniz Cevap Hatalı Lütfen Biraz Daha Düşünüp Ayrıntılara Odaklanın
                </div></>
          }
        </div>
      )
    }
    
    return(
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
  <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
    <span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-600 from-purple-400">
      {event?.event?.name}
    </span>
    {" "}Vakası
  </h1>
  
<p className="mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">{event?.event.news}</p>

<Modal title="Cevap" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <ResolveComponent/>
      </Modal>

  <div className="flex flex-wrap justify-center mx-5 my-5">
    {buttonArray.map((item: any, index) => (
      <button
        key={index}
        onClick={() => {
          setComponent(item.number);
        }}
        type="button"
        className={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2 my-2 ${component === item.number ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {item.name}
      </button>
    ))}
  </div>
  <div className="flex justify-center">
    <div className="w-full sm:w-10/12 md:w-10/12 lg:w-10/12 xl:w-10/12 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    {CmpReturn(component)}
    <div className="mt-5 text-center">
  <p>Şüpheliyi Seç</p>
  <div className="flex justify-center">
    {event?.expression.map((item: IExpression, index) => (
      <button
        key={index}
        onClick={()=>{
          showModal(index)
        }}
        type="button"
        className={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2 my-2`}
      >
        {item.personName}
      </button>
    ))}
  </div>
</div>


    </div>
    
  </div>
</>
    )
}
export default EventDetail

