import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginCheckGuard} from './guards/login-check-guard';
import {AuthGuard} from './guards/auth-guard';
import {RegistrationCheckGuard} from './guards/registration-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate:[LoginCheckGuard] },
  { path: 'registration', loadChildren: './pages/registration/registration.module#RegistrationPageModule',canActivate:[RegistrationCheckGuard] },
  { path: 'my-profile', loadChildren: './pages/my-profile/my-profile.module#MyProfilePageModule',canActivate:[AuthGuard] },
  { path: 'edit-my-profile', loadChildren: './pages/edit-my-profile/edit-my-profile.module#EditMyProfilePageModule',canActivate:[AuthGuard] },
  { path: 'feed', loadChildren: './pages/feed/feed.module#FeedPageModule',canActivate:[AuthGuard] },
  { path: 'others-profile/:id', loadChildren: './pages/others-profile/others-profile.module#OthersProfilePageModule',canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[
  LoginCheckGuard,
  AuthGuard,
  RegistrationCheckGuard]
})
export class AppRoutingModule {}
