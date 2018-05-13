import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'dash-board',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  public name: string;
  public roleId: number;
 
  constructor(private router: Router) {
    if (localStorage.getItem('roleId') == null && localStorage.getItem('id') == null) {

    }
    this.roleId = Number(localStorage.getItem('roleId'));
    this.name = localStorage.getItem('id');
  }

  ngOnInit() {
  
  
  }
  onLogout() {
    localStorage.clear();
    this.router.navigateByUrl('');
  }

  onResize(event) {
    event.target.innerWidth;
  }

  onWaring() {
    $(function () {
      $("#modal-warning").modal("hide");
    });

  }
}
