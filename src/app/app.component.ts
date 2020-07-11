import { Component, NgZone, HostListener } from '@angular/core';
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
  forceBlackNav = false;

  constructor(
    public dbService: DatabaseService,
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) { }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    this.drawNavBarColor();
  }

  drawNavBarColor() {
    if (this.forceBlackNav) {
      this.blackNavbar();
    } else {
      let element = document.querySelector('.navbar');
      if (window.pageYOffset > element.clientHeight) {
        this.blackNavbar();

      } else {
        this.transparentNavBar();

      }
    }

  }

  transparentNavBar() {
    let element = document.querySelector('.navbar');
    element.classList.remove('navbar-dark');
    element.classList.add('navbar-light');
    element.classList.remove('site-header');
    if(!this.forceBlackNav){
      let element = document.querySelector('#pad_id');
      element.classList.remove('p-bottom');
    }
  }

  blackNavbar() {
    let element = document.querySelector('.navbar');
    element.classList.add('navbar-dark');
    element.classList.remove('navbar-light');
    element.classList.add('site-header');
    if(this.forceBlackNav){
      let element = document.querySelector('#pad_id');
      element.classList.add('p-bottom');
    }
  }

  itemClicked(name) {
    this.forceBlackNav = name != "accueil";
    this.drawNavBarColor();
  }

}