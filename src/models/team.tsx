import { IUser } from "./user";

export interface ITeam{
    id:string,
    name:string,
    users:IUser[]
}

export interface ITeamResponse {
    data: ITeam[],
    count:number
}

export interface ITeamDto{
    name:string
}

export interface IJoinDto{
    id:string
}