import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  searchkey = signal<string>('');
  constructor(private ps: ProductService, private auth: AuthService, private router: Router) { }

  //test
  searchedProducts = computed(() => {
    let list = this.ps.seed();
    const query = this.searchkey().toLowerCase().trim();

  if (query) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }
    return list;
  })

  //tets
  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchkey.set(value);
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
