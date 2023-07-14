import { APIS } from ".."
import { IEventResponse } from "../../models/event"
import { useGetDedective, useGetList } from "../request"

export const useGetEvent = (params:any) => {
    return useGetList<IEventResponse>("EVENT",APIS.EVENT.EVENT,params)
}