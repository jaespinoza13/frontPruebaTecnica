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
        usuarioNombre: this.loginForm.value.usuario, 
        pass: this.loginForm.value.password,
      };
  
      this.http.post<any>('http://backend:5000/api/usuarios/login', loginData).subscribe(
        (response) => {
          console.error(response);
          if (response.response === 'Autenticación exitosa') { // Asegúrate de acceder correctamente al mensaje
            localStorage.setItem('token', response.token);
            this.router.navigate(['/registro']);
            alert('Login Exitoso!');
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