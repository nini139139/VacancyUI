import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { User } from '../_moduls/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any={};
  // if we want to use accountservice in html we should describe as public
  constructor(public accountService: AccountService, private router:Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login(){
   this.accountService.login(this.model).subscribe(response=>{
     this.router.navigateByUrl('/members');
   });
  }

  logout(){
    this.router.navigateByUrl('/');
    this.accountService.logout();
  }


}
