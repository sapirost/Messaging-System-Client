import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../authentication.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSubmittingProcess: boolean;

  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]],
      repeatPass: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.snackBar.open('Invalid Credentials');
      return this.registerForm.markAllAsTouched();
    }

    this.isSubmittingProcess = true;
    const { email, password } = this.registerForm.value;

    this.authService.register(email, password).subscribe(() => this.isSubmittingProcess = false);

    this.authService.register(email, password)
      .pipe(finalize(() => this.isSubmittingProcess = false))
      .subscribe(
        res => this.authService.setToken(res),
        err => {
          const errorMsg = err.status === 409 ? 'Email already in use' : 'Something went wrong, please try again';
          this.snackBar.open(errorMsg);
        }
      );
  }
}
