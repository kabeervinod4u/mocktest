import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './app.forgotpassword.html',
    // styleUrls: [''],
    providers: []
})

export class ForgotPasswordComponent {

    constructor(private router: Router){

    }
  
    btnRegister() {
      this.router.navigateByUrl('register');
    }
    btnLogin() {
      this.router.navigateByUrl('');
    }
}