import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import Utils from '../../utils/utils'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  public password: string;
  public email: string;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() { }

  logIn() {
    if (!Utils.validateEmail(this.email)) {
      window.alert("Invalid email")
    } else {
      this.authService.signIn(this.email, this.password)
    }
  }


}