import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from '../_moduls/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = 'http://localhost:50638/api/';
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  //USer Services
  login(model:any){
    return this.http.post(this.baseUrl+'Users/login', model).pipe(
      map((response:User)=>{
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model:any){
    return this.http.post(this.baseUrl+'Users/RegisterUser', model).pipe(
      map((user:User)=>{
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user)
        }
      })
    )
  }

  setCurrentUser(user:User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
  //market services

  addMarket(model:any){
    return this.http.post(this.baseUrl+'Market/AddMarket', model);
  }
  editMarket(model:any){
    return this.http.post(this.baseUrl+'Market/EditMarket', model);
  }
  getMarkets(){
   return this.http.get(this.baseUrl+ 'Market/GetMarkets');
  }

  //Company Services
  addCompany(model:any){
    return this.http.post(this.baseUrl+'Company/AddCompany', model);
  }
  editCompany(model:any){
    return this.http.post(this.baseUrl+'Company/EditCompany', model);
  }
  getCompany(){
   return this.http.get(this.baseUrl+ 'Company/GetCompanies');
  }

  //Market Company Services
  RegisterMarketCompanyConnection(model:any){
    return this.http.post(this.baseUrl+'MarketCompany/RegisterMarketCompanyConnection', model);
  }
  EditMarketCompanyConnectio(model:any){
    return this.http.post(this.baseUrl+'MarketCompany/EditMarketCompanyConnection', model);
  }
  GetMarketCompanies(){
   return this.http.get(this.baseUrl+ 'MarketCompany/GetMarketCompanies');
  }

}
