import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080'; // Update with your server URL

  constructor(private http: HttpClient) {}

  // Explicitly specify the type of the response using generics (e.g., Observable<Category[]>)
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  // Explicitly specify the type of the response using generics (e.g., Observable<Film[]>)
  getFilmsByCategory(id: number): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.apiUrl}/categories/${id}/films`);
  }
}

// Define Category and Film interfaces to represent the response types
interface Category {
  category_id: number;
  name: string;
  description: string;
}

interface Film {
  film_id: number;
  title: string;
  description: string;
  duration: number;
  rating: string;
}
