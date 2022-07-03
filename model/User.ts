export default class User{
    private _userName: string;
    private _userEmail: string;
    private _userPassWord: string;
    private _userAcount: string;
    private _userAge: number;

    constructor(_userAcount:string,_userPassWord:string,_userName:string,_userAge:number,_userEmail:string) {
        this._userAcount = _userAcount
        this._userPassWord = _userPassWord
        this._userName = _userName
        this._userAge = _userAge
        this._userEmail = _userEmail
    }

    get userAcount(): string{
        return this._userAcount
    }

    set userAcount(value: string){
        this._userAcount = value;
    }

    get userPassWord(): string{
        return this._userPassWord
    }

    set userPassWord(value: string){
        this._userPassWord = value;
    }

    get userName(): string{
        return this._userName 
    }

    set userName(value: string){
        this._userName = value;
    }

    get userAge(): number{
        return this._userAge
    }

    set userAge(value: number){
        this._userAge = value;
    }

    get userEmail(): string{
        return this._userEmail
    }

    set userEmail(value: string){
        this._userEmail = value;
    }

    public toString = (): string=>{
        return `${this.userAcount},${this.userPassWord},${this.userName},${this.userAge},${this.userEmail}`;
    }
}