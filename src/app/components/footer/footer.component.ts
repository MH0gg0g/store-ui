import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
  <footer class="bg-light py-3 mt-4">
    <div class="container text-center">
      <small> 2025 Hardware Store — Privacy | Contact Us </small>
    </div>
  </footer>
  `
})
export class FooterComponent { }
