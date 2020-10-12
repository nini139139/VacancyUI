import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.css']
})
export class CompanyRegistrationComponent implements OnInit {
  @Output() updateCompanies = new EventEmitter(); 
  model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  
  addCompany(){
    this.accountService.addCompany(this.model).subscribe(response=>{
      this.getCompanies();
    }, error=>{
      this.getCompanies();
    });
  }


  getCompanies(){
    this.updateCompanies.emit(true);
    }
}
