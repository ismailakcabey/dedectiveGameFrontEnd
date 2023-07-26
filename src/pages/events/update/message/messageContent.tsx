import { Form, Select } from "antd";
import { IDynamicForm } from "../../../../models/common";
import { SaveOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import DynamicForm from "../../../../components/DynamicForm";

interface IProps {
    messageDataContent:any,
    setMessageDataContent:any
}

const MessageContent = ({ messageDataContent, setMessageDataContent }: IProps) => {
    const [form] = Form.useForm();
    const [person,setPerson] = useState<string>()
    const [message,setMessage] = useState([])
    useEffect(()=>{
        messageDataContent = message
    },[person,setPerson])
    messageDataContent
    const onChange = (value: string) => {
        console.log(`selected ${value}`);
        setPerson(value)
    };
    const onSearch = (value: string) => {
        console.log('search:', value);
    };
    const formFieldsData = [
        {
            label: '',
            name: 'person',
            rules: [{ message: "Lütfen mesajı gönderen tarafı seçiniz" }],
            component: <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gönderen Taraf</label>
                <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    options={[
                        {
                            value: 'sender',
                            label: 'sender',
                        },
                        {
                            value: 'receiver',
                            label: 'receiver',
                        },
                    ]}
                />
            </div>,
            responsive: { xs: 24, md: 12 },
        },
        {
            label: '',
            name: 'text',
            rules: [{ required: true, message: "Lütfen mesajı metnini giriniz" }],
            component: <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mesaj Metnini</label>
                <TextArea
                    style={{ marginBottom: "8px" }}
                    placeholder="Mesaj metnini giriniz" />
            </div>,
            responsive: { xs: 24, md: 12 },
        },
    ] as IDynamicForm['formFields'];
    const onFinish = async (form: any) => {
        try {
            form.person = person
            console.log(form)
            //@ts-ignore
            setMessage((prevMessages) => [...prevMessages, form]);
            setMessageDataContent((prevMessages:any) => [...prevMessages, form]);
        } catch (error) {
            console.log(error)
        }
      };
      const handleDeleteMessage = (key: number) => {
        setMessage((prevMessages) => prevMessages.filter(( index: number) => index !== key));
      };
    return (
        <div>
            Mesajlaşmaları Giriniz
            <DynamicForm
            form={form}
            formFields={formFieldsData}
            onFinish={onFinish}
            isEdit={false}
            btnSize="large"
            btnText="Mesajlaşma Ekle"
            btnIcon={<SaveOutlined />}
            isHiddenBtn={false}
          />
          <table className="w-full mx-auto text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th scope="col" className="px-3 py-3">
        Mesajı Gönderen Taraf
      </th>
      <th scope="col" className="px-3 py-3">
        Mesaj İçeriği
      </th>
      <th scope="col" className="px-3 py-3">
       
      </th>
    </tr>
  </thead>
  <tbody>
    {message.map((item:any,key:number)=>{
        return(
            <tr key={key} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                 scope="row"
                 className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                 >
                    {item.person}
                </th>
                <th
                 scope="row"
                 className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                 >
                    {item.text}
                </th>
                <th
                 scope="row"
                 className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                 >
                    <button type="button" onClick={() => handleDeleteMessage(key)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Sil</button>
                </th>
            </tr>
        )
    })}
  </tbody>
          </table>
        </div>
    )
}

export default MessageContent