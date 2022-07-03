export default class Machine{
    private _statusMachine: string;
    private _nameMachine: string;
    private _totalMoney: number;
    private _timeUsed: number;

    constructor(_nameMachine: string, _statusMachine: string,_timeUsed:number ,_totalMoney: number){
        this._nameMachine = _nameMachine;
        this._statusMachine = _statusMachine;
        this._timeUsed = _timeUsed;
        this._totalMoney = _totalMoney;
    }

    get nameMachine(){
        return this._nameMachine
    }

    set nameMachine(value: string){
        this._nameMachine = value
    }

    get statusMachine(){
        return this._statusMachine
    }

    set statusMachine(value: string){
        this._statusMachine = value
    }

    get totalMoney(){
        return this._totalMoney
    }

    set totalMoney(value: number){
        this._totalMoney = value
    }

    get timeUsed(){
        return this._timeUsed
    }

    set timeUsed(value: number){
        this._timeUsed = value
    }

    public toString = (): string=>{
        return `${this._nameMachine},${this._statusMachine},${this._timeUsed},${this._totalMoney}`;
    }
}