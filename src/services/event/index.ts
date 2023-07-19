import { APIS } from ".."
import { IEvent, IEventDto, IEventResponse } from "../../models/event"
import { IReport } from "../../models/report"
import { useCreate, useGetIdDedective, useGetList, usePatch } from "../request"

export const useGetEvent = (params:any) => {
    return useGetList<IEventResponse>("EVENT",APIS.EVENT.EVENT,params)
}

export const useGetEventId = (id:string) => {
    return useGetIdDedective<IReport>("EVENTID",APIS.REPORT.REPORT,id)
}

export const useCreateEvent = () => {
    return useCreate<IEventDto,IEvent>(APIS.EVENT.EVENT)
}

export const useUpdateEvent = (id:string) => {
    return usePatch(APIS.EVENT.EVENT+"/"+id)
}