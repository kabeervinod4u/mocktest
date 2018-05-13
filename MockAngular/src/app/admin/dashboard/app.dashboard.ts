import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './app.dashboard.html',
    // styleUrls: [''],
    providers: []
})

export class AdminDashboardComponent {

    constructor(private router: Router) {
        if (localStorage.getItem('roleId') == null && localStorage.getItem('id') == null) {
            this.router.navigateByUrl('');
        }
        else {
            if (localStorage.getItem('roleId') != "1")
                this.router.navigateByUrl('userdashboard');
        }
    }

}