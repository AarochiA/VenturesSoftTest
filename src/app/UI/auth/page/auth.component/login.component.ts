import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../../infraestructure/helpers/services/auth.service';
import { Router } from '@angular/router';
import { DialogElements } from '../../../shared/dialog-elements/dialog-elements';

@Component({
  selector: 'app-auth.component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  hide = true;
  loginForm;

  readonly dialog = inject(MatDialog);

  authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);
  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value.email!, this.loginForm.value.password!)
        .subscribe({
          next: () => this.router.navigate(['/home']),
          error: (err) =>
            this.dialog.open(DialogElements, {
              data: {
                title: 'Error login',
                descripcion: err,
              },
            }),
        });
    }
  }
}
