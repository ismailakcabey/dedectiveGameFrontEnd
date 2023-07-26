import { useEffect, useState } from "react";
import { IUserParams } from "../../../models/user";
import { DatePicker, DatePickerProps, Form, Input, notification } from "antd";
import DynamicForm from "../../../components/DynamicForm";
import {  LockOutlined, LoginOutlined, TabletOutlined, UserOutlined } from "@ant-design/icons";
import './index.scss';
import { useUser } from "../../../services/user/user";
import { IDynamicForm } from "../../../models/common";
import RoleListCmp from "../../../components/Selects/roleSelect";

const Register = () => {
  const [form] = Form.useForm();
  const [role, setRole] = useState<string>("user");
  const [birthDate, setBirthDate] = useState(Date);
  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
  const userMutation = useUser();
  console.log(loadingBtn)
  useEffect(() => {
    console.log("doğum tarihi: ", birthDate)
    console.log("role: ", role)
  }, [role, birthDate])
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: Notification,desc:string) => {
    //@ts-ignore
    api[type]({
      message: 'Bildirim',
      description:
        desc,
    });
  };
  const onFinish = async (form: IUserParams) => {
    setLoadingBtn(true);
    try {
      form.role = role;
      form.birthDate = birthDate;
      await userMutation.mutateAsync(form)
      setLoadingBtn(false);
      //@ts-ignore
      openNotificationWithIcon('success','Başarılı bir şekilde kayıt oluşturdunuz e-posta kutunuzu kontrol ediniz.')
    } catch (error) {
      //@ts-ignore
      openNotificationWithIcon('warning','Bir sorun oluştu')
      setLoadingBtn(false);
    }
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(dateString, "date string",date)
    const isoStringDate = new Date(dateString).toISOString();
    setBirthDate(isoStringDate);
  };

  const onChangeSelect = (value: string) => {
    setRole(value);
    console.log(`selected ${value}`);
  };


  const formFieldsData = [
    {
      label: '',
      name: 'email',
      rules: [{ required: true, message: "Lütfen email giriniz" }],
      component: <div>
         <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <Input
          style={{ marginBottom: "8px" }}
          placeholder="email giriniz"
          prefix={<UserOutlined />} />
      </div>,
      responsive: { xs: 24, md: 12 },
    },
    {
      label: '',
      name: 'password',
      rules: [{ required: true, message: 'Lütfen şifreyi giriniz!' }],
      component: <div>
         <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Şifre</label>
        <Input
          style={{ marginBottom: "8px" }}
          placeholder="şifre giriniz"
          prefix={<LockOutlined />} />
      </div>,
      responsive: { xs: 24, md: 12 },
    },
    {
      label: '',
      name: 'userName',
      rules: [{ required: true, message: "Lütfen kullanıcı adını giriniz" }],
      component: <div>
         <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kullanıcı adı</label>
        <Input
          style={{ marginBottom: "8px" }}
          placeholder="kullanıcı adı giriniz"
          prefix={<UserOutlined />} />
      </div>,
      responsive: { xs: 24, md: 12 },
    },
    {
      label: '',
      name: 'phoneNumber',
      rules: [{ required: false, message: "Lütfen telefon numarası giriniz" }],
      component: <div>
         <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefon numarası</label>
        <Input
          style={{ marginBottom: "8px" }}
          placeholder="telefon numarası giriniz"
          prefix={<TabletOutlined />} />
      </div>,
      responsive: { xs: 24, md: 12 },
    },
    {
      label: '',
      name: 'birthDate',
      rules: [{ required: false, message: "Lütfen doğum tarihi giriniz" }],
      component: <div>
         <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Doğum Tarihi</label>
        <DatePicker placeholder="Doğum Tarihi" style={{ width: "100%" }} onChange={onChange} />
      </div>,
      responsive: { xs: 24, md: 12 },
    },
    {
      label: '',
      name: 'role',
      rules: [{ required: false, message: "Lütfen rol giriniz" }],
      component: <div>
         <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
        <RoleListCmp onChange={onChangeSelect} />
      </div>,
      responsive: { xs: 24, md: 12 },
    },
  ] as IDynamicForm['formFields'];

  return (
    <div className="body">
      {contextHolder}
      <div className="container">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Oyuna Kayıt Ol</h5>
        
          <DynamicForm
            form={form}
            formFields={formFieldsData}
            onFinish={onFinish}
            isEdit={false}
            btnSize="large"
            btnText="Kayıt Ol"
            btnIcon={<LoginOutlined />}
            isHiddenBtn={false}
          />
        
        
        </div>
      </div>

      <div className="image-container">

        <div>
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-600 from-purple-400">Dedective Game</span> vakaları çözmeni bekliyor</h1>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">İçeriğinde bulunan vakaları ister çöz ister yeni vaka oluşturarak rakiplerini zorla</p>
          <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
            Daha Fazla Bilgi
            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
        </div>

      </div>
    </div>
  );
};

export default Register;
