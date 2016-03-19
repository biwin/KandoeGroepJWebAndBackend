/**
 * Class that gives a simple model to gain the needed information of a card and it's position in a game.
 * Used for snapshots. Full name and position are saved. 
 * References would be lost as cards and games can be removed whereas snapshots should be able to keep existing.
 */
export class SnapshotCardWrapper {
    constructor (public _cardName:string, 
                 public _position:number, 
                 public _userHistory:string[]){}
}