import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

export interface CartItem { product: Product; quantity: number }

@Injectable({ providedIn: 'root' })
export class CartService {
  items = signal<CartItem[]>(JSON.parse(localStorage.getItem('cart') || '[]'));

  private persist() { localStorage.setItem('cart', JSON.stringify(this.items())); }

  add(product: Product, qty = 1) {
    const items = [...this.items()];
    const idx = items.findIndex(i => i.product.id === product.id);
    if (idx >= 0) { items[idx].quantity += qty; }
    else { items.push({ product, quantity: qty }); }
    this.items.set(items); this.persist();
  }

  remove(productId: number) {
    const items = this.items().filter(i => i.product.id !== productId);
    this.items.set(items); this.persist();
  }

  clear() { this.items.set([]); this.persist(); }
}
