import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
  { path: 'profile/:username', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile', redirectTo: ''},
  { path: '',   component: HomeComponent, pathMatch: 'full' }, 
  { path: '**', redirectTo: '' },  // Wildcard route for a 404 page - promijeniti kasnije u  dr komponentu
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }