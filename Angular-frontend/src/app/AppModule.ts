import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogComponent } from './dialog/dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { routes } from './app.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AdminComponent } from './admin/admin.component';
import { MessagesComponent } from './messages/messages.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { PatientComponent } from './create-order/patient/patient.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { ReportComponent } from './report/report.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { NotificationComponent } from './notification/notification.component';
import { ToastrModule } from 'ngx-toastr';
import { ReceivedSamplesComponent } from './received-samples/received-samples.component';
import { ChartComponent } from './chart/chart.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { UserListComponent } from './user-list/user-list.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    DialogComponent,
    AdminComponent,
    MessagesComponent,
    SidenavComponent,
    CreateOrderComponent,
    PatientComponent,
    OrderStatusComponent,
    MessagesComponent,
    ReportComponent,
    ManageOrderComponent,
    NotificationComponent,
    ReceivedSamplesComponent,
    AdminDashboardComponent,
    UserListComponent,
    ChartComponent
 

  ],

  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    NgxPermissionsModule.forRoot(),
    ToastrModule.forRoot(),
    NgChartsModule
  

 
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
