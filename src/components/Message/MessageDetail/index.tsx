import classNames from "classnames";

interface IMessageData {
    messages:IMsg
  }
  
  interface IMsg {
    data : [
        {
            person: string,
            text: string
        }
    ]
  }

const RenderMessageContent = ({ messages }: IMessageData) => {
  console.log(messages,"pop up içinde")
  const msgs = messages.data
  console.log(msgs)
  return (
    
    <div >
         <div>
      {msgs.map((message, index) => {
        const isSender = message.person === "receiver";

        const messageClasses = classNames(
          "p-2 m-2 rounded-lg max-w-xs",
          isSender ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-gray-800"
        );

        return (
          <div key={index} className="flex">
            <div className={messageClasses}>
              <p>{message.text}</p>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default RenderMessageContent;
