import { RegisterComponent } from './components/authentication/register/register.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComposeMessageComponent } from './components/compose-message/compose-message.component';
import { ManageMessagesComponent } from './components/manage-messages/manage-messages.component';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';


const routes: Routes = [
  { path: 'compose-message', component: ComposeMessageComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] },
  { path: 'manage-messages', component: ManageMessagesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/compose-message', pathMatch: 'full' },
  { path: '**', redirectTo: '/compose-message' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
