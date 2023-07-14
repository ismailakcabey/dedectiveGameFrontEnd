
export interface IEvent {
    createdAt:string,
    updatedAt:string,
    id:string;
    name:string;
    imageUrl:string;
    summary:string;
    news:string;
}


export interface IEventResponse {
    count:number;
    data:IEvent[]
}
