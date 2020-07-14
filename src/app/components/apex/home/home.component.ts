import { Component, OnInit } from '@angular/core';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faArrowCircleDown = faArrowCircleDown;

  constructor() { }

  ngOnInit(): void {
  }

  scrollToElement(): void {
    let el = document.querySelector('#welcome');
    el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

}
