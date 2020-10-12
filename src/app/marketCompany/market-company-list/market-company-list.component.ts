import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Companies } from 'src/app/models/company';
import { Markets } from 'src/app/models/market';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-market-company-list',
  templateUrl: './market-company-list.component.html',
  styleUrls: ['./market-company-list.component.css']
})
export class MarketCompanyListComponent implements OnInit {

  model: PaintMarketCompanyList = {};
  marketCompanyList:any;
  Companies: Companies;
  Marketies: Markets;
  hidden:boolean=true;
  btnName:string="შეცვლა";
  paintList:PaintMarketCompanyList[]= [];
  paintObj:PaintMarketCompanyList={};
  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMarketsCompanies();
    setInterval(() => { this.getMarketsCompanies(); }, 5000);
  }

  
  getMarketsCompanies(){
    this.accountService.GetMarketCompanies().subscribe(response=>{
      this.marketCompanyList=response;
      this.paintList=[];
      this.marketCompanyList.forEach(element => {
        this.paintObj.id = element.id,
        this.paintObj.companyName=element.companyName;
        this.paintObj.companyId = element.companyId;
        this.paintObj.marketId = element.marketId;
        this.paintObj.price = element.price
        this.paintObj.marketName = element.marketName;
        this.paintObj.btnNmae = this.btnName;
        this.paintObj.hidden=true;
        this.paintList.push(this.paintObj);
        this.paintObj={};
      });
    });
  }



  changeMarketCompanyData(value:PaintMarketCompanyList){
    value.hidden=!value.hidden;
    this.getMarkets();
    this.getCompanies();
    if(value.btnNmae=="შენახვა"){
      this.editMarketCompanyData(value);
    }
    if(value.hidden){
      value.btnNmae="შეცვლა";
    }else{
      value.btnNmae="შენახვა";
    }

  }
  

  getCompanies(){
    this.accountService.getCompany().subscribe(response=>{
      this.Companies=response;

      });
    }

    getMarkets(){
      this.accountService.getMarkets().subscribe(response=>{
        this.Marketies=response;
        });
      }

  editMarketCompanyData(model:PaintMarketCompanyList){
    this.accountService.EditMarketCompanyConnectio(model).subscribe(response=>{
      console.log(response);
    }, error=>{
    });
  }

  updateMarketCompanyDatat(event : boolean){
    if(event){
      this.getMarketsCompanies();
    }
  }

}
export  class PaintMarketCompanyList{
  id?:number;
  companyId?:number;
  marketId?:number;
  name?:string;
  marketName?:string;
  companyName?:string;
  price?:number;
  btnNmae?:string;
  hidden?:boolean;
}