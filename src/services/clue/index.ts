import { APIS } from ".."
import { IClue, IClueDto, IClueResponse } from "../../models/clue"
import { useCreate, useDelete, useGet, useGetIdDedective, useGetList } from "../request"

export const useCreateClue = () => {
    return useCreate<IClueDto,IClue>(APIS.CLUE.CLUE)
}

export const useGetClue = (id:string) => {
    return useGetIdDedective<IClueResponse>("CLUE",APIS.CLUE.CLUEEVENT,id)
}

export const useDeleteClue = () => {
    return useDelete(APIS.CLUE.CLUE)
}