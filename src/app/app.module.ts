import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataGridTableComponent } from './data-grid-table/data-grid-table.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DataTablesModule } from 'angular-datatables';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { BootstrapModalComponent } from './components/bootstrap-modal/bootstrap-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataGridTableModalComponent } from './data-grid-table/data-grid-table-modal/data-grid-table-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DataGridTableComponent,
    NavigationComponent,
    BootstrapModalComponent,
    DataGridTableModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
  ],
  providers: [UpperCasePipe, CurrencyPipe, NgbActiveModal],
  bootstrap: [AppComponent],
})
export class AppModule {}
