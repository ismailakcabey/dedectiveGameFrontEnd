import { APIS } from ".."
import { IExpression, IExpressionDto, IExpressionResponse } from "../../models/expression"
import { useCreate, useDelete, useGetIdDedective } from "../request"

export const useCreateExpression = () => {
    return useCreate<IExpressionDto,IExpression>(APIS.EXPRESSION.EXPRESSION)
}

export const useGetExpression = (id:string) => {
    return useGetIdDedective<IExpressionResponse>("EXPRESSION",APIS.EXPRESSION.EXPRESSIONEVENT,id)
}

export const useDeleteExpression = () => {
    return useDelete(APIS.EXPRESSION.EXPRESSION)
}