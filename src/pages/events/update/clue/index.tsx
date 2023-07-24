import { Button, Form, Input, Modal, Popover, Upload, UploadProps, message } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUpdateEvent } from "../../../../services/event";
import { SaveOutlined, TabletOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import { IDynamicForm } from "../../../../models/common";
import { IClue, IClueDto } from "../../../../models/clue";
import DynamicForm from "../../../../components/DynamicForm";
import { useCreateClue, useDeleteClue, useGetClue } from "../../../../services/clue";
import TextArea from "antd/es/input/TextArea";
import ClueComponentSingle from "../../../../components/Clue/clueSingle";

const ClueUpdate = () => {
  const { id } = useParams();
  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  //@ts-ignore
  const { mutateAsync } = useCreateClue()
  //@ts-ignore
  const { data: clueData, refetch, isLoading } = useGetClue(id);
  const { mutateAsync: itemDeleteClue } = useDeleteClue();
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
  const deleteItem = async (item: any) => {
    await itemDeleteClue(item.id!);
    refetch()
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const formFieldsData = [
    {
      label: '',
      name: 'name',
      rules: [{ required: true, message: "Lütfen olaya ait ipucunun adını giriniz" }],
      component: <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">İpucu Adı</label>
        <Input
          style={{ marginBottom: "8px" }}
          placeholder="ipucu adı giriniz"
          prefix={<UserOutlined />} />
      </div>,
      responsive: { xs: 24, md: 12 },
    },
    {
      label: '',
      name: 'text',
      rules: [{ required: true, message: "Lütfen olaya ait ipucunun metnini giriniz" }],
      component: <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">İpucu Metni</label>
        <TextArea
          style={{ marginBottom: "8px" }}
          placeholder="ipucu metni giriniz" />
      </div>,
      responsive: { xs: 24, md: 12 },
    },
    {
      label: '',
      name: 'event',
    },
    {
      label: '',
      name: 'imageBase64',
      rules: [{ required: false, message: "Lütfen olayın görselini giriniz" }],
      component: <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Olay Görseli</label>
        <Upload {...props}>
          <Button icon={<UploadOutlined />} style={{ color: "white" }}>Click to Upload</Button>
        </Upload>
      </div>,
      responsive: { xs: 24, md: 12 },
    },
  ] as IDynamicForm['formFields'];
  const onFinish = async (form: IClueDto) => {
    setLoadingBtn(true);
    try {
      //@ts-ignore
      form.event = parseInt(id)
      const result = await mutateAsync(form)
      refetch()
      setLoadingBtn(false);
    } catch (error) {
      setLoadingBtn(false);
    }
  };
  return (
    <div>
      <DynamicForm
        form={form}
        formFields={formFieldsData}
        onFinish={onFinish}
        isEdit={false}
        btnSize="large"
        btnText="İpucu Ekle"
        btnIcon={<SaveOutlined />}
        isHiddenBtn={false}
      />
      <table className="w-full mx-auto text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-3 py-3">
              İpucu Adı
            </th>
            <th scope="col" className="px-3 py-3">
              İpucu Detayı
            </th>
          </tr>
        </thead>
        <tbody>
          {
            //@ts-ignore
            clueData?.map((item: IClue) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="px-3 py-4">
                    <Modal width={"60%"} style={{maxHeight:"70%",overflowY:"auto"}} title={item.name} open={isModalOpen} onCancel={handleCancel}>
                        <ClueComponentSingle value={item} />
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
                    <button type="button" onClick={() => {
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

export default ClueUpdate