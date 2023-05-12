import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { sha512 } from 'js-sha512';
import { AccountService } from 'src/app/servicios/account.service';
import { AlertService } from 'src/app/servicios/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
formularioEnviado = false;
  name: string | undefined;
  email: string | undefined;
  pwd1?: string;
  pwd2?: string;
  confirmPassword: any;
  password: any;
  alertType?: number
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}
  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [this.name, Validators.required],
      email: [this.email, [Validators.required, Validators.email]],
      pwd1: [this.password, [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-={}\\[\\]|;:"<>,./?]).*$')]],
      pwd2: [this.confirmPassword, Validators.required],
    }, {
      validators: this.checkPasswords.bind(this)
    });
  }


  checkPasswords(group: FormGroup) {
    const password = group.value.pwd1;
    const confirmPassword = group.value.pwd2;
    return password === confirmPassword ? null : { notSame: true };
  }

  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.formularioEnviado = true;


    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const info = {
      name: this.form.value.name,
      email: this.form.value.email,
      pwd1:  sha512(this.form.value.pwd1),
      pwd2: sha512(this.form.value.pwd2),
    };
    this.accountService.register(info).subscribe({
      next: (response) => {
        this.router.navigateByUrl("/login");
        this.alertService.setAlertType(0)
      },
      error: (error) => {
        this.alertService.setAlertType(error.status)
      }
    });
  }

}
