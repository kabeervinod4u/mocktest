import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './app.dashboard.html',
    // styleUrls: [''],
    providers: []
})

export class UserDashboardComponent {
    constructor(private router: Router) {
        if (localStorage.getItem('roleId') == null && localStorage.getItem('id') == null) {
            this.router.navigateByUrl('');
        }
        else {
            if (localStorage.getItem('roleId') != "2")
                this.router.navigateByUrl('admindashboard');
        }
    }
}