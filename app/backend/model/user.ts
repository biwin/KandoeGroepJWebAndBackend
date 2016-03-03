export class User {
    public _id: string;
    public _organisatorOf: string[] = [];
    public _memberOf: string[] = [];
    public _facebookId: string;
    public _pictureSmall: string;
    public _pictureLarge: string;

    constructor(public _name: string, public _email: string, public _password: string, public _registrar: string) {

    }

    public static empty(): User{
        return new User("", "", "", "");
    }
}