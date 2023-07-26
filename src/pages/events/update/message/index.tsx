import { Form, Input, Popover, notification } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateMessage, useDeleteMessage, useGetMessage } from "../../../../services/message";
import { IMessage, IMessageDto } from "../../../../models/message";
import { SaveOutlined, UserOutlined } from "@ant-design/icons";
import { IDynamicForm } from "../../../../models/common";
import DynamicForm from "../../../../components/DynamicForm";
import MessageContent from "./messageContent";
import RenderMessageContent from "../../../../components/Message/MessageDetail";

const MessageUpdate = () => {
    const { id } = useParams();
    const [message,setMessage] = useState<[]>([]);
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [messageDataContent, setMessageDataContent] = useState([]);
    //@ts-ignore
    const { mutateAsync } = useCreateMessage()
    //@ts-ignore
    const { data: messageData, refetch,isLoading } = useGetMessage(id);
    const { mutateAsync: itemDeleteMessage } = useDeleteMessage();
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: Notification,desc:string) => {
      //@ts-ignore
      api[type]({
        message: 'Bildirim',
        description:
          desc,
      });
    };
    useEffect(()=>{
    },[message,setMessage,loadingBtn,setLoadingBtn])
    const deleteItem = async (item:any) => {
      try {
        await itemDeleteMessage(item.id!);
        refetch()
        //@ts-ignore
        openNotificationWithIcon('success','Başarılı bir şekilde kayıt güncellediniz')
        setLoadingBtn(false)
      } catch (error) {
        //@ts-ignore
        openNotificationWithIcon('error','Bir sorun oluştu')
          setLoadingBtn(false);
      }
        
      }
      const formFieldsData = [
        {
          label: '',
          name: 'sender',
          rules: [{ required: true, message: "Lütfen mesajı gönderenin adını giriniz" }],
          component: <div>
             <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gönderenin Adı</label>
            <Input
              style={{ marginBottom: "8px" }}
              placeholder="Mesajı gönderenin adını giriniz"
              prefix={<UserOutlined />} />
          </div>,
          responsive: { xs: 24, md: 12 },
        },
        {
            label: '',
            name: 'receiver',
            rules: [{ required: true, message: "Lütfen mesajı alanın adını giriniz" }],
            component: <div>
               <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alıcının Adı</label>
              <Input
                style={{ marginBottom: "8px" }}
                placeholder="Mesajı alanın adını giriniz"
                prefix={<UserOutlined />} />
            </div>,
            responsive: { xs: 24, md: 12 },
          },
      ] as IDynamicForm['formFields'];
      const onFinish = async (form: IMessageDto) => {
        setLoadingBtn(true);
        try {
            //@ts-ignore
            form.event = parseInt(id)
            //@ts-ignore
            form.messages = messageDataContent
          await mutateAsync(form)
          //@ts-ignore
          openNotificationWithIcon('success','Başarılı bir şekilde kayıt güncellediniz')
          refetch()
          setLoadingBtn(false);
        } catch (error) {
           //@ts-ignore
           openNotificationWithIcon('error','Bir sorun oluştu')
          setLoadingBtn(false);
        }
      };
    return(
        <div>
          {contextHolder}
          <div className="mb-5">
          <MessageContent messageDataContent={messageDataContent} setMessageDataContent={setMessageDataContent}/>
          </div>
            <DynamicForm
        form={form}
        formFields={formFieldsData}
        onFinish={onFinish}
        isEdit={false}
        btnSize="large"
        btnText="Mesajı Kaydet"
        btnIcon={<SaveOutlined />}
        isHiddenBtn={false}
      />
     <table className="w-full mx-auto text-sm text-left text-gray-500 dark:text-gray-400">
<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
<tr>
  <th scope="col" className="px-3 py-3">
    Mesajı Gönderen
  </th>
  <th scope="col" className="px-3 py-3">
   Mesajı Alan
  </th>
  <th scope="col" className="px-3 py-3">
    
  </th>
</tr>
</thead>
<tbody>
{
//@ts-ignore
messageData?.map((item: IMessage) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
      <th
        scope="row"
        className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {item.sender}
      </th>
      <th
        scope="row"
        className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {item.receiver}
      </th>
      <td className="px-3 py-4">
      <Popover
              content={<RenderMessageContent messages={{ data: item.messages }} />}
              title={`${item.sender} kişisinden ${item.receiver} kişisine gönderilen mesajlar`}
            >
              <button
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2 my-2"
                data-dismiss-target="#alert-border-3"
                aria-label="Close"
              >
                Oku
              </button>
            </Popover>
        <button type="button" onClick={()=>{
            deleteItem(item)
        }} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Sil</button>
      </td>
    </tr>
  );
})}
</tbody>
</table>

      
    </div>
    )
}

export default MessageUpdate