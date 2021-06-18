import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/Employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  get(id:Employee): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(data:Employee): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id:Employee, data:Employee): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id:Employee): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }
}
