import { APIS } from ".."
import { IJoinDto, ITeam, ITeamDto, ITeamResponse } from "../../models/team"
import { useCreate, useGetList, usePatch } from "../request"


export const useGetTeam = (params:any) => {
    return useGetList<ITeamResponse>("TEAM",APIS.TEAMS.TEAMS,params)
}

export const useGetJoinTeam = () => {
    return useGetList<ITeam[]>("TEAMJOIN",APIS.TEAMS.IN)
}

export const useCreateTeam = () => {
    return useCreate<ITeamDto,ITeam>(APIS.TEAMS.TEAMS)
}

export const useJoinTeam = () => {
    return useCreate<IJoinDto,boolean>(APIS.TEAMS.JOIN)
}

export const usePatchTeam = <T>(id:string) => {
    return usePatch<T>(APIS.TEAMS.TEAMS+"/"+id)
}