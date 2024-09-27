import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  createCategory(category: Category) {
    return this.http.post<Category>(this.apiUrl, category);
  } 

  updateCategory(category: Category) {
    return this.http.put(`${this.apiUrl}/${category.id}`, category);
  }  

  deleteCategory(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}