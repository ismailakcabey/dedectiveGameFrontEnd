import { useParams } from "react-router-dom";
import { EKEYS } from "../../../config";
import { IUser } from "../../../models/user";
import { LocalStorageUtils } from "../../../utils/localstorage";
import classNames from "classnames";
interface IProps{
    messages:object[]
}

const MessageList = ({messages}:IProps) => {
    const { id } = useParams();
    //@ts-ignore
    console.log(parseInt(id))
    //@ts-ignore
    console.log(parseInt(id)==messages[0]?.teamId)
    //@ts-ignore
    const user:IUser = LocalStorageUtils.getItem(EKEYS.userKey)
    let filteredMessages = messages.filter(
        //@ts-ignore
        (message: any) => message.teamId === parseInt(id)
      );
    return(
        <>
        Mesajlar
        <div >
         <div>
      {filteredMessages.map((message:any, index:number) => {
        const isSender = message.sender === user.userName;

        const messageClasses = classNames(
          "p-2 m-2 rounded-lg max-w-xs",
          isSender ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-gray-800"
        );

        const hiddenMessage = classNames(
            {
                //@ts-ignore
                "hidden": parseInt(id) !== message.teamId } // Eğer parseInt(id) == message.teamId değilse "hidden" sınıfını ekle
          );

        return (
          <div key={index} className={`flex ${hiddenMessage}`}>
            <div className={messageClasses}>
            <p className="text-xl font-semibold text-gray-600/100 dark:text-gray-800/100">{message.sender}</p>
              <p>{message.content}</p>
            </div>
          </div>
        );
      })}
    </div>
    </div>
        </>
    )
}

export default MessageList