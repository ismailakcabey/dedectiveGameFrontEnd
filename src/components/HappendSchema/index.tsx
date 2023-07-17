import { IExpression } from "../../models/expression";
import Flow from "../Flow/flow"

interface IProps {
    onChange?: (value: string, data: any) => void;
    value?: IExpression[];
  }
  

const HappendSchema = ({ onChange, value }: IProps) => {
    onChange
    return(
        <>
        <div>
        Olay Şeması
        </div>
        <Flow value={value}/>
        <div></div>
        </>
    )
}

export default HappendSchema