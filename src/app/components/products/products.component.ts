import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './products.component.html'
})

export class ProductsComponent {
  private rawProducts = signal<Product[]>([]);
  categoryId = signal<number>(0);
  stockFilter = signal<string>('all');

  constructor(private ps: ProductService, private cart: CartService, private route: ActivatedRoute) { }

  filteredProducts = computed(() => {
    const products = this.rawProducts();
    const mode = this.stockFilter();

    if (mode === 'out') return products.filter(p => p.quantity === 0);
    if (mode === 'in') return products.filter(p => p.quantity > 0);
    return products;
  });

  ngOnInit() {
    const id = Number(this.route.snapshot.params['id'] || 0);
    this.categoryId.set(id);
    this.load();
  }

  load() {
    const cid = this.categoryId() === 0 ? undefined : this.categoryId();
    this.ps.getProducts(cid).subscribe(p => {
      this.rawProducts.set(p);
    });
  }

  onCategoryChange() {
    this.load();
  }

  onStockChange(mode: string) {
    this.stockFilter.set(mode);
  }

  addToCart(product: Product) {
    this.cart.add(product);
  }
}
