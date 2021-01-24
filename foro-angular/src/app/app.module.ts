import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routing, AppRoutingProviders } from 'src/app/app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFileUploaderModule } from "angular-file-uploader";

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { MainComponent } from './panel/components/main/main.component';
import { AddComponent } from './panel/components/add/add.component';
import { EditComponent } from './panel/components/edit/edit.component';
import { ListComponent } from './panel/components/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserEditComponent,
    MainComponent,
    AddComponent,
    EditComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    Routing
  ],
  providers: [
    AppRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
