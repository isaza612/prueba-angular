import { Component, OnInit, inject } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { Router } from '@angular/router';
import { ApiService } from '../../utils/services/api.service';
import { IDaily, IWeather } from '../../models/weather.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [NavComponent, CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {
  private _route = inject(Router);
  // Referencia a las funciones que consumen los servicios http
  private _apiServices = inject(ApiService);
  dailyList: IDaily[] = [];


  ngOnInit(): void {
    if (localStorage.getItem('login') !== 'true') this._route.navigate(['']);

    //this.dailyList = pruebaWeather.timelines.daily;

    this._apiServices.getWeather().subscribe((data: IWeather) => {
      this.dailyList = data.timelines.daily;
    });
  }
}
