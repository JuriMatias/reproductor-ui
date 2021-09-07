import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReproductorComponent } from './reproductor/reproductor.component';
import { UploadComponent } from './upload/upload.component';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  {    path: '',                  component: ReproductorComponent            },
  {    path: 'upload',                  component: UploadComponent            },
  {    path: 'redirect',                  component: RedirectComponent            }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
