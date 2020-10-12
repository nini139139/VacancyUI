import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // @Input() userFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter(); 
  model: any = {};
  constructor(private accountService: AccountService, private toastr: ToastrService,  private router:Router) { }

  ngOnInit(): void {
  }


  register(){
    this.accountService.register(this.model).subscribe(response=>{
      this.router.navigateByUrl('/markets');
      console.log(response);
      this.cancel();
    });
  }
  
  cancel(){
  this.cancelRegister.emit(false);
  }
}
