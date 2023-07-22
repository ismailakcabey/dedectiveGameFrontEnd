import { APIS } from ".."
import { IMessage, IMessageDto, IMessageResponse } from "../../models/message"
import { useCreate, useDelete, useGetIdDedective } from "../request"

export const useCreateMessage = () => {
    return useCreate<IMessageDto,IMessage>(APIS.MESSAGE.MESSAGE)
}

export const useGetMessage = (id:string) => {
    return useGetIdDedective<IMessageResponse>("MESSAGE",APIS.MESSAGE.MESSAGEEVENT,id)
}

export const useDeleteMessage = () => {
    return useDelete(APIS.MESSAGE.MESSAGE)
}