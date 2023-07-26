import { IExpression } from "../../models/expression";


interface IProps {
  value?: IExpression;
}

const ExpressionComponentSingle = ({ value }: IProps) => {
  if (value == undefined || value === null) {
    return null
  }

  const currentData = (data: IExpression) => {
    data
    return [
      {
        text: "İfade Verenin Adı",
        value: value.personName
      },
      {
        text: "Kimlik Beyan Tipi",
        value: value.declaration
      },
      {
        text: "İfadenin alındığı tarih",
        value: `${new Date(value.expressionDate).getDate()}/${new Date(value.expressionDate).getMonth() + 1}/${new Date(value.expressionDate).getFullYear()}-${new Date(value.expressionDate).getHours()}:${new Date(value.expressionDate).getMinutes()}:${new Date(value.expressionDate).getSeconds()}`
      },
      {
        text: "İfadenin Alındığı yer",
        value: value.place
      },
      {
        text: "İfade Verenin Kimlik Numarası",
        value: value.identityNumber
      },
      {
        text: "İfade Verenin Anne Adı",
        value: value.motherName
      },
      {
        text: "İfade Verenin Baba Adı",
        value: value.fatherName
      },
      {
        text: "İfade Verenin Telefon Numarası",
        value: value.phoneNumber
      },
      {
        text: "İfade Verenin Doğum Yeri",
        value: value.placeOfBirth
      },
      {
        text: "İfade Verenin Medeni Durumu",
        value: value.martialStatus
      },
      {
        text: "İfade Verenin Eğitim Durumu",
        value: value.learnStatus
      },
      {
        text: "İfade",
        value: value.text
      },
    ]
  }

  const getRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 6); // 0 ile 5 arasında bir rastgele sayı oluşturur
    return randomNumber;
  };

  return (
    <>
      {
        (value == null) ? <>Vakaya ilişkin ifade bulunmamaktadır</> : <div className="flex justify-center">
          <div className="flex flex-wrap w-full md:w-5/12 lg:w-7/12 p-4 max-w-screen-xl mx-auto">
            <div className="w-full md:w-1/2 p-4">
              <h2 className="text-lg font-bold mb-1">İfade verenin fotoğrafı</h2>
              <img className="rounded-t-lg" style={{ width: "40%" }} src={`../../src/assets/expression/images${getRandomNumber()}.jpeg`} alt="" />
            </div>
            {currentData(value).map((item: any, key: number) => (
              <div key={key} className="w-full md:w-1/2 p-4">
                <h2 className="text-lg font-bold mb-2">{item.text}</h2>
                <p className="text-sm">{item.value}</p>
              </div>
            ))}
          </div>

        </div>
      }
    </>


  )
}

export default ExpressionComponentSingle

