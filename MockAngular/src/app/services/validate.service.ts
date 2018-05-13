import { Injectable } from '@angular/core';

@Injectable()

export class ValidateService {
    private  emailPattern;
    private passwordPattern;
    private namePattern;
    private phonePattern;
    
    
    constructor() {
        this.emailPattern = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$");
        this.passwordPattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/);
        this.namePattern = new RegExp(/^[a-zA-Z\-]+$/);
        this.phonePattern = new RegExp(/^[0-9\-\+]{10,15}$/)
    }

    isValidEmail(email):any{
        let flag = false;
        if( this.emailPattern.test(email)){
           flag = true;
        }else{
            flag = false;
        }
        return flag;
    }

    isValidPassword(password):any{
        let flag = false;
        if( this.passwordPattern.test(password)){
           flag = true;
        }else{
            flag = false;
        }
        return flag;
    }

    isPasswordMatch(password,ConfirmPassword):any{
        let flag = false;
        if(password == ConfirmPassword){
            flag = true;
        }else{
            flag = false;
        }
        return flag
    }

    isValidName(name):any{
        let flag = false;
        if( this.namePattern.test(name)){
            flag = true;
        }else{
            flag = false;
        }
            return flag;
    }

    isValidNumber(number):any{
        console.log(number)
        let flag = false;
        if( this.phonePattern.test(number)){
            flag = true;
        }else{
            flag = false;
        }
            return flag;
    }
}