import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  @Input() activeProducts: string = '';
  @Input() activeTest: string = '';
  private _route = inject(Router);

  logout(){
    localStorage.removeItem('login');
    this._route.navigate(['']);
  }
}
