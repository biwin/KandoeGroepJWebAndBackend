import {Card} from "./card";

/**
 * Class that gives a simple model to combine a card with a boolean for when it's in play or not
 */
export class CircleSessionCardWrapper {
    constructor(public card:Card, 
                public inPlay:boolean) {}
}
