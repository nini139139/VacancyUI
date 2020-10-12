import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-market-list',
  templateUrl: './market-list.component.html',
  styleUrls: ['./market-list.component.css']
})
export class MarketListComponent implements OnInit {

  marketList:any;
  hidden:boolean=true;
  btnName:string="შეცვლა";
  paintList:PaintMarketList[]= [];
  paintObj:PaintMarketList={};
  constructor(private accountService: AccountService, private toastr: ToastrService, private http: HttpClient ) { }

  ngOnInit(): void {
    this.getMarkets();
  }

  
  getMarkets(){
    this.accountService.getMarkets().subscribe(response=>{
      this.marketList=response;
      this.paintList= [];
      this.marketList.forEach(element => {
        this.paintObj.name=element.name;
        this.paintObj.id = element.id;
        this.paintObj.btnNmae = this.btnName;
        this.paintObj.hidden=true;
        this.paintList.push(this.paintObj);
        this.paintObj={};
      });
    });
  }

  changeMarketData(value:PaintMarketList){
    value.hidden=!value.hidden;

    if(value.btnNmae=="შენახვა"){
      this.editMarket(value);
    }
    if(value.hidden){
      value.btnNmae="შეცვლა";
    }else{
      value.btnNmae="შენახვა";
    }

  }
  

  editMarket(model:PaintMarketList){
    this.accountService.editMarket(model).subscribe(response=>{
     this.getMarkets();
    },error=>{
      this.getMarkets();
    });
  }

  updateMarkets(event : boolean){
    if(event){
      this.getMarkets();
    }
  }

}
export  class PaintMarketList{
  id?:number;
  name?:string;
  btnNmae?:string;
  hidden?:boolean;
}