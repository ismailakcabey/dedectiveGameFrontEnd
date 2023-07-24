import { APIS } from ".."
import { IJoinDto, ITeam, ITeamDto, ITeamResponse } from "../../models/team"
import { useCreate, useGetList } from "../request"


export const useGetTeam = (params:any) => {
    return useGetList<ITeamResponse>("TEAM",APIS.TEAMS.TEAMS,params)
}

export const useCreateTeam = () => {
    return useCreate<ITeamDto,ITeam>(APIS.TEAMS.TEAMS)
}

export const useJoinTeam = () => {
    return useCreate<IJoinDto,boolean>(APIS.TEAMS.JOIN)
}