import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {
  registryForm: FormGroup;
  loading = false;
  errorMessage = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registryForm = this.formBuilder.group({
      
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit() {}

  // Getters pour un accès facile aux champs du formulaire
  get firstName() { return this.registryForm.get('firstName'); }
  get lastName() { return this.registryForm.get('lastName'); }
  get email() { return this.registryForm.get('email'); }
  get password() { return this.registryForm.get('password'); }
  get confirmPassword() { return this.registryForm.get('confirmPassword'); }

  // Validateur personnalisé pour la correspondance des mots de passe
  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : {'mismatch': true};
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSubmit() {
    if (this.registryForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const { firstName, lastName, email, password } = this.registryForm.value;
      
      this.authService.register({ 
        firstName,
        lastName,
        email, 
        password, 
        role: 'admin' 
      }).subscribe({
        next: () => {
          this.router.navigate(['/login'], { 
            queryParams: { registered: 'success' }
          });
        },
        error: (error) => {
          this.errorMessage = error.message || 'Une erreur est survenue lors de l\'inscription';
          this.loading = false;
        }
      });
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.registryForm.controls).forEach(key => {
        const control = this.registryForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
} 