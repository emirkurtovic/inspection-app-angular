import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddEditInspectionComponent } from './home/add-edit-inspection/add-edit-inspection.component';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RegisterLoginComponent } from './nav/register-login/register-login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddEditInspectionComponent,
    NavComponent,
    EditProfileComponent,
    RegisterLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
