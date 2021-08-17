import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SimplePortFolioComponent } from './simple-port-folio/simple-port-folio.component';

@NgModule({
  declarations: [
    AppComponent,
    SimplePortFolioComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
