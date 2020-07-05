import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';

import { AngularFireModule, FirebaseOptions } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { firebaseConfig } from '../environments/environment';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

import { AuthService } from 'src/app/shared/services/auth.service';

import { AuthGuard } from "./shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "./shared/guard/secure-inner-pages.guard.ts.guard";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', component: HomeComponent },
      { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
      { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard] },
      { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard] },
      { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
      { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] }]
    )
  ],

  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
