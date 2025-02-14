import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; 
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptor } from '../interceptors/auth.interceptor';  // Asegúrate de que la ruta es correcta

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi()  // Usamos esta opción ahora
    ),
    provideAnimationsAsync(),
    AuthInterceptor,  // Registra tu interceptor aquí para que Angular lo inyecte
  ],
}).catch((err) => console.error(err));
