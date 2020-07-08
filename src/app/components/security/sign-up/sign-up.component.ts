import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import Utils from 'src/app/utils/utils';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  public password: string;
  public email: string;
  public name: string;
  
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() { }

  createAccount() {
    if (!Utils.validateEmail(this.email)) {
      window.alert("Invalid email")
    } else {
      this.authService.signUp(this.email, this.password, this.name);
    }
  }

}