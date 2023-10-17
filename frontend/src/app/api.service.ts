import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080'; // Update with your server URL

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  getFilmsByCategory(id: number) {
    return this.http.get(`${this.apiUrl}/categories/${id}/films`);
  }
}
