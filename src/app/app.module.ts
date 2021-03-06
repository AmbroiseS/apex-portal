import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { AngularFireModule, FirebaseOptions } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HttpClientModule } from '@angular/common/http';

import { firebaseConfig } from '../environments/environment';


import { AuthService } from 'src/app/shared/services/auth.service';

import { HomeComponent } from 'src/app/components/apex/home/home.component'
import { ContactComponent } from 'src/app/components/apex/contact/contact.component'
import { SignUpComponent } from 'src/app/components/security/sign-up/sign-up.component'
import { SignInComponent } from 'src/app/components/security/sign-in/sign-in.component'
import { ForgotPasswordComponent } from 'src/app/components/security/forgot-password/forgot-password.component'

import { AuthGuard } from "./shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "./shared/guard/secure-inner-pages.guard.ts.guard";
import { ReservationComponent } from './components/apex/reservation/reservation.component';
import { LearningComponent } from './components/apex/learning/learning.component';
import { ScheduleComponent } from './components/apex/schedule/schedule.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';

import { AuthTokenHttpInterceptorProvider } from './shared/interceptor/auth-token.interceptor';
import { PendingApprovalComponent } from './components/security/pending-approval/pending-approval.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    ReservationComponent,
    LearningComponent,
    ScheduleComponent,
    ContactComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ReservationComponent,
    LearningComponent,
    ScheduleComponent,
    AdminUsersComponent,
    PendingApprovalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', component: HomeComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'approval', component: PendingApprovalComponent },
      { path: 'admin', component: AdminUsersComponent, canActivate: [AuthGuard] },

      //protected by sign in 
      { path: 'learning', component: LearningComponent, canActivate: [AuthGuard] },
      { path: 'reservation', component: ReservationComponent, canActivate: [AuthGuard] },

      //protected when signed in
      { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard] },
      { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard] },
      { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] }]
    ),
    FontAwesomeModule,
    NgbCollapseModule
  ],

  providers: [AuthService, AuthTokenHttpInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
