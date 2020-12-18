// Importar los modulos de router
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar componentes
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { HomeComponent } from './components/home/home.component';

// Crear un array de rutas
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'inicio', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { path: '**', component: LoginComponent }
];

// Exportar configuracion
export const AppRoutingProviders: any[] = [];
export const Routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
