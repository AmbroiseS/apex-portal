import { Component, NgZone } from '@angular/core';
import { AuthService } from "./shared/services/auth.service";
import { Router } from "@angular/router";
import { DatabaseService } from './shared/services/database.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'apex-portal';
  selected_menu = "home";

  constructor(
    public dbService: DatabaseService,
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) { }


}
