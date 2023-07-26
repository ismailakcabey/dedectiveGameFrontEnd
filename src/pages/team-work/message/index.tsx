import { Input } from "antd";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { IUser } from "../../../models/user";
import { LocalStorageUtils } from "../../../utils/localstorage";
import { EKEYS } from "../../../config";
import MessageList from "./messageList";

interface IProps {
  team: string;
}

const TeamMessage = ({ team }: IProps) => {
    const { Search } = Input;
    //@ts-ignore
    const user:IUser = LocalStorageUtils.getItem(EKEYS.userKey)
    const [message,setMessage] = useState<string>()
    const [messages,setMessages] = useState([])
    useEffect(()=>{

    },[message,setMessage,messages,setMessages])
    const socket = io('http://localhost:3000');
    const onSearch = (value: string) => {
        setMessage(value);
        const teamMessage = {
            sender: user?.userName,
            content: value,
            teamId: parseInt(team), // Burada "teamId" yerine "team" değişkenini kullanıyoruz.
          };
          socket.emit("teamChannelSendMessage", teamMessage);
      }

  useEffect(() => {
    
    
    socket.on('connect', () => {
      console.log('WebSocket connection established.');
      console.log("bağlantı sağlandı");

      // Abone olmak için kanal adını belirtin
      const subscribeMessage = {
        channel: `listenMessage/${team}`,
        action: 'subscribe',
      };
      socket.send(JSON.stringify(subscribeMessage));
      console.log(subscribeMessage)
      // Send a message to teamChannelSendMessage channel
      
    });

    socket.on(`listenMessage/${team}`, (message) => {
      // Kanaldan gelen mesajları işleyin
      console.log('Received message:', message);
      //@ts-ignore
      setMessages(prevMessages => [...prevMessages, message]);
      console.log(messages)
    });

    // Diğer kodlarınızı devam ettirin...

    return () => {
      socket.disconnect(); // Bileşenin unmount edilmesinde soketi kapatın.
    };
  }, [team]);
  return (
    <div>
        <div style={{maxHeight:"500px",overflowY:"auto"}}>
        <MessageList messages={messages}/>
        </div>
      <Search
      placeholder="Mesaj Gir"
      allowClear
      enterButton="Search"
      onSearch={onSearch}
      style={{width: '100%'}}
    />
    </div>
  );
};

export default TeamMessage;
