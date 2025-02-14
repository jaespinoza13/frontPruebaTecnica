import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Asegúrate de que el path es correcto

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // 💡 Aquí pasamos las rutas correctamente
    provideHttpClient(), provideAnimationsAsync(), provideAnimationsAsync()     // 💡 HttpClient correctamente añadido
  ]
}).catch(err => console.error(err));