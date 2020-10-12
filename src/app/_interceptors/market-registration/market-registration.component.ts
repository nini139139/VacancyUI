import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-market-registration',
  templateUrl: './market-registration.component.html',
  styleUrls: ['./market-registration.component.css']
})
export class MarketRegistrationComponent implements OnInit {

  @Output() updateMarketData = new EventEmitter(); 
  model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  
  addMarket(){
    this.accountService.addMarket(this.model).subscribe(response=>{
      this.getMarkets();
    }, error=>{
      this.getMarkets();
    });
  }

  getMarkets(){
    this.updateMarketData.emit(true);
    }
}



