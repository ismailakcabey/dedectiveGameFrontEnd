import { useState } from "react";
import { IClue } from "../../models/clue";

interface IProps {
    onChange?: (value: string, data: any) => void;
    value?: IClue[];
}

const ClueComponent = ({ onChange, value }: IProps) => {
    onChange
    if (value == undefined || value === null) {
        return null
    }
    const getRandomNumber = () => {
        const randomNumber = Math.floor(Math.random() * 6); // 0 ile 5 arasında bir rastgele sayı oluşturur
        return randomNumber;
      };
      console.log(value)
      const [currentClueNumber, setCurrentClueNumber] = useState<number>(0)
  const [currentClue, setCurrentClue] = useState<IClue>(value[currentClueNumber])
  const onClickPrev = () => {
    if (currentClueNumber > 0) {
        setCurrentClueNumber(currentClueNumber - 1);
        setCurrentClue(value[currentClueNumber - 1]);
    }
  };
  const onClickNext = () => {
    if (currentClueNumber < value.length - 1) {
        setCurrentClueNumber(currentClueNumber + 1);
        setCurrentClue(value[currentClueNumber + 1]);
    }
  };
    return(
        <>
        {
        (value == null || value.length == 0) ? <>Vakaya ilişkin ipucu bulunmamaktadır</> : <div className="flex justify-center">
            <div className="flex flex-wrap">
            <div className="w-full md:w-1/1 p-4">
              <h2 className="text-lg font-bold mb-1">İpucuna ait fotoğraf</h2>
              <img className="rounded-t-lg" style={{ width: "100%" }} src={`../../src/assets/clue/images${getRandomNumber()}.jpeg`} alt="" />
            </div>
            <div  className="w-full md:w-1/1 p-4">
                <h1 className="text-lg font-bold mb-2">İpucu Adı</h1>
                <h2 className="text-m">{currentClue.name}</h2>
              </div>
              <div  className="w-full md:w-1/1 p-4">
                <h1 className="text-lg font-bold mb-2">İpucu Metni</h1>
                <h2 className="text-m">{currentClue.text}</h2>
              </div>
         </div>
         <nav className="flex justify-center fixed bottom-5 w-full">
            <div className="flex items-center">
              <button onClick={onClickPrev}>
                <a className="flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg
                    className="w-3.5 h-3.5 mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 5H1m0 0 4 4M1 5l4-4"
                    />
                  </svg>
                  Previous
                </a>
              </button>
              <div className="text-lg font-bold mx-3">{currentClueNumber + 1}</div>
              <button onClick={onClickNext}>
                <a className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  Next
                  <svg
                    className="w-3.5 h-3.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </button>
            </div>
          </nav>
        </div>
      }
        </>
    )
}

export default ClueComponent

