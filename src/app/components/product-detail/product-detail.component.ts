import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {
  private id = 0;
  product = signal<Product | null>(null);
  qty = 1;

  constructor(private ps: ProductService, private route: ActivatedRoute, private cart: CartService) {
    const id = Number(this.route.snapshot.params['id']);
    if (id) {
      this.ps.getProduct(id).subscribe(p => this.product.set(p));
    }
  }

  addToCart() {
    const p = this.product();
    if (!p) return;
    // to be contined
  }
}
