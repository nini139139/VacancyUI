import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CusomErrorComponent } from './cusom-error/cusom-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { MarketCompanyListComponent } from './marketcompany/market-company-list/market-company-list.component';
import { MarketCompanyRegistrationComponent } from './marketcompany/market-company-registration/market-company-registration.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessageComponent } from './message/message.component';
import { AuthGuard } from './_guards/auth.guard';
import { MarketListComponent } from './_interceptors/market-list/market-list.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path:'members/:id', component: MemberDetailComponent, canActivate: [AuthGuard]},
      {path:'members', component: MemberListComponent},
      {path:'lists', component: ListComponent},
      {path:'messages', component: MessageComponent},
      {path:'markets', component: MarketListComponent},
      {path:'Companies', component: CompanyListComponent},
      {path:'MarketComapnies', component: MarketCompanyListComponent},
      {path:'CustomError', component: CusomErrorComponent},
    ]
  },
  {path:'errors', component: TestErrorsComponent},
  //if doesnt matches any url pathmatcth full is checking if url exactly is same.
  // other case it will stop when will find half part from url
  {path:'**', component: HomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
