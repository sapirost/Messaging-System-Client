import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from './../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentication.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmittingProcess: boolean;

  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.snackBar.open('Invalid Credentials');
      return this.loginForm.markAllAsTouched();
    }

    this.isSubmittingProcess = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password)
      .pipe(finalize(() => this.isSubmittingProcess = false))
      .subscribe(
        res => this.authService.setToken(res),
        err => {
          const errorMsg = err.code === 404 ? 'User Not Found' : 'Something went wrong, please try again';
          this.snackBar.open(errorMsg);
        }
      );
  }
}
