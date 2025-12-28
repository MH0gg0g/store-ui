import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html'
})

export class HomeComponent {
  constructor(private http: HttpClient) {}

  categories = [
    { id: 1, name: 'Case' },
    { id: 2, name: 'Cpu' },
    { id: 3, name: 'Graphics Card' },
    { id: 4, name: 'Headphones' },
    { id: 5, name: 'Keyboard' },
    { id: 6, name: 'Mouse' },
  ];
}
