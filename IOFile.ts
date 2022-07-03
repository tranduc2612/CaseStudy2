import * as fs from 'fs';
import Machine from './model/Machine';
import User from './model/User';

export default class IOFile{
    public readFile(path: string){
        let data = fs.readFileSync(path);
        return data.toString().split('\r\n')
    }

    public writeFile(path:string,data: Array<User> | Array<Machine>){
        let str = ""
        data.forEach((e,index)=>{
            if(index == data.length - 1){
                str += e.toString()
            }else{
                str += e.toString() + "\r\n"
            }
        })
        fs.writeFileSync(path,str);
    }
}





