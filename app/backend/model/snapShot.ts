import {SnapshotCardWrapper} from "./snapshotCardWrapper";
import {ChatMessage} from "./chatMessage";

export class Snapshot {
    public _id:string;

    constructor(public _creatorId:string, 
                public _gameName:string, 
                public _playerNames:string[], 
                public _cards:SnapshotCardWrapper[], 
                public _chat:ChatMessage[], 
                public _timestamp:string) {
    }

    public static empty():Snapshot{
        return new Snapshot("","",[],[],[],"");
    }
}