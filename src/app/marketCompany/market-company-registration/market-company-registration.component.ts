import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Companies } from 'src/app/models/company';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-market-company-registration',
  templateUrl: './market-company-registration.component.html',
  styleUrls: ['./market-company-registration.component.css']
})
export class MarketCompanyRegistrationComponent implements OnInit {


  @Output() cancelRegister = new EventEmitter(); 
  @Output() updateMarketCompanyData = new EventEmitter(); 
  model: MarketCompany = {};
  Companies: Companies;
  Markets: any;
  selectedCompany:Companies;

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCompanies();
    this.getMarkets();
  }

  
  addConnection(){
    console.log(JSON.stringify(this.selectedCompany ) )
    this.accountService.RegisterMarketCompanyConnection(this.model).subscribe(response=>{
      this.getMarketCompanyData();
    }, error=>{
      this.getMarketCompanyData();
    });
  }

  getCompanies(){
    this.accountService.getCompany().subscribe(response=>{
      this.Companies=response;
      });
    }

    getMarkets(){
      this.accountService.getMarkets().subscribe(response=>{
        this.Markets=response;
        });
      }


      getMarketCompanyData(){
        this.updateMarketCompanyData.emit(true);
        }
  }
  export  class MarketCompany{
    companyId?:number;
    marketId?:number;
    price?:number;
    btnNmae?:string;
    hidden?:boolean;
  }

