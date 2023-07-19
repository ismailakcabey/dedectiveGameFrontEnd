import { APIS } from ".."
import { ICard, ICardDto, ICardResponse } from "../../models/card"
import { useCreate, useDelete, useGetIdDedective } from "../request"

export const useCreateCardExtra = () => {
    return useCreate<ICardDto,ICard>(APIS.CARD.CARD)
}

export const useGetCardExtra = (id:string) => {
    return useGetIdDedective<ICardResponse>("CARD",APIS.CARD.CARDEVENT,id)
}

export const useDeleteCardExtra = () => {
    return useDelete(APIS.CARD.CARD)
}