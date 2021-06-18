import { Products } from './../model/Products.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  get(id:Products): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(data:Products): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id:Products, data:Products): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id:Products): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }}
