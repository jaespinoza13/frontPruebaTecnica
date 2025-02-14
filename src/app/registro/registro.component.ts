import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router'; // Importar Router
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule, // Importar RouterModule
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;
  tiposIdentificacion: string[] = ['DNI', 'Cédula', 'Pasaporte'];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {} // Agregar Router en el constructor

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      numeroIdentificacion: ['', Validators.required],
      tipoIdentificacion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      usuario: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const personaData = {
        obj_persona: {
          nombres: this.registroForm.value.nombre,
          apellidos: this.registroForm.value.apellido,
          numeroIdentificacion: this.registroForm.value.numeroIdentificacion,
          tipoIdentificacion: this.registroForm.value.tipoIdentificacion,
          email: this.registroForm.value.email,
          fechaCreacion: new Date().toISOString(), // Enviar la fecha actual en formato ISO
        }
      };

      this.http.post<any>('http://localhost:5078/api/personas/registro', personaData).subscribe(
        (response) => {
          if (response.exito) {
            alert('Registro exitoso');
            this.router.navigate(['/dashboard']); // Ahora sí existe router
          } else {
            alert('Error en el registro');
          }
        },
        (error) => {
          console.error('Error en la solicitud', error);
          alert('Error en la comunicación con el servidor');
        }
      );
    }
  }
}
