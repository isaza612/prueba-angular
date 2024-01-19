import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../models/product.model';
import { IWeather } from '../../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'https://fakestoreapi.com/products';
  private urlWeather : string = 'https://api.tomorrow.io/v4/weather/forecast?location=bogota&apikey=Twvd2xeDSs62A0j3O7JIUW2A9FIyqFMF';
  private _httpClient = inject(HttpClient);

  getProducts(): Observable<IProduct[]> {
    return this._httpClient.get<IProduct[]>(this.baseUrl);
  }

  updateProduct(id: number, product: IProduct): Observable<IProduct> {
    return this._httpClient.put<IProduct>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<IProduct> {
    return this._httpClient.delete<IProduct>(`${this.baseUrl}/${id}`);
  }

  newProduct(product: IProduct): Observable<IProduct> {
    return this._httpClient.post<IProduct>(this.baseUrl, product);
  }

  getWeather():Observable<IWeather>{
    return this._httpClient.get<IWeather>(this.urlWeather);
  }

}
