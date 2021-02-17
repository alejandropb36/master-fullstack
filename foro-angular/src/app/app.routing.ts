// Importar los modulos de router
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from './services/user.guard';
import { NoIdentityGuard } from './services/no.identity.guard';

// Importar componentes
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { TopicsComponent } from './components/topics/topics.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';

// Crear un array de rutas
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'inicio', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [NoIdentityGuard] },
    { path: 'registro', component: RegisterComponent, canActivate: [NoIdentityGuard] },
    { path: 'ajustes', component: UserEditComponent, canActivate: [UserGuard] },
    { path: 'temas', component: TopicsComponent },
    { path: 'temas/:page', component: TopicsComponent },
    { path: 'tema/:id', component: TopicDetailComponent },
    { path: 'usuarios', component: UsersComponent },
    { path: '**', component: LoginComponent, canActivate: [NoIdentityGuard] }
];

// Exportar configuracion
export const AppRoutingProviders: any[] = [];
export const Routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
