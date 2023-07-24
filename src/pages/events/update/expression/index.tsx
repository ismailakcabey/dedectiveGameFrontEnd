import { Button, DatePicker, DatePickerProps, Form, Input, Modal, Popover, Switch, Upload, UploadProps, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateExpression, useDeleteExpression, useGetExpression } from "../../../../services/expression";
import { SaveOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { IDynamicForm } from "../../../../models/common";
import DynamicForm from "../../../../components/DynamicForm";
import { IExpression, IExpressionDto } from "../../../../models/expression";
import ExpressionComponentSingle from "../../../../components/Expression/expressionSingle";

const ExpressionUpdate = () => {
    const { id } = useParams();
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
    const [form] = Form.useForm();
    //@ts-ignore
    const { mutateAsync } = useCreateExpression()
    //@ts-ignore
    const { data: expressionData, refetch,isLoading } = useGetExpression(id);
    const [expressionDate, setExpressionDate] = useState(Date);
    const [guilty, setGuilty] = useState<boolean>(true);
    const { mutateAsync: itemDelete } = useDeleteExpression();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
      }, [guilty, setGuilty, setExpressionDate,expressionDate])
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(dateString, "date string",date)
        const isoStringDate = new Date(dateString).toISOString();
        setExpressionDate(isoStringDate);
      };
      const onChangeGuilty = (checked:boolean) => {
        setGuilty(checked)
        console.log(checked);
      };
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
          name: 'declaration',
          rules: [{ required: true, message: "Lütfen ifadeye ait kimlik beyan tipini giriniz" }],
          component: <div>
             <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kimlik Beyan Tipi</label>
            <Input
              style={{ marginBottom: "8px" }}
              placeholder="kimlik beyan tipini giriniz"
              prefix={<UserOutlined />} />
          </div>,
          responsive: { xs: 24, md: 12 },
        },
        {
            label: '',
            name: 'fatherName',
            rules: [{ required: true, message: "Lütfen ifade verene ait baba adını giriniz" }],
            component: <div>
               <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Baba Adı</label>
              <Input
                style={{ marginBottom: "8px" }}
                placeholder="Baba adı"
                prefix={<UserOutlined />} />
            </div>,
            responsive: { xs: 24, md: 12 },
          },
          {
            label: '',
            name: 'motherName',
            rules: [{ required: true, message: "Lütfen ifade verene ait anne adını giriniz" }],
            component: <div>
               <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Anne Adı</label>
              <Input
                style={{ marginBottom: "8px" }}
                placeholder="Anne adı"
                prefix={<UserOutlined />} />
            </div>,
            responsive: { xs: 24, md: 12 },
          },
          {
            label: '',
            name: 'guilty',
            rules: [{ required: false, message: "Lütfen ifade verenin suçluluk bilgisini giriniz" }],
            component: <div>
               <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Suçlu Mu</label>
               <Switch defaultChecked onChange={onChangeGuilty}/>
            </div>,
            responsive: { xs: 24, md: 12 },
          },
          {
            label: '',
            name: 'identityNumber',
            rules: [{ required: true, message: "Lütfen ifade verene ait T.C. bilgisini giriniz" }],
            component: <div>
               <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">T.C.</label>
              <Input
                style={{ marginBottom: "8px" }}
                placeholder="T.C."
                prefix={<UserOutlined />} />
            </div>,
            responsive: { xs: 24, md: 12 },
          },
          {
            label: '',
            name: 'imageBase64',
            rules: [{ required: false, message: "Lütfen ifade verenin görselini giriniz" }],
            component: <div>
               <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">İfade Verenin Görseli</label>
               <Upload {...props}>
    <Button icon={<UploadOutlined />} style={{color:"white"}}>Click to Upload</Button>
  </Upload>
            </div>,
            responsive: { xs: 24, md: 12 },
          },
          {
            label: '',
            name: 'learnStatus',
            rules: [{ required: true, message: "Lütfen ifade verenin eğitim durumu bilgisini giriniz" }],
            component: <div>
               <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Eğitim Durumu</label>
              <Input
                style={{ marginBottom: "8px" }}
                placeholder="Eğitim Durumu"
                prefix={<UserOutlined />} />
            </div>,
            responsive: { xs: 24, md: 12 },
          },
          {
            label: '',
            name: 'martialStatus',
            rules: [{ required: true, message: "Lütfen ifade verenin medeni durumu bilgisini giriniz" }],
            component: <div>
               <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Medeni Durumu</label>
              <Input
                style={{ marginBottom: "8px" }}
                placeholder="Medeni Durumu"
                prefix={<UserOutlined />} />
            </div>,
            responsive: { xs: 24, md: 12 },
          },
          {
            label: '',
            name: 'personName',
            rules: [{ required: true, message: "Lütfen ifade verenin isim bilgisini giriniz" }],
            component: <div>
               <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ad Soyad</label>
              <Input
                style={{ marginBottom: "8px" }}
                placeholder="Ad Soyad"
                prefix={<UserOutlined />} />
            </div>,
            responsive: { xs: 24, md: 12 },
          },
          {
            label: '',
            name: 'phoneNumber',
            rules: [{ required: true, message: "Lütfen ifade verenin telefon numarası bilgisini giriniz" }],
            component: <div>
               <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefon Numarası</label>
              <Input
                style={{ marginBottom: "8px" }}
                placeholder="Telefon Numarası"
                prefix={<UserOutlined />} />
            </div>,
            responsive: { xs: 24, md: 12 },
          },
          {
            label: '',
            name: 'place',
            rules: [{ required: true, message: "Lütfen ifadenin alındığı yerin bilgisini giriniz" }],
            component: <div>
               <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">İfadenin Alındığı Yer</label>
              <Input
                style={{ marginBottom: "8px" }}
                placeholder="İfadenin Alındığı Yer"
                prefix={<UserOutlined />} />
            </div>,
            responsive: { xs: 24, md: 12 },
          },
          {
            label: '',
            name: 'expressionDate',
            rules: [{  message: "Lütfen ifadenin alındığı tarih bilgisini giriniz" }],
            component: <div>
               <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">İfadenin Tarihi</label>
               <DatePicker placeholder="İfade Tarihi" style={{ width: "100%" }} onChange={onChange} />
            </div>,
            responsive: { xs: 24, md: 12 },
          },
          {
            label: '',
            name: 'placeOfBirth',
            rules: [{ required: true, message: "Lütfen ifade verenin doğum yeri bilgisini giriniz" }],
            component: <div>
               <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Doğum Yeri</label>
              <Input
                style={{ marginBottom: "8px" }}
                placeholder="Doğum Yeri"
                prefix={<UserOutlined />} />
            </div>,
            responsive: { xs: 24, md: 12 },
          },
        {
            label: '',
            name: 'text',
            rules: [{ required: true, message: "Lütfen olaya ait ipucunun metnini giriniz" }],
            component: <div>
               <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">İpucu Metni</label>
              <TextArea
                style={{ marginBottom: "8px" }}
                placeholder="İfade metnini giriniz" />
            </div>,
            responsive: { xs: 24, md: 12 },
          },
          {
            label: '',
            name: 'event',
          },
          
      ] as IDynamicForm['formFields'];
      const onFinish = async (form: IExpressionDto) => {
        setLoadingBtn(true);
        try {
            //@ts-ignore
            form.event = parseInt(id)
            form.expressionDate = expressionDate
            form.guilty = guilty
          const result = await mutateAsync(form)
          refetch()
          setLoadingBtn(false);
        } catch (error) {
          setLoadingBtn(false);
        }
      };
      const deleteItem = async (item:any) => {
        await itemDelete(item.id!);
        refetch()
      }
      const showModal = () => {
        setIsModalOpen(true);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    return(
        <div>
            <DynamicForm
            form={form}
            formFields={formFieldsData}
            onFinish={onFinish}
            isEdit={false}
            btnSize="large"
            btnText="İfade Ekle"
            btnIcon={<SaveOutlined />}
            isHiddenBtn={false}
          />
         <table className="w-full mx-auto text-sm text-left text-gray-500 dark:text-gray-400">
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th scope="col" className="px-3 py-3">
        İfade verenin Adı
      </th>
      <th scope="col" className="px-3 py-3">
        İfade verenin doğum yeri
      </th>
      <th scope="col" className="px-3 py-3">
        İfadenin alındığı yer
      </th>
      <th scope="col" className="px-3 py-3">
        İfadenin alındığı tarih
      </th>
      <th scope="col" className="px-3 py-3">
        Detay
      </th>
    </tr>
  </thead>
  <tbody>
    {
    //@ts-ignore
    expressionData?.map((item: IExpression) => {
        let date = new Date(item.expressionDate)
      return (
        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
          <th
            scope="row"
            className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {item.personName}
          </th>
          <th
            scope="row"
            className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {item.placeOfBirth}
          </th>
          <th
            scope="row"
            className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {item.place}
          </th>
          <th
            scope="row"
            className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {date.toDateString()}
          </th>
          <td className="px-3 py-4">
          <Modal width={"60%"} style={{maxHeight:"70%",overflowY:"auto"}} title={item.personName + " Kişisinin ifadesi"} open={isModalOpen}  onCancel={handleCancel}>
          <ExpressionComponentSingle value={item}/>
            </Modal>
              <button
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2 my-2"
                data-dismiss-target="#alert-border-3"
                aria-label="Close"
                onClick={showModal}
              >
                Oku
              </button>
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

export default ExpressionUpdate