import * as rl from 'readline-sync'
import MachineController from '../controllers/MachineController'
import AccountController from '../controllers/AccountController';

export default class Menu{
    private controller: MachineController
    private _MyAccount: string;
    private _MyPassword: string;
    private _AccountController: AccountController;

    constructor(_MyAccount: string, _MyPassword: string, _AccountController: AccountController){
        this.controller = new MachineController()
        this._MyAccount = _MyAccount
        this._MyPassword = _MyPassword
        this._AccountController = _AccountController
    }

    public handleService(): void{
        let index = parseInt(rl.question("Choose a index you want add service :"));
        if(index > this.controller.arrMachineLength - 1){
            console.log("Does not exist index !")
            console.log("\n----------------------Add service fall !-----------------------");
        }else{
            let str = `
        --------------------------------
        1. CoCa : 10k
        2. Sting : 10k
        3. Mỳ tôm : 5k
        4. Combo mỳ tôm + sting : 12k
        --------------------------------
        `
        console.log(str)
        let n: number = 0;
        while(n<1 || n>4){
            n = +(rl.question("Choose your number: "));
            if(n<1 || n>4){
                console.log("Please select a number 1 to 4 !")
            }
        }
        switch(n){
            case 1:
                this.controller.addService(index,10000);
                break;
            case 2:
                this.controller.addService(index,10000);
                break;
            case 3: 
                this.controller.addService(index,5000);
                break;
            case 4:
                this.controller.addService(index,12000);
                break;
        }
        this.controller.displayMachines();
        console.log("\n----------------------Add service successfully !-----------------------");
    }
    }

    public mainMenu(){
        let index: number;
        let menu: string = `
         ------------------Menu-------------
        1. Show all machine
        2. Add machine
        3. Update machine
        4. Delete machine
        5. Add service
        6. Change money/hour
        7. Total money each machine
        8. Account management
        9. Total revenue
        10. Find machine
        11. Sorting machine by name
        12. Exit
        --------------------------------------
        `
        console.log(menu)
        let n: number = 0;
        while(n<1 || n>12){
            n = +(rl.question("Choose your number: "));
            if(n<1 || n>12){
                console.log("Please select a number 1 to 10 !")
            }
        }

        switch (n) {
            case 1:
                let str = `
                1. Show all machine available
                2. Show all machines disable
                3. Show all machines
                `
                console.log(str);
                let a: number;
                a = +(rl.question("Choose a number:"))
                switch (a) {
                    case 1: 
                        this.controller.displayMachineAvailable();
                        break;
                    case 2: 
                        this.controller.displayMachineDisable();
                        break;
                    case 3:
                        this.controller.displayMachines();
                        break;
                }
                console.log("\n--------------------Display machine successfully !---------------------");
                break;
            case 2:
                this.controller.addMachine()
                console.log("\n----------------------Add machine successfully !-----------------------");
                break;
            case 3:
                this.controller.displayMachines();
                index = parseInt(rl.question("Choose a index you want update :"));
                if(index > this.controller.arrMachineLength - 1){
                    console.log("Does not exist index !")
                }else{
                    this.controller.updateMachine(index);
                    console.log("\n----------------------Update machine successfully !-----------------------");
                }
                break;
            case 4:
                this.controller.displayMachines();
                index = parseInt(rl.question("Choose a index you want delete :"));
                if(index > this.controller.arrMachineLength - 1){
                    console.log("Does not exist index !")
                }else{
                    let a: number;
                    let str = `
                        Do you really want to delete this machine
                        1. Yes
                        2. No 
                    `
                    console.log(str)
                    a = +(rl.question("Choose your answer :"))
                    if(a == 1){
                        this.controller.deleteMachine(index);
                        console.log("\n----------------------Delete machine successfully !-----------------------");
                    }
                }
                break;
            case 5:
                this.controller.displayMachines();
                this.handleService()
                break;
            case 6:
                let n6 = +(rl.question("Choose your money you want for each hour: "));
                this.controller.moneyPerHour = n6;
                console.log("\n----------------------Change money/hour successfully!-----------------------");
                break;
            case 7:
                let str7 = `
                    --------------------------------
                    1. Bill
                    2. More Service
                    --------------------------------
                    `
                console.log(str7)
                let a7 = +(rl.question("Choose your number: "));
                switch(a7){
                    case 1:
                        this.controller.totalMoneyMachineAvailable();
                        this.controller.displayMachineAvailable()
                        n = +(rl.question("Choose your machine you want bill: "));
                        this.controller.billMachineAvailable(n);
                        this.controller.displayMachines()
                        break;
                    case 2:
                        this.controller.displayMachines();
                        this.handleService();
                        this.controller.displayMachines();
                        break;
                }
                break;
            case 8:
                let str8 = `
                    --------------------------------
                    1. Show all Account
                    2. Delete Account
                    3. Change password Account
                    --------------------------------
                    `
                console.log(str8)
                let a8 = +(rl.question("Choose your number: "));
                switch(a8){
                    case 1:
                        this._AccountController.displayAllUsers();
                        break;
                    case 2:
                        this._AccountController.displayAllUsers();
                        index = +(rl.question("Select your index Account you want delete: "))
                        let str = `
                        Do you really want to delete this Users
                            1. Yes
                            2. No 
                        `
                        console.log(str)
                        let b = +(rl.question("Choose your answer :"))
                        if(b == 1){
                            this._AccountController.deleteUsers(index,this._MyAccount);
                        }
                        break;    
                    case 3:
                        let currentPassword = rl.question("Current password:");
                        let newPassword1 = rl.question("Your new password :");
                        let newPassword2 = rl.question("Your new password again:");
                        if(newPassword1 === newPassword2 && currentPassword === this._MyPassword){
                            this._AccountController.changePassword(this._MyAccount,newPassword1)
                        }
                        break;
                }
                break;
            case 9:
                console.log("Total revenue:" + this.controller.sumRevenue() );
                console.log("\n----------------------Total revenue !-----------------------");
                break;
            case 10:
                let findMachine = rl.question("Enter your name machine you need find:");
                this.controller.findMachine(findMachine);
                break;
            case 11:
                this.controller.sortMachineByName();
                this.controller.displayMachines();
                console.log("\n----------------------Sorting Success !-----------------------");
                break;    
            case 12:
                console.log("Thank iuu for using !!");
                return;    
        }
        this.mainMenu()
    }
}  