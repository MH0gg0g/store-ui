import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html'
})

export class CartComponent {
  private cart = inject(CartService);
  
  get items() {
    return this.cart.items();
  }

  remove(id: number) {
    this.cart.remove(id);
  }
}
