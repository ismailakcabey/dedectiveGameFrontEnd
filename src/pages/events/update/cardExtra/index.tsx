import { Form, Input, notification } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateCardExtra, useDeleteCardExtra, useGetCardExtra } from "../../../../services/cardExtra";
import { SaveOutlined, UserOutlined } from "@ant-design/icons";
import { IDynamicForm } from "../../../../models/common";
import { ICard, ICardDto } from "../../../../models/card";
import DynamicForm from "../../../../components/DynamicForm";

const CardExtraUpdate = () => {
    const { id } = useParams();
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
    const [form] = Form.useForm();
    //@ts-ignore
    const { mutateAsync } = useCreateCardExtra()
    //@ts-ignore
    const { data: cardExtraData, refetch,isLoading } = useGetCardExtra(id);
    const { mutateAsync: itemDeleteClue } = useDeleteCardExtra();
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: Notification,desc:string) => {
      //@ts-ignore
      api[type]({
        message: 'Bildirim',
        description:
          desc,
      });
    };
    const deleteItem = async (item:any) => {
        await itemDeleteClue(item.id!);
        //@ts-ignore
        openNotificationWithIcon('success','Başarılı bir şekilde kayıt güncellediniz')
        refetch()
      }
      useEffect(()=>{
      },[setLoadingBtn,loadingBtn])
      const formFieldsData = [
        {
          label: '',
          name: 'payer',
          rules: [{ required: true, message: "Lütfen harcamanın adını giriniz" }],
          component: <div>
             <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harcama Adı</label>
            <Input
              style={{ marginBottom: "8px" }}
              placeholder="harcama yapanın adını giriniz"
              prefix={<UserOutlined />} />
          </div>,
          responsive: { xs: 24, md: 12 },
        },
        {
            label: '',
            name: 'product',
            rules: [{ required: true, message: "Lütfen alınan ürünün adını giriniz" }],
            component: <div>
               <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ürün Adı</label>
              <Input
                style={{ marginBottom: "8px" }}
                placeholder="ürünün adını giriniz"
                prefix={<UserOutlined />} />
            </div>,
            responsive: { xs: 24, md: 12 },
          },
          {
            label: '',
            name: 'price',
            rules: [{ required: true, message: "Lütfen ürünün fiyatını giriniz" }],
            component: <div>
               <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ürün Fiyatı</label>
              <Input
                type="number"
                style={{ marginBottom: "8px" }}
                placeholder="ürünün fiyatını giriniz"
                prefix={<UserOutlined />} />
            </div>,
            responsive: { xs: 24, md: 12 },
          },
      ] as IDynamicForm['formFields'];
      const onFinish = async (form: ICardDto) => {
        setLoadingBtn(true);
        try {
            //@ts-ignore
            form.event = parseInt(id)
            //@ts-ignore
            form.price = parseInt(form.price)
           await mutateAsync(form)
          //@ts-ignore
        openNotificationWithIcon('success','Başarılı bir şekilde kayıt güncellediniz')
          refetch()
          setLoadingBtn(false);
        } catch (error) {
          //@ts-ignore
        openNotificationWithIcon('error','Bir sorun oluştu')
          setLoadingBtn(false);
        }
      };
      return(
        <div>
          {contextHolder}
        <DynamicForm
        form={form}
        formFields={formFieldsData}
        onFinish={onFinish}
        isEdit={false}
        btnSize="large"
        btnText="Kart Ektresi Ekle"
        btnIcon={<SaveOutlined />}
        isHiddenBtn={false}
      />
     <table className="w-full mx-auto text-sm text-left text-gray-500 dark:text-gray-400">
<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
<tr>
  <th scope="col" className="px-3 py-3">
    Harcama Yapanın Adı
  </th>
  <th scope="col" className="px-3 py-3">
    Alının Ürünün Adı
  </th>
  <th scope="col" className="px-3 py-3">
    Alının Ürünün Fiyatı
  </th>
  <th scope="col" className="px-3 py-3">
    
  </th>
</tr>
</thead>
<tbody>
{
//@ts-ignore
cardExtraData?.map((item: ICard) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
      <th
        scope="row"
        className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {item.payer}
      </th>
      <th
        scope="row"
        className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {item.product}
      </th>
      <th
        scope="row"
        className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {item.price}
      </th>
      <td className="px-3 py-4">
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

export default CardExtraUpdate