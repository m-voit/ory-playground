import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from 'src/app/features/start-page/pages/start-page.component';
import { RoutesConstant } from './core/routing/routes.constant';

const routes: Routes = [
  {
    path: RoutesConstant.startPage.path,
    component: StartPageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
