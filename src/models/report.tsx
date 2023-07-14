import { ICard } from "./card";
import { IClue } from "./clue";
import { IEvent } from "./event";
import { IExpression } from "./expression";
import { IMessage } from "./message";

export interface IReport{
    event:IEvent,
    clue:IClue[];
    cardExtra:ICard[];
    expression:IExpression[];
    message:IMessage[]
}