import User from '../model/User';
import Menu from '../view/Menu';
import IOFile from '../IOFile'
import * as rl from 'readline-sync';

export default class AccountController{
    private listUser = new Array<User>();
    private fileUser = new IOFile();
    private PATH = "./data/user.txt"

    constructor(){
        this.init();
    }

    init(){
        let dataUser = this.fileUser.readFile(this.PATH)
        dataUser.forEach(e=>{
            let arr = e.split(",");
            this.listUser.push(new User(arr[0],arr[1],arr[2],parseInt(arr[3]),arr[4]));
        })
        let menu :string = `
        -----------------Menu-----------------
        1. Login
        2. Register
        3. exit
        ---------------------------------------
        `;
        console.log(menu);
        let temp : number = 0;
        let regex: RegExp = /^[1-3]$/;

        while(temp < 1 ||temp > 3){
            let chooseUser = rl.question("Choose your function:");
            if(regex.test(chooseUser)){
                temp = +(chooseUser)
            }else{
                temp = -1
            }

            if(temp < 1 || temp > 3){
                console.log("Please choose between 1 and 3")
            }
        }

        switch (temp) {
            case 1:
                this.login();
                break;
            case 2:
                this.register();
                break;
            case 3:
                return;
        }
    }

    login(){
        console.log("-----------------Login-----------------")
        let inputAccount = rl.question("Account:");
        let inputPassword = rl.question("Password:");
        let isLogin = this.listUser.some(e=>e.userAcount == inputAccount && e.userPassWord == inputPassword)
        if(isLogin){
            const theMenu = new Menu(inputAccount,inputPassword, this)
            theMenu.mainMenu()
        }else{
            console.log("Account or Password are wrong !");
        }
        // this.login()
        console.log("---------------------------------------")
    }

    register(){
        let isErrorRegister = true;
        let newAccount: string;
        let newPassword: string;
        let newName: string;
        let newAge: number;
        let newEmail: string;
        console.log("-----------------Register-----------------")

        while(isErrorRegister){
            newAccount = rl.question("Account:");
            newPassword = rl.question("Password:");
            newName = rl.question("Your Name:");
            newAge = parseInt(rl.question("Your Age:"));
            newEmail = rl.question("Your Email:");

            if(this.listUser.some(e=>e.userAcount == newAccount)){
                console.log("Account is already exist !\n");
            }else{
                isErrorRegister = false
            }
            
            if(!isErrorRegister){
                if(!this.validatePassWord(newPassword)){
                    console.log("Password must has minimum eight characters, at least one letter and one number !\n")
                    isErrorRegister = true;
                    continue
                }
        
                if(!this.validateEmail(newEmail)){
                    console.log("Invalid email !\n");
                    isErrorRegister = true;
                    continue
                }else{
                    if(this.listUser.some(e=>e.userEmail == newEmail)){
                        console.log("Email is already exist !\n");
                        isErrorRegister = true;
                        continue
                    }
                }
                this.listUser.push(new User(newAccount,newPassword,newName,newAge,newEmail))
                this.fileUser.writeFile(this.PATH,this.listUser)
                console.log("Create Account success !")
                break;
            }else{
                continue
            }
        }
        console.log("------------------------------------------")

        this.init()
    }
   
    public displayAllUsers(){
        console.table(this.listUser);
    }

    public deleteUsers(value: number){
        let index = value;
        this.listUser.splice(index,1)
        console.table(this.listUser);
    }
    
    public changePassword(Account: string,checkPassword: string){
        if(!this.validatePassWord(checkPassword)){
            console.log("Password must has minimum eight characters, at least one letter and one number !\n");
        }else{
            let newPassword = checkPassword
            this.listUser.forEach(e=>{
                if(e.userAcount == Account){
                    e.userPassWord = newPassword;
                }
            })
            console.log("-------------------Change password Success------------------------")

        }
    }

    validatePassWord(inputPassword : string){
        let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return regex.test(inputPassword);
    }

    validateEmail(inputEmail : string){
        let regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return regex.test(inputEmail);
    }
}

const test = new AccountController();