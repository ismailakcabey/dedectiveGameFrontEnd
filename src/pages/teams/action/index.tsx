import { useState } from "react";
import { IDynamicForm } from "../../../models/common";
import { Form, Input } from "antd";
import { ITeamDto } from "../../../models/team";
import DynamicForm from "../../../components/DynamicForm";
import { SaveOutlined } from "@ant-design/icons";

interface IProps {
    name:string,
    isEdit:boolean
}


const TeamAction = ({ name, isEdit }: IProps) => {
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
    const [form] = Form.useForm();
    console.log(name, isEdit,"form içi");
    const formFieldsData = [
        {
          label: '',
          name: 'name',
          rules: [{ required: true, message: "Lütfen takım adını giriniz" }],
          component: <div>
             <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Takım Adı</label>
            <Input
                defaultValue={name}
              style={{ marginBottom: "8px" }}
              placeholder="Takım adını giriniz"/>
          </div>,
          responsive: { xs: 24, md: 12 },
        },
      ] as IDynamicForm['formFields'];
      const onFinish = async (form: ITeamDto) => {
        setLoadingBtn(true);
        try {
          setLoadingBtn(false);
        } catch (error) {
          setLoadingBtn(false);
        }
      };
  return(
    <>
        <div>
            Takım {(isEdit)?<>Düzenle</>:<>Oluştur</>}
            <DynamicForm
            form={form}
            formFields={formFieldsData}
            onFinish={onFinish}
            isEdit={isEdit}
            btnSize="large"
            btnText="Takım Oluştur"
            btnIcon={<SaveOutlined />}
            isHiddenBtn={false}
          />
        </div>
    </>
  )
}

export default TeamAction