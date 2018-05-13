import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
    templateUrl: './app.login.html',
    // styleUrls: [''],
    providers: [LoginService]
})

export class LoginComponent {

    login = {
        id: "",
        password: ""
    };
    public roleId: number;

    constructor(private router: Router, private loginService: LoginService) {
        // if (localStorage.getItem('justOnce')==null) 
        // {
        //     localStorage.setItem("justOnce", "true");
        //     window.location.reload();
        // }

        if (localStorage.getItem('roleId') != null)
            this.navigation(Number(localStorage.getItem('roleId')));

    }

    onSubmit() {
        this.loginService.getLoginDetails(this.login).subscribe(res => this.RequestSuccess(res), res => this.RequestError(res))
    }

    RequestSuccess(info) {
        var data = JSON.parse(info._body);
        localStorage.setItem('id', this.login.id);
        localStorage.setItem('roleId', data);
        this.navigation(data);
    }
    navigation(data: any) {
        switch (data) {
            case 1: {

                this.router.navigateByUrl('admindashboard');
                break;
            }
            case 2: {
                this.router.navigateByUrl('userdashboard');
                break;
            }
            default: {
                alert("Invalid User");
                break;
            }
        }
    }
    RequestError(res) {
        console.error(res);
    }

    btnForgot() {
        this.router.navigateByUrl('forgotpassword');
    }
    btnRegister() {
        this.router.navigateByUrl('register');
    }

}