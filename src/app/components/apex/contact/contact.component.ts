import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {style, state, animate, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  faMapMarkerAlt = faMapMarkerAlt;
  faPhone = faPhone;
  faEnvelope = faEnvelope;

 public downtownActive = true;
  markerDownton: mapboxgl.Marker;
  markerVSL: mapboxgl.Marker;
  map: mapboxgl.Map;
  downtown: mapboxgl.LngLatLike = [-73.5791209, 45.4930458];
  vsl: mapboxgl.LngLatLike = [-73.6785914, 45.5103692];

  constructor() { }


  ngOnInit() {

  }

  displayDT() {
    this.downtownActive = true;
    this.clearMap();
    this.map.flyTo({ center: this.downtown, zoom: 12 });
    this.markerDownton = new mapboxgl.Marker()
      .setLngLat(this.downtown)
      .addTo(this.map);

  }


  displayVSL() {
    this.downtownActive = false;
    this.clearMap();
    this.map.flyTo({ center: this.vsl, zoom: 12 });
    this.markerVSL = new mapboxgl.Marker()
      .setLngLat(this.vsl)
      .addTo(this.map);
  }


  clearMap() {
    if (this.markerDownton != undefined)
      this.markerDownton.remove();

    if (this.markerVSL != undefined)
      this.markerVSL.remove();
  }

  ngAfterViewInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXBleC1kZXYiLCJhIjoiY2tjODhvbjVxMTlhYzJxbXNtNXkzcnI3eiJ9.d72JtjY9gQRhanPqAdvZ9Q';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: this.downtown, // starting position [lng, lat]
      zoom: 12 // starting zoom
    });
    this.displayDT();

  }



}
