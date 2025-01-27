import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../core/services/users.service';
import { Login } from '../core/interfaces/users.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder ,
    private router: Router,
    private userService: UsersService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }


  onSubmit(): void {
    this.loginForm.markAllAsTouched();
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    let form : Login = {
      email : this.loginForm.controls["username"].value,
      password: this.loginForm.controls["password"].value
    }

    this.userService.login(form).subscribe((data : any) => {
      if(data.status != "error"){

        localStorage.setItem('login' , JSON.stringify(this.loginForm.value));

        this.router.navigate(['/admin']);
      }
    })


    // Manejar el envío del formulario (ejemplo: autenticación)
    console.log('Formulario válido', this.loginForm.value);
  }
}
