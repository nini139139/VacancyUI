import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListComponent } from './list/list.component';
import { MessageComponent } from './message/message.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { MarketListComponent } from './_interceptors/market-list/market-list.component';
import { MarketRegistrationComponent } from './_interceptors/market-registration/market-registration.component';

import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyRegistrationComponent } from './company/company-registration/company-registration.component';
import { MarketCompanyListComponent } from './marketcompany/market-company-list/market-company-list.component';
import { MarketCompanyRegistrationComponent } from './marketcompany/market-company-registration/market-company-registration.component';
import { CusomErrorComponent } from './cusom-error/cusom-error.component';


export function tokenGetter() {
  var token=localStorage.getItem('user');
  var data = JSON.parse(token);

  console.log(data.token);
  return data.token;
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListComponent,
    MessageComponent,
    TestErrorsComponent,
    MarketListComponent,
    MarketRegistrationComponent,
    CompanyRegistrationComponent,
    CompanyListComponent,
    MarketCompanyListComponent,
    MarketCompanyRegistrationComponent,
    CusomErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:50638"],
        disallowedRoutes: ["http://localhost:50638/api/Users/login", "http://localhost:50638/api/Users/RegisterUser"],
      },
    }),
    

  ],
  //in old verssion we didn't have this part for services
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
