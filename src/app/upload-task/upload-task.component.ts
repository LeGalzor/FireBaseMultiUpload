import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { UploadTask, UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  hasCanceledTask: boolean = false;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  ngOnInit() {
    this.startUpload();
  }
  handleError(operation: String) {
    return (err: any) => {
        let errMsg = `error in ${operation}() retrieving ${this.downloadURL}`;
        console.log(`${errMsg}:`, err)
        if(err instanceof HttpErrorResponse) {
            // you could extract more info about the error if you want, e.g.:
            console.log(`status: ${err.status}, ${err.statusText}`);
            // errMsg = ...
        }
        return throwError(errMsg);
    }
}
  startUpload() {

    // The storage path
    const path = `test/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      catchError(this.handleError('getData')),
      // The file's download URL
      finalize( () =>  {
            ref.getDownloadURL().subscribe( url => {
            this.downloadURL = url;
            this.db.collection('files').add( { downloadURL: this.downloadURL, path });
          }),
          err => {
            console.log(err);
          }
      }),
    );
  }
  getIconClass(identifer: string) {
    console.log(identifer);
    
    if (this.hasCanceledTask){
      return 'canceled';
    }else if (this.downloadURL){
      return 'completed';
    }else if (identifer === 'rightIcon'){
      return 'link';
    }
  }
   formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
formatName(name: string){
    const filenameIndexStart = name.lastIndexOf('/');
    return this.truncate(name.substring(filenameIndexStart + 1));
}
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
  stopTask(){
    this.task.cancel();
  }
  openNewUrl(downloadURL){
    window.open(downloadURL);
  }
   truncate(str){
    return (str.length > 31) ? str.substr(0, 25) + '..' + str.substr(str.length -4 , str.length) : str;
  };
  cancelTask(){
    this.hasCanceledTask = true;   
    this.task.cancel();
  }
  getActionIcon(){
    if (this.hasCanceledTask){
      return 'dangerous';
    }
    if (!this.downloadURL){
      return 'delete'
    }else{
      return  'check_circle_outline'
    }
  }
}