import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormsModule } from '@angular/forms';

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

  validateEmail(email) {
    var re: RegExp = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  logIn() {
     if (!this.validateEmail(this.email)) {
      window.alert("Invalid email")
    } else {
      this.authService.SignIn(this.email, this.password)
    } 
  }

}