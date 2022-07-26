import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { CqubeLibraryModule } from 'cqube-library';

import { MatTabsModule } from '@angular/material/tabs';
import { SchoolRegistryComponent } from './school-registry.component';
import { SchoolRegistryRoutingModule } from './school-registry-routing.module';
import { SchoolFacilitiesComparisionComponent } from './pages/school-facilities-comparision/school-facilities-comparision.component';
import { ImplementationstatusComponent } from './pages/implementationstatus/implementationstatus.component';


@NgModule({
  declarations: [
    SchoolRegistryComponent,
    SchoolFacilitiesComparisionComponent,
    ImplementationstatusComponent
  ],
  imports: [
    CommonModule,
    SchoolRegistryRoutingModule,
    SharedModule,
    MatTabsModule,
    CqubeLibraryModule
  ]
})
export class SchoolRegistryModule { }
