import { useEffect, useState } from "react";
import { ICard } from "../../models/card";

interface IProps {
    onChange?: (value: string, data: any) => void;
    value?: ICard[];
}

const CardExtreComponent = ({ onChange, value }: IProps) => {
    return (
        <>
        {
          (value == null||value.length == 0) ? <>Vakaya ilişkin Kart Ektreleri bulunmamaktadır</> : <div className="flex justify-center">
          <div className="flex flex-wrap">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Ürünü Alan Kişi
                </th>
                <th scope="col" className="px-6 py-3">
                    Ürünün Adı
                </th>
                <th scope="col" className="px-6 py-3">
                    Ürünün Fiyatı
                </th>
            </tr>
        </thead>
        <tbody>
            {value.map((item:ICard)=>{
                return(
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.payer}
                </th>
                <td className="px-6 py-4">
                    {item.product}
                </td>
                <td className="px-6 py-4">
                    {item.price}
                </td>
            </tr>
                )
            })
            }
        </tbody>
    </table>
</div>
          </div>
        
        </div>
        }
        </>
          
  
      )

}

export default CardExtreComponent