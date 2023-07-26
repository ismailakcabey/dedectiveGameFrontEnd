import { useParams } from "react-router-dom";
import { useGetEventId, useUpdateEvent } from "../../../services/event";
import { Button, Divider, Form, Upload, UploadProps, message, notification } from "antd";
import { SaveOutlined, UploadOutlined } from "@ant-design/icons";
import { IDynamicForm } from "../../../models/common";
import DynamicForm from "../../../components/DynamicForm";
import { IEventDto } from "../../../models/event";
import { useEffect } from "react";
import ClueUpdate from "./clue";
import TextArea from "antd/es/input/TextArea";
import ExpressionUpdate from "./expression";
import CardExtraUpdate from "./cardExtra";
import MessageUpdate from "./message";

const EventUpdate = () => {
    const { id } = useParams();
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: Notification,desc:string) => {
      //@ts-ignore
      api[type]({
        message: 'Bildirim',
        description:
          desc,
      });
    };
    //@ts-ignore
    const { isFetching, data: event, refetch,isLoading ,isError} = useGetEventId(id);
    const [form] = Form.useForm();
    useEffect(() => {
      if (event) {
        form.resetFields();
      }
    }, [event]);
    console.log(event?.event.name)
    //@ts-ignore
    const { mutateAsync } = useUpdateEvent(id?.toString())
    const props: UploadProps = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };
    const formFieldsData = [
        {
          label: '',
          name: 'name',
          rules: [{ required: true, message: "Lütfen olayın başlığını giriniz" }],
          component: <div>
             <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Olay Başlığı</label>
            <TextArea
            defaultValue={event?.event.name}
              style={{ marginBottom: "8px" }}
              placeholder="olayın adını giriniz"/>
          </div>,
          responsive: { xs: 24, md: 12 },
        },
        {
          label: '',
          name: 'summary',
          rules: [{ required: true, message: 'Lütfen olay özeti giriniz!' }],
          component: <div>
             <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Olay Özeti</label>
            <TextArea
            defaultValue={event?.event.summary}
              style={{ marginBottom: "8px" }}
              placeholder="olay özeti giriniz" />
          </div>,
          responsive: { xs: 24, md: 12 },
        },
        {
          label: '',
          name: 'news',
          rules: [{ required: true, message: "Lütfen olay haberi giriniz" }],
          component: <div>
             <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Olay Haberi</label>
            <TextArea
            defaultValue={event?.event.news}
              style={{ marginBottom: "8px" }}
              placeholder="olay haberi giriniz" />
          </div>,
          responsive: { xs: 24, md: 12 },
        },
        {
          label: '',
          name: 'realHistory',
          rules: [{ required: false, message: "Lütfen olayın gerçek hikayesini giriniz" }],
          component: <div>
             <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gerçek Hikaye</label>
            <TextArea
            defaultValue={event?.event.realHistory}
              style={{ marginBottom: "8px" }}
              placeholder="gerçek hikaye giriniz" />
          </div>,
          responsive: { xs: 24, md: 12 },
        },
        {
            label: '',
            name: 'imageBase64',
            rules: [{ required: false, message: "Lütfen olayın görselini giriniz" }],
            component: <div>
               <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Olay Görseli</label>
               <Upload {...props}>
    <Button icon={<UploadOutlined />} style={{color:"white"}}>Click to Upload</Button>
  </Upload>
            </div>,
            responsive: { xs: 24, md: 12 },
          },
      ] as IDynamicForm['formFields'];
      const onFinish = async (form: IEventDto) => {
        try {
          await mutateAsync(form)
          //@ts-ignore
          openNotificationWithIcon('success','Başarılı bir şekilde kayıt güncellediniz')
        } catch (error) {
          //@ts-ignore
          openNotificationWithIcon('error','Bir sorun oluştu')
        }
      };
    console.log(event);
    return(
        <div>
          {contextHolder}
    <div className="mb-5 border border-gray-300 rounded-lg px-5 py-5">
        <h1>Genel Olay Formu</h1>
    <DynamicForm
            form={form}
            formFields={formFieldsData}
            onFinish={onFinish}
            isEdit={false}
            btnSize="large"
            btnText="Vakayı Güncelle"
            btnIcon={<SaveOutlined />}
            isHiddenBtn={false}
          />
    </div>
    <div className="mb-5 border border-gray-300 rounded-lg px-5 py-5">
        <h1>Olaya İlişkin İpuclar</h1>
        <ClueUpdate/>
    </div>
    <Divider />
    <div className="mb-5 border border-gray-300 rounded-lg px-5 py-5">
        <h1>Olaya İlişkin İfadeler</h1>
        <ExpressionUpdate/>
    </div>
    <Divider />
    <div className="mb-5 border border-gray-300 rounded-lg px-5 py-5">
        <h1>Olaya İlişkin Kart Ekstreleri</h1>
        <CardExtraUpdate/>
    </div>
    <Divider />
    <div className="mb-5 border border-gray-300 rounded-lg px-5 py-5">
        <h1>Olaya İlişkin Mesajlaşmalar</h1>
        <MessageUpdate/>
    </div>
    <Divider />
  </div>
    )
}

export default EventUpdate