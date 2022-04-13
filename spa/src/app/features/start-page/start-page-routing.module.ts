import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConstant } from 'src/app/core/routing/routes.constant';
import { StartPageComponent } from './pages/start-page.component';

const routes: Routes = [
  {
    path: RoutesConstant.startPage.path,
    component: StartPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartPageRoutingModule {}
