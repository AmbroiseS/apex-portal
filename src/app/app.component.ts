import { Component, NgZone, HostListener } from '@angular/core';
import { AuthService } from "./shared/services/auth.service";
import { Router } from "@angular/router";
import { DatabaseService } from './shared/services/database.service';
import { filter } from "rxjs/operators";
import { Event as NavigationEvent } from "@angular/router";
import { NavigationStart } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  forceBlackNav = false;
  toggleNavbar = true;

  constructor(
    public dbService: DatabaseService,
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) {
    router.events
      .pipe(filter((event: NavigationEvent) => { return (event instanceof NavigationStart); }))
      .subscribe(
        (event: NavigationStart) => {
          this.forceBlackNav = event.url != "/home" && event.url!= "/";
          this.drawNavBarColor();
          this.toggleNavbar = true;
          this.setActive(event.url);
        }
      );
  }

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
    if (!this.forceBlackNav) {
      let element = document.querySelector('#pad_id');
      element.classList.remove('p-bottom');
    }
  }

  blackNavbar() {
    let element = document.querySelector('.navbar');
    element.classList.add('navbar-dark');
    element.classList.remove('navbar-light');
    element.classList.add('site-header');
    if (this.forceBlackNav) {
      let element = document.querySelector('#pad_id');
      element.classList.add('p-bottom');
    }
  }
  listAcivablesLinks = ['#home', '#contact', '#schedule', '#learning', '#reservation', '#sign-in']
  setActive(url: string) {
    this.listAcivablesLinks.forEach(element => {
      let t = document.querySelector(element);
      if (t)
        t.classList.remove('active');
    });

    if (url == '/')
      url = '/home'
    let t = document.querySelector('#' + url.replace('/', ''));
    t.classList.add('active');


  }
}


