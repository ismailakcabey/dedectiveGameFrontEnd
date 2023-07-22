import { useState } from "react";
import { IClue } from "../../models/clue";

interface IProps {
    value?: IClue;
}

const ClueComponentSingle = ({ value }: IProps) => {
    if (value == undefined || value === null) {
        return null
    }
    const getRandomNumber = () => {
        const randomNumber = Math.floor(Math.random() * 6); // 0 ile 5 arasında bir rastgele sayı oluşturur
        return randomNumber;
      };
    return(
        <>
        {
        (value == null) ? <>Vakaya ilişkin ipucu bulunmamaktadır</> : <div className="flex justify-center">
            <div className="flex flex-wrap w-full md:w-5/12 lg:w-7/12 p-4 max-w-screen-xl mx-auto">
            <div className="w-full md:w-1/2 p-4">
              <h2 className="text-lg font-bold mb-1">İpucuna ait fotoğraf</h2>
              <img className="rounded-t-lg" style={{ width: "40%" }} src={`../../src/assets/clue/images${getRandomNumber()}.jpeg`} alt="" />
            </div>
            <div  className="w-full md:w-1/2 p-4">
                <h1 className="text-lg font-bold mb-2">İpucu Adı</h1>
                <h2 className="text-m">{value.name}</h2>
              </div>
              <div  className="w-full md:w-1/2 p-4">
                <h1 className="text-lg font-bold mb-2">İpucu Metni</h1>
                <h2 className="text-sm">{value.text}</h2>
              </div>
         </div>
        </div>
      }
        </>
    )
}

export default ClueComponentSingle

