import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { ROUTES_CONSTANT } from './core/routing/routes.constant';

const routes: Routes = [
  {
    path: ROUTES_CONSTANT.startPage.path,
    loadChildren: () =>
      import('./features/start-page/start-page.module').then(
        (m) => m.StartPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: ROUTES_CONSTANT.auth.path,
    loadChildren: () =>
      import('./core/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
