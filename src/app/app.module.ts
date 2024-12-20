import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from  '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { HeaderComponent } from './components/header/header/header.component';
import { LoginComponent } from './components/login/login/login.component';
import { CreateTemplateComponent } from './components/create-template/create-template/create-template.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password/forgot-password.component';
import { RegistrationComponent } from './components/registration/registration/registration.component';
import { PageNotFoundComponent } from './components/error-handler/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { FileConverterService } from './services/file-converter/file-converter.service';
import { CommonStorageService } from './services/common-storage/common-storage.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GlobalHttpInterceptorService } from './services/global-http-interceptor/global-http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    CreateTemplateComponent,
    ForgotPasswordComponent,
    RegistrationComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: GlobalHttpInterceptorService,
    multi: true,
  },FileConverterService, CommonStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
