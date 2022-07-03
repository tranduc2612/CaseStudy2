import Machine from "../model/Machine";
import IOFile from "../IOFile"
import * as rl from 'readline-sync'

export default class MachineController{
    private arrMachine = new Array<Machine>()
    private fileMachine = new IOFile()
    private _moneyPerHour :number = 5000;
    private PATH = './data/machine.txt'

    constructor(){
        let dataMachine = this.fileMachine.readFile(this.PATH)
        dataMachine.forEach(e=>{
            let arr = e.split(",");
            this.arrMachine.push(new Machine(arr[0],arr[1],parseInt(arr[2]),parseInt(arr[3])));
        })
    }

    set moneyPerHour(value: number){
        this._moneyPerHour = value
    }
    
    public addMachine(): void{
        let inputNameMachine = rl.question("Machine name: ");
        let inputStatusMachine = rl.question("Machine status: ");
        let inputTimeUsed = parseInt(rl.question("Machine time use:"));
        let newMachine = new Machine(inputNameMachine,inputStatusMachine,inputTimeUsed,0);
        this.arrMachine.push(newMachine);
        this.fileMachine.writeFile(this.PATH,this.arrMachine)
    }

    public displayMachines(): void{
        console.table(this.arrMachine);
    }

    public updateMachine(value: number) : void{
        let indexInput = value;
        if(this.arrMachine.findIndex((e,index)=>indexInput == index) != -1){
            let newName = rl.question("Update machine name: ");
            let newStatus = rl.question("Update machine status: ");
            let newTimeUsed = parseInt(rl.question("Update machine time use: "));
            this.arrMachine[indexInput] = new Machine(newName,newStatus,newTimeUsed,0)
            this.fileMachine.writeFile(this.PATH,this.arrMachine)
            console.log("----------------Update Success---------------")
            this.displayMachines()
        }else{
            console.log("Error index !")
        }
    }

    public deleteMachine(value: number){
        let index = value;
        this.arrMachine.splice(index,1)
        this.fileMachine.writeFile(this.PATH,this.arrMachine)
        console.table(this.arrMachine);
    }

    public addService(index:number,price: number){
        let indexInput = index;
        if(this.arrMachine.findIndex((e,index)=>indexInput == index) != -1){
            this.arrMachine[indexInput].totalMoney += price;
            this.fileMachine.writeFile(this.PATH,this.arrMachine)
            console.table(this.arrMachine)
        }else{
            console.log("Error index !")
        }
    }

    public totalMoneyMachineAvailable(){
        this.arrMachine.forEach(e=>{
            let str = e.statusMachine.toLowerCase();
            if(str == "available"){
                e.totalMoney = e.timeUsed*this._moneyPerHour
            }
        })
        
    }

    public billMachineAvailable(index: number){
        let newArr = this.arrMachine.filter(e=>{
            let str = e.statusMachine.toLowerCase();
            return str == "available"
        })
        newArr[index].statusMachine = "disable"
        newArr[index].totalMoney = 0
        newArr[index].timeUsed = 0 
    }


    public displayMachineAvailable(){
        let count = 0;
        let newArr = this.arrMachine.filter(e=>{
            let str = e.statusMachine.toLowerCase();
            count++;
            return str == "available"
        })
        if(count != 0){
            console.table(newArr)
        }else{
            console.log("No machines available !")
        }
    }

    public sumRevenue(): number {
        let sum = 0;
        this.arrMachine.forEach(e=>{
            sum += e.totalMoney
        })

        return sum
    }

    public displayMachineDisable(){
        let count = 0;
        let newArr = this.arrMachine.filter(e=>{
            let str = e.statusMachine.toLowerCase();
            count++;
            return str == "disable"
        })
        if(count == 0){
            console.log("No machine disable !")
        }else{
            console.table(newArr)
        }
    }

    get arrMachineLength(){
        return this.arrMachine.length
    }
    
}