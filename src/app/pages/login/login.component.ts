import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Md5 } from 'md5-typescript';
import { Router } from '@angular/router';
import { UserLogin } from '../../utils/temp/user.mock';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  // Variables que cambian de estado cuando los datos de user y password no estan diligenciados en el formulario
  userRequired: boolean = false;
  passwordRequired: boolean = false;
  // Variable que indica que login no fue correto
  invalidLogin: boolean = false;
  // Para hacer el enrutamiento cuando ya existe una sesión de usuario en el localStorage
  private _route = inject(Router);
  // Variable que contiene el Json con los datos de simulación del usuario
  UserLogin = UserLogin;

  // Se inicializa el formulario y los controles
  private formBuilder = inject(FormBuilder);
  //formaulario de loguin
  loginForm: FormGroup = this.formBuilder.group({
    user: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    if (localStorage.getItem('login') === 'true')
      this._route.navigate(['/products']);
  }

  // Evento que se ejecuta cuando se ingresa al input de user
  focusUser() {
    this.userRequired = false;
  }

  // Evento que se ejecuta cuando se ingresa el input de password
  focusPassword() {
    this.passwordRequired = false;
  }

  // Evento del boton login del formulario
  login(event: Event) {
    event.preventDefault();

    if (this.loginForm.value.user === '') {
      this.userRequired = true;
      return;
    }

    if (this.loginForm.value.password === '') {
      this.passwordRequired = true;
      return;
    }

    // Se hace la validacion del user y el password contra el Json quemado de UserLoguin
    if (
      this.loginForm.value.user === this.UserLogin.user && Md5.init(this.loginForm.value.password) === this.UserLogin.password
    ) {
      this.invalidLogin = false;
      //Se guarda en el localStorage que el logueo
      localStorage.setItem('login', 'true');
      this._route.navigate(['/products']);
    } else this.invalidLogin = true;
  }

  // hasErrors(field: string, typeError: string) {
  //   return (
  //     this.loginForm.get(field)?.hasError(typeError) &&
  //     this.loginForm.get(field)?.touched
  //   );
  // }
}
