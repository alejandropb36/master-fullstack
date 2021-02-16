import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routing, AppRoutingProviders } from 'src/app/app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { MomentModule } from 'ngx-moment';
import { NgxHighlightJsModule } from '@nowzoo/ngx-highlight-js';

import { PanelModule } from './panel/panel.module';
import { UserService } from './services/user.service';
import { UserGuard } from './services/user.guard';
import { NoIdentityGuard } from './services/no.identity.guard';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { UsersComponent } from './components/users/users.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserEditComponent,
    TopicsComponent,
    TopicDetailComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    Routing,
    PanelModule,
    MomentModule,
    NgxHighlightJsModule.forRoot()
  ],
  providers: [
    AppRoutingProviders,
    UserGuard,
    UserService,
    NoIdentityGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
