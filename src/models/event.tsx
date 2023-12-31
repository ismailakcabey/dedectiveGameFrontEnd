
export interface IEvent {
    createdAt:string,
    updatedAt:string,
    id:string;
    name:string;
    imageUrl:string;
    summary:string;
    news:string;
    realHistory:string;
}


export interface IEventResponse {
    count:number;
    data:IEvent[]
}


export interface IEventDto {
    name:string;
    summary:string;
    news:string;
    realHistory:string;
    imageBase64:string;
}