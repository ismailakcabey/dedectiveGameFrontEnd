import { useEffect, useState } from "react";
import { IClue } from "../../models/clue";
import { IExpression } from "../../models/expression";


interface IProps {
    onChange?: (value: string, data: any) => void;
    value?: IExpression[];
}

const ExpressionComponent = ({ onChange, value }: IProps) => {
    if (value == undefined || value === null) {
        return null
    }

    const [currentExpressionNumber, setCurrentExpressionNumber] = useState<number>(0)
    const [currentExpression, setCurrentExpression] = useState<IExpression>(value[currentExpressionNumber])

    const currentData = (data: IExpression) => {
        return [
            {
                text: "Kimlik Beyan Tipi",
                value: currentExpression.declaration
            },
            {
                text: "İfadenin alındığı tarih",
                value: `${new Date(currentExpression.expressionDate).getDate()}/${new Date(currentExpression.expressionDate).getMonth() + 1}/${new Date(currentExpression.expressionDate).getFullYear()}-${new Date(currentExpression.expressionDate).getHours()}:${new Date(currentExpression.expressionDate).getMinutes()}:${new Date(currentExpression.expressionDate).getSeconds()}`
            },
            {
                text: "İfadenin Alındığı yer",
                value: currentExpression.place
            },
            {
                text: "İfade Verenin Kimlik Numarası",
                value: currentExpression.identityNumber
            },
            {
                text: "İfade Verenin Anne Adı",
                value: currentExpression.motherName
            },
            {
                text: "İfade Verenin Baba Adı",
                value: currentExpression.fatherName
            },
            {
                text: "İfade Verenin Adı",
                value: currentExpression.personName
            },
            {
                text: "İfade Verenin Telefon Numarası",
                value: currentExpression.phoneNumber
            },
            {
                text: "İfade Verenin Doğum Yeri",
                value: currentExpression.placeOfBirth
            },
            {
                text: "İfade Verenin Medeni Durumu",
                value: currentExpression.martialStatus
            },
            {
                text: "İfade Verenin Eğitim Durumu",
                value: currentExpression.learnStatus
            },
            {
                text: "İfade",
                value: currentExpression.text
            },
        ]
    }
    useEffect(() => {
        console.log(currentExpression, currentExpressionNumber);
        setCurrentExpression(value[currentExpressionNumber]);
    }, [currentExpressionNumber, value]);
    const onClickPrev = () => {
        if (currentExpressionNumber > 0) {
            setCurrentExpressionNumber(currentExpressionNumber - 1);
            setCurrentExpression(value[currentExpressionNumber - 1]);
        }
    };

    const onClickNext = () => {
        if (currentExpressionNumber < value.length - 1) {
            setCurrentExpressionNumber(currentExpressionNumber + 1);
            setCurrentExpression(value[currentExpressionNumber + 1]);
        }
    };

    return (
      <>
      {
        (currentExpression == null || value.length==0) ? <>Vakaya ilişkin ifade bulunmamaktadır</> : <div className="flex justify-center">
        <div className="flex flex-wrap">
          {currentData(currentExpression).map((item: any, key: number) => (
            <div key={key} className="w-full md:w-1/2 p-4">
              <h2 className="text-lg font-bold mb-2">{item.text}</h2>
              <p className="text-sm">{item.value}</p>
            </div>
          ))}
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
            <div className="text-lg font-bold mx-3">{currentExpressionNumber+1}</div>
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

export default ExpressionComponent

