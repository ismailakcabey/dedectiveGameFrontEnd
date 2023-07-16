import { Popover } from "antd";
import { IMessage } from "../../models/message";
import RenderMessageContent from "./MessageDetail";

interface IProps {
    onChange?: (value: string, data: any) => void;
    value?: IMessage[];
}


const MessageComponent = ({ onChange, value }: IProps) => {
    if (value == undefined || value === null) {
        return null
    }
    onChange
    console.log(value)
    return(
        <>
      {
        (value == null || value.length==0) ? <>Vakaya ilişkin mesaj bulunmamaktadır</> : <div className="flex justify-center">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-3 py-3">
                    Mesajı gönderen
                </th>
                <th scope="col" className="px-3 py-3">
                    Mesajı Alan
                </th>
                <th scope="col" className="px-3 py-3">
                    Mesajın İçeriği
                </th>
            </tr>
        </thead>
        <tbody>
           {value.map((item:IMessage)=>{
            return(
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.sender}
                </th>
                <td className="px-3 py-4">
                    {item.receiver}
                </td>
                <td className="px-3 py-4">
                <Popover content={<RenderMessageContent messages={{ data: item.messages }} />} title={`${item.sender} ve ${item.receiver} arasında geçen konuşma`}>
                    <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2 my-2" data-dismiss-target="#alert-border-3" aria-label="Close">Oku</button>
                    </Popover>
                </td>
            </tr>
            )
           })}
        </tbody>
    </table>
      </div>
      }
      </>
        
    )
}

export default MessageComponent