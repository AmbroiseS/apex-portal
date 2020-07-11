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

  scrollInterval = undefined;
  lastScroll = false;
  myScroll() {
    console.log('zef')
    this.lastScroll = true;
    if (!this.scrollInterval) {
      //scroll has started, do some coloring
      this.lastScroll = false;
      this.scrollInterval = setTimeout(function () {
        if (!this.lastScroll) {
          //scroll has ended, revert the coloring
          this.scrollInterval = clearInterval(this.scrollInterval);
        }
        this.lastScroll = false;
      }, 100);
    } else {
      this.lastScroll = true;
    }
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
    element.classList.remove('site-header');
  }

  blackNavbar() {
    let element = document.querySelector('.navbar');
    element.classList.add('navbar-dark');
    element.classList.add('site-header');
  }

  itemClicked(name) {
    this.forceBlackNav = name != "accueil";
    this.drawNavBarColor();
  }

}