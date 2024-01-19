import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TestComponent } from './pages/test/test.component';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'test', component: TestComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
