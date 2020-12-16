// Importar los modulos de router
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar componentes
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';

// Crear un array de rutas
const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { path: '**', component: LoginComponent }
];

// Exportar configuracion
export const AppRoutingProviders: any[] = [];
export const Routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
