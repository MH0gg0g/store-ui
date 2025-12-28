import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  successMsg = signal<string | null>(null);

  constructor(private auth: AuthService, private router: Router) {}

    onSubmit() {
    this.auth.register(this.name, this.email, this.password).subscribe({
      next: (res) => {
        this.successMsg.set(this.name + " Registerd Successfully");
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000);
        console.log("Register Successful", res);
      },
      error: (err: HttpErrorResponse) => {
        if (err.error) {
          console.log("Register Error: ", err.error.body);
        }
      }
    });
  }
}
