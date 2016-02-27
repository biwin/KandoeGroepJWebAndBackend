export class User {
    public _id: string;
    public _organisatorOf: string[] = [];
    public _memberOf: string[] = [];

    constructor(public _name: string,
                public _email: string,
                public _password: string) {

    }

    public static empty(): User{
        return new User("", "", "");
    }
}