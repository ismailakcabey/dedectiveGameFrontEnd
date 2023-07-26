import { IDynamicForm } from "../../../models/common";
import { Form, Input, notification } from "antd";
import { ITeam, ITeamDto } from "../../../models/team";
import DynamicForm from "../../../components/DynamicForm";
import { SaveOutlined } from "@ant-design/icons";
import { usePatchTeam } from "../../../services/team";

interface IProps {
    team:ITeam
}


const TeamAction = ({ team }: IProps) => {
    const [form] = Form.useForm();
    console.log(team.id,team.name,"form içi");
    const { mutateAsync } = usePatchTeam(team.id)
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
        try {
         await mutateAsync(form)
          //@ts-ignore
      openNotificationWithIcon('success','Başarılı bir şekilde kayıt oluşturdunuz.')
        } catch (error) {
          //@ts-ignore
      openNotificationWithIcon('warning','Bir sorun oluştu')
        }
      };
  return(
    <>
    {contextHolder}
        <div>
            {team.name} Takımını Düzenle
            <DynamicForm
            form={form}
            formFields={formFieldsData}
            onFinish={onFinish}
            isEdit={true}
            btnSize="large"
            btnText="Takım Düzenle"
            btnIcon={<SaveOutlined />}
            isHiddenBtn={false}
          />
        </div>
    </>
  )
}

export default TeamAction