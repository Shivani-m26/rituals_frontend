import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  resetForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  step: 'email' | 'reset' | 'done' = 'email';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      token: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()\\-+=_]).+$')]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSendToken(): void {
    if (this.forgotForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.authService.forgotPassword(this.forgotForm.value.email).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.successMessage = res.message || 'Reset token sent to your email!';
          this.resetForm.patchValue({ email: this.forgotForm.value.email });
          this.step = 'reset';
        },
        error: (err) => {
          this.errorMessage = err.error || 'Failed to send reset token.';
          this.isLoading = false;
        }
      });
    }
  }

  onResetPassword(): void {
    if (this.resetForm.valid) {
      const { newPassword, confirmPassword } = this.resetForm.value;
      if (newPassword !== confirmPassword) {
        this.errorMessage = 'Passwords do not match!';
        return;
      }

      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.authService.resetPassword(this.resetForm.value).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.successMessage = res.message || 'Password reset successfully!';
          this.step = 'done';
        },
        error: (err) => {
          this.errorMessage = err.error || 'Failed to reset password.';
          this.isLoading = false;
        }
      });
    }
  }
}
