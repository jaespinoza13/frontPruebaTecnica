import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = {
        usuarioNombre: this.loginForm.value.usuario, // Asegúrate de que el nombre de la propiedad coincida
        pass: this.loginForm.value.password,
      };
  
      this.http.post<any>('http://localhost:5078/api/usuarios/login', loginData).subscribe(
        (response) => {
          if (response.mensaje === 'Autenticación exitosa') {
            // Guardar cualquier dato que desees, como un token si lo tienes
            localStorage.setItem('token', response.token); // Asegúrate de que la respuesta contenga el token si lo estás usando
            this.router.navigate(['/dashboard']);
          } else {
            alert('Credenciales incorrectas');
          }
        },
        (error) => {
          console.error('Error en la solicitud', error);
          alert('Error en la autenticación');
        }
      );
    }
  }
}