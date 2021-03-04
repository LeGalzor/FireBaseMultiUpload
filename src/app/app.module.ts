import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DropzoneDirective } from './dropzone.directive';
import { UploaderComponent } from './uploader/uploader.component';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { UploadFooterComponent } from './upload-footer/upload-footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';


var firebaseConfig = {
  apiKey: "AIzaSyBHdsE54TQggtQBrT7sDCdn-1JOsPmVv24",
  authDomain: "angularmultiupload.firebaseapp.com",
  projectId: "angularmultiupload",
  storageBucket: "angularmultiupload.appspot.com",
  messagingSenderId: "478101210834",
  appId: "1:478101210834:web:6137f0b38fe686717b8f0b",
  measurementId: "G-8R2MFPK9VS"
};

@NgModule({
  declarations: [
    AppComponent,
    DropzoneDirective,
    UploaderComponent,
    UploadTaskComponent,
    UploadFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatExpansionModule,
    MatIconModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, BrowserAnimationsModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
