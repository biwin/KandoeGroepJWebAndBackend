/**
 * Created by Jan on 19/02/2016.
 */

export class Group {

    private _id: string;

    constructor(public _organisationId: string, public _name: string, public _description: string, public _users?:string[]) {

    }


}