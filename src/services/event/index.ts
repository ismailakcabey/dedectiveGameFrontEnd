import { APIS } from ".."
import { IEvent, IEventResponse } from "../../models/event"
import { IReport } from "../../models/report"
import { useGetDedective, useGetIdDedective, useGetList } from "../request"

export const useGetEvent = (params:any) => {
    return useGetList<IEventResponse>("EVENT",APIS.EVENT.EVENT,params)
}

export const useGetEventId = (id:string) => {
    return useGetIdDedective<IReport>("EVENTID",APIS.REPORT.REPORT,id)
}