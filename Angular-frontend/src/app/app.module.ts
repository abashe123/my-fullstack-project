import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { AfterLoginService } from './_services/after-login.service';
import { BeforeLoginService } from './_services/before-login.service';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { MessagesComponent } from './messages/messages.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { ReportComponent } from './report/report.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { NotificationComponent } from './notification/notification.component';
import { ReceivedSamplesComponent } from './received-samples/received-samples.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './user-list/user-list.component';



export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent, canActivate: [BeforeLoginService] }, 
  { path: 'login', component: LoginComponent, canActivate: [BeforeLoginService] },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AfterLoginService] },
  { path: 'dialog', component: DialogComponent },
  { path: 'messages', component: MessagesComponent, canActivate: [AfterLoginService] }, //user & admin
  { path: 'create-order', component: CreateOrderComponent, canActivate: [AfterLoginService] }, //user
  { path: 'order-status', component: OrderStatusComponent, canActivate: [AfterLoginService] }, 
  { path: 'report', component: ReportComponent, canActivate: [AfterLoginService] }, //admin 
  { path: 'manage-order', component: ManageOrderComponent, canActivate: [AfterLoginService] }, //admin 
  { path: 'notification', component: NotificationComponent, canActivate: [AfterLoginService] }, //user 
  { path: 'received-samples', component: ReceivedSamplesComponent, canActivate: [AfterLoginService] }, //admin 
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AfterLoginService] }, //admin 
  { path: 'user-list', component: UserListComponent, canActivate: [AfterLoginService] }, //admin 




];


  



