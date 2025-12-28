import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = 'http://localhost:8080/products';

  seed = signal<Product[]>([
    {
      id: 1,
      name: 'Wireless Noise-Cancelling Headphones',
      description: 'Premium over-ear headphones with 30-hour battery life and exceptional sound clarity.',
      quantity: 25,
      price: 199.99,
      categoryId: 4,
      imageUrl: 'images/headphones.png'
    },
    {
      id: 2, name: 'Computer Case', categoryId: 1, price: 150,
      description: 'Stylish and functional computer case with excellent airflow and build quality.',
      quantity: 25, imageUrl: 'images/case.jpeg'
    },
    {
      id: 3, name: 'High-Performance CPU', categoryId: 2, price: 300,
      description: 'High-performance CPU suitable for gaming and professional applications.',
      quantity: 0, imageUrl: 'images/cpu.jpg'
    },
    {
      id: 4, name: 'Advanced Graphics Card', categoryId: 3, price: 500,
      description: 'Cutting-edge graphics card delivering exceptional performance for gaming and creative work.',
      quantity: 8, imageUrl: 'images/gpu.webp'
    },
    {
      id: 5, name: 'Ergonomic Wireless Mouse', categoryId: 6, price: 60,
      description: 'Comfortable and precise wireless mouse designed for long hours of use.',
      quantity: 25, imageUrl: 'images/Mouse.jpeg'
    },
    {
      id: 6, name: 'Mechanical Keyboard', categoryId: 5, price: 120,
      description: 'Durable mechanical keyboard with customizable RGB lighting and tactile feedback.',
      quantity: 0, imageUrl: 'images/keyboard.jpg'
    }
  ]);

  constructor(private http: HttpClient) { }

  getProducts(categoryId?: number): Observable<Product[]> {
    const params: any = {};
    if (categoryId) params.categoryId = categoryId;
    return this.http.get<Product[]>(this.base, { params }).pipe(
      catchError(() =>{
        const allProducts = this.seed();

        if(!categoryId || categoryId === 0) {
          return of(allProducts);
        }
        const filtered = allProducts.filter(p => p.categoryId === categoryId);
        return of(filtered);
      })
    );
  }

  getProductByName(name: string): Observable<Product | null> {
    return this.getProducts().pipe(
      map(products => products.find(p => p.name === name) || null)
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.base}/${id}`).pipe(
      catchError(() =>
        of(this.seed().find(p => p.id === id)!)
      )
    );
  }

  create(p: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${this.base}`, p);
  }

  update(id: number, p: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.base}/${id}`, p);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
