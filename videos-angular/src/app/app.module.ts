import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { VideoNewComponent } from './components/video-new/video-new.component';
import { VideoEditComponent } from './components/video-edit/video-edit.component';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    RegisterComponent,
    LoginComponent,
    UserEditComponent,
    VideoNewComponent,
    VideoEditComponent,
    VideoDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
  ],
  providers: [
    appRoutingProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
