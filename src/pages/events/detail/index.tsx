import { useParams } from "react-router-dom";
import { useGetEventId } from "../../../services/event";
import { useEffect, useState } from "react";
import ExpressionComponent from "../../../components/Expression";


const EventDetail = () => {
    const { id } = useParams();
    //@ts-ignore
    const { isFetching, data: event, refetch } = useGetEventId(id);
    const [component,setComponent] = useState<number>(2)
    useEffect(()=>{
        console.log(component)
    }, [component,setComponent])
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
                <>Kart Ekstresi</>
            )
        }
        if(cmp == 2){
            return(
                <ExpressionComponent value={event?.expression}/>
            )
        }
        if(cmp == 3){
            return(
                <>İpuçları</>
            )
        }
        if(cmp == 4){
            return(
                <>Mesajlar</>
            )
        }
        if(cmp == 5){
            return(
                <>Olay şeması</>
            )
        }
    }
    
    return(
        <>
  <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
    <span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-600 from-purple-400">
      {event?.event?.name}
    </span>
    {" "}Vakası
  </h1>
  
<p className="mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">{event?.event.news}</p>


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
    <div className="w-full sm:w-11/12 md:w-11/12 lg:w-11/12 xl:w-11/12 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    {CmpReturn(component)}
        
    </div>
  </div>
</>
    )
}
export default EventDetail