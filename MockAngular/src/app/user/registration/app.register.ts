import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from '../../services/api.service'
import {ValidateService} from '../../services/validate.service'

@Component({
    templateUrl: './app.register.html',
    // styleUrls: [''],
    providers:[ApiService,ValidateService]
})

export class RegisterComponent {
    public data;
    public isValidFirstName:boolean=true;
    public isValidLastName:boolean=true;
    public isValidEmail:boolean=true;
    public isValidPhoneNumber:boolean=true;
    public isValidPassword:boolean=true;
    public isPasswordMatch:boolean=true;
    public isUserValid:boolean=true;
    public nameErrorMsg:string='';
    public lastNameErrorMsg:string='';
    public emailErrorMsg:string='';
    public phoneErrorMsg:string='';
    public userErrorMsg:string='';
    public passErrorMsg:string='';
    public confirmPassErrorMsg:string='';
    
    
    constructor(private router: Router,private apiService:ApiService,private validateService:ValidateService){
        this.data = {
            FirstName:'',
            LastName:'',
            EmailId:'',
            Mobile:'',
            UserName:'',
            Password:'',
            ConfirmPassword:''
    
        }
    }
     
    isValidName():any{
        this.nameErrorMsg = ''
        if(this.data.FirstName !==""){
            this.isValidFirstName = this.validateService.isValidName(this.data.FirstName);
            if(!this.isValidFirstName){
                this.nameErrorMsg = "Please enter valid name";
            }
        }else{
            this.isValidFirstName = false;
            this.nameErrorMsg = "Name must be filled out";
        }
        return this.isValidFirstName;
    }

    isValidlastName():any{
        this.lastNameErrorMsg = ''
        console.log('before validate',this.isValidFirstName )
        if(this.data.LastName !==""){
            this.isValidLastName = this.validateService.isValidName(this.data.LastName);
            if(!this.isValidLastName){
                this.lastNameErrorMsg = "Please enter valid last name";
            }
        }else{
            this.isValidLastName = false;
            this.lastNameErrorMsg = "last name must be filled out";
            
        }
        return this.isValidLastName;

    }

    isValidMail():any{
        this.emailErrorMsg = ''
        console.log('before validate',this.isValidFirstName )
        if(this.data.EmailId !==""){
            this.isValidEmail = this.validateService.isValidEmail(this.data.EmailId);
            if(!this.isValidEmail){
                this.emailErrorMsg = "Please enter valid email id";
            }
        }else{
            this.isValidEmail = false;
            this.emailErrorMsg = "email must be filled out";
            

        }
        return this.isValidEmail;
        
    }

    isValidNumber(){
        this.phoneErrorMsg = ''
        console.log('before validate',this.isValidFirstName )
        if(this.data.Mobile !==""){
            this.isValidPhoneNumber =  this.validateService.isValidNumber(this.data.Mobile)
            if(!this.isValidPhoneNumber){
                this.phoneErrorMsg = "Please enter valid Contact no";
            }
        }else{
            this.isValidPhoneNumber = false;
            this.phoneErrorMsg = "Contact no must be filled out";
        }
        return this.isValidPhoneNumber;
    }

    isVaildUser():any{
        this.userErrorMsg ='';
        if(this.data.UserName !==''){
        this.isUserValid = true;
            
        }else {
            this.isUserValid = false;
            this.userErrorMsg = 'UserName must be filled out';
            
        }
        return this.isUserValid;
    }

    isVaildPassword():any{
        this.passErrorMsg ='';
        if(this.data.Password !==""){
            this.isValidPassword = this.validateService.isValidPassword(this.data.Password);
            if(!this.isValidPassword){
                this.passErrorMsg = " Password should be Minimum eight characters, at least one letter, one number and one special character";
            }
        }else{
            this.isValidPassword = false;
            this.passErrorMsg = "Password must be filled out";
        }
        return this.isValidPassword; 
    }

    ispasswordMatch(){
        this.confirmPassErrorMsg ='';
        if(this.data.ConfirmPassword !==""){
            this.isPasswordMatch = this.validateService.isPasswordMatch(this.data.Password,this.data.ConfirmPassword);
            if(!this.isPasswordMatch){
                this.confirmPassErrorMsg = "Your password and confirmation password do not match.";
            }
        }else{
            this.isPasswordMatch = false;
            this.confirmPassErrorMsg = " Confirm Password must be filled out";
        }
        return this.isPasswordMatch;
    }


    registerUser(){
        let validUserName = this.isValidName();
        let validLastName = this.isValidlastName();
        let validEmail = this.isValidMail();
        let validPhone = this.isValidNumber();
        let validUser = this.isVaildUser();
        let validPassword = this.isVaildPassword();
        let validConfirmPassword = this.ispasswordMatch();
        let valid = validUserName && validLastName && validEmail && validPhone && validUser && validPassword && validConfirmPassword;
        if(valid){
            this.apiService.postData(this.data).subscribe();
        }else{
          
        }
     
       
    }

    btnForgot() {
        this.router.navigateByUrl('forgotpassword');
      }
    btnLogin() {
      this.router.navigateByUrl('');
    }
}