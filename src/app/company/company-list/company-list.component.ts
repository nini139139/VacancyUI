import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {


  CompanyList:any;
  hidden:boolean=true;
  btnName:string="შეცვლა";
  paintList:PaintCompanytList[]= [];
  paintObj:PaintCompanytList={};
  constructor(private accountService: AccountService, private toastr: ToastrService, private http: HttpClient ) { }

  ngOnInit(): void {

    this.getCompanies();
  }

  getCompanies(){
    this.accountService.getCompany().subscribe(response=>{
      this.CompanyList=response;
      this.paintList=[];
      this.CompanyList.forEach(element => {
        this.paintObj.name=element.companyName;
        this.paintObj.id = element.id;
        this.paintObj.btnNmae = this.btnName;
        this.paintObj.hidden=true;
        this.paintList.push(this.paintObj);
        this.paintObj={};
      });
    });
  }

  
  changeCompanyData(value:PaintCompanytList){
    value.hidden=!value.hidden;

    if(value.btnNmae=="შენახვა"){
      this.editCompany(value);
    }
    if(value.hidden){
      value.btnNmae="შეცვლა";
    }else{
      value.btnNmae="შენახვა";
    }

  }

  

  editCompany(model:PaintCompanytList){
    this.accountService.editCompany(model).subscribe(response=>{
      this.getCompanies();
    }, error=>{
      this.getCompanies();
    });
  }

  updateCompanyData(event : boolean){
    if(event){
      this.getCompanies();
    }
  }


}

export  class PaintCompanytList{
  id?:number;
  name?:string;
  btnNmae?:string;
  hidden?:boolean;
}
