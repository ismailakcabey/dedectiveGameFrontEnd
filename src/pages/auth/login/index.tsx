import { useState } from "react";
import { useLogin } from "../../../services/auth/auth";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { configState } from "../../../stores/config";
import { ILoginParams } from "../../../models/login";
import { LocalStorageUtils } from "../../../utils/localstorage";
import { EKEYS } from "../../../config";
import { IUser } from "../../../models/user";
import { APIS } from "../../../services";
import Axios from 'axios';
import {  Form, Input } from "antd";
import { IDynamicForm } from "../../../models/common";
import DynamicForm from "../../../components/DynamicForm";
import { LockOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import './index.scss';
const Login = () => {
  let loginObj = {
    email: "",
    password: "",
  };

  const [form] = Form.useForm();
  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const [config, setConfig] = useRecoilState(configState);
  console.log(loadingBtn)
  const onFinish = async (form: ILoginParams) => {
    setLoadingBtn(true);
    try {
      const result = await loginMutation.mutateAsync(form);
      LocalStorageUtils.setItem<string>(EKEYS.tokenKey, result.token);
       const axios = Axios.create({
         // Axios yapılandırmasını burada tanımlayın
       });
       axios.interceptors.request.use((config:any) => {
         //@ts-ignore
         config.headers.Authorization = `Bearer ${result.token}`;
         return config;
       });
       setLoadingBtn(true);
      const { data: getUser } = await axios.get<IUser>(APIS.AUTH.ME);
      console.log(getUser,"data userme axios");
      setLoadingBtn(false); 
      setConfig({ ...config, user: getUser });
      LocalStorageUtils.setItem(EKEYS.userKey, getUser);
      navigate({ pathname: '/' });
      setLoadingBtn(false);
    } catch (error){
      setLoadingBtn(false);
    }
  };

  const formFields = [
    {
      label: '',
      name: 'email',
      rules: [{ required: true, message: "Lütfen email giriniz" }],
      component: <div>
        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <Input 
      style={{marginBottom:"8px"}}
       placeholder="email"
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
      style={{marginBottom:"8px"}}
       placeholder="şifre"
        prefix={<LockOutlined />} />
      </div>,
        responsive: { xs: 24, md: 12 },
    },
  ] as IDynamicForm['formFields'];

  return (
    <div className="body">
      <div className="container">
          <div >
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">Oyuna Giriş Yap</h5>
          <DynamicForm
              initialValues={loginObj}
              form={form}
              formFields={formFields}
              onFinish={onFinish}
              isEdit={false}
              btnSize="large"
              btnText="Giriş Yap"
              btnIcon={<LoginOutlined />}
              isHiddenBtn={false}
            />
            <Link to="/register">
            <div className="button-container"><button type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Kayıt Ol</button></div>
            </Link>
            </div>
            
            
          </div>
      </div>
      <div className="image-container">
            <div>
                          
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-600 from-purple-400">Dedective Game</span> vakaları çözmeni bekliyor</h1>
<p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">İçeriğinde bulunan vakaları ister çöz ister yeni vaka oluşturarak rakiplerini zorla</p>
<a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900">
    Daha Fazla Bilgi
    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
  </svg>
</a>
            </div>

            </div>
    </div>
  );
};

export default Login;
