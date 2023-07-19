import { useParams } from "react-router-dom";
import { useGetEventId, useUpdateEvent } from "../../../services/event";
import { Button, Divider, Form, Input, Popover, Upload, UploadProps, message } from "antd";
import { LockOutlined, SaveOutlined, TabletOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import { IDynamicForm } from "../../../models/common";
import DynamicForm from "../../../components/DynamicForm";
import { IEventDto } from "../../../models/event";
import { useState } from "react";
import ClueUpdate from "./clue";
import TextArea from "antd/es/input/TextArea";
import { IClue } from "../../../models/clue";
import ExpressionUpdate from "./expression";
import CardExtraUpdate from "./cardExtra";

const EventUpdate = () => {
    const { id } = useParams();
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
    //@ts-ignore
    const { isFetching, data: event, refetch,isLoading ,isError} = useGetEventId(id);
    const [form] = Form.useForm();
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
              style={{ marginBottom: "8px" }}
              defaultValue={event?.event.name}
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
        setLoadingBtn(true);
        try {
          const result = await mutateAsync(form)
          setLoadingBtn(false);
        } catch (error) {
          setLoadingBtn(false);
        }
      };
    console.log(event);
    return(
        <div>
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
  </div>
    )
}

export default EventUpdate