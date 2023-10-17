import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { LandingComponent } from './landing/landing.component';
import { ModalService } from './modal.service';

@NgModule({
  declarations: [AppComponent, CategoryModalComponent, LandingComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [ApiService, ModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
