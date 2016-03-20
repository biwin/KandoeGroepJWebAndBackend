import {PipeTransform, Pipe} from "angular2/core";

import {CardPosition} from "../../backend/model/cardPosition";

/**
 * Pipe that will force that only cards that are on the board will be drawn
 */
@Pipe({
    name: 'onBoardCards'
})
export class CircleSessionCardOnBoardPipe implements PipeTransform {
    transform(input: CardPosition[], args: any[]): CardPosition[] {
        return input.filter((c: CardPosition) => {
            return c._position > 0 && c._position <= 5;
        });
    }
}