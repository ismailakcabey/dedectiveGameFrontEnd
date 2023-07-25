import { useEffect, useState } from "react";
import { IDynamicForm } from "../../../models/common";
import { Form, Input, notification } from "antd";
import { ITeam, ITeamDto } from "../../../models/team";
import DynamicForm from "../../../components/DynamicForm";
import { SaveOutlined } from "@ant-design/icons";
import { useCreateTeam, usePatchTeam } from "../../../services/team";



const TeamCreate = () => {
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
    const [form] = Form.useForm();
    const { mutateAsync } = useCreateTeam()
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: Notification,desc:string) => {
      //@ts-ignore
      api[type]({
        message: 'Bildirim',
        description:
          desc,
      });
    };
    const formFieldsData = [
        {
          label: '',
          name: 'name',
          rules: [{ required: true, message: "Lütfen takım adını giriniz" }],
          component: <div>
             <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Takım Adı</label>
            <Input
              style={{ marginBottom: "8px" }}
              placeholder="Takım adını giriniz"/>
          </div>,
          responsive: { xs: 24, md: 12 },
        },
      ] as IDynamicForm['formFields'];
      const onFinish = async (form: ITeamDto) => {
        setLoadingBtn(true);
        try {
          const data = await mutateAsync(form)
          //@ts-ignore
      openNotificationWithIcon('success','Başarılı bir şekilde kayıt oluşturdunuz.')
          setLoadingBtn(false);
        } catch (error) {
          //@ts-ignore
      openNotificationWithIcon('warning','Bir sorun oluştu')
          setLoadingBtn(false);
        }
      };
  return(
    <>
    {contextHolder}
        <div>
            Yeni Takımını Oluştur
            <DynamicForm
            form={form}
            formFields={formFieldsData}
            onFinish={onFinish}
            isEdit={true}
            btnSize="large"
            btnText="Takım Oluştur"
            btnIcon={<SaveOutlined />}
            isHiddenBtn={false}
          />
        </div>
    </>
  )
}

export default TeamCreate