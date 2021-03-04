import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { UploadTask } from '@angular/fire/storage/interfaces';
import { UploadTaskComponent } from '../upload-task/upload-task.component';

@Component({
  selector: 'app-upload-footer',
  templateUrl: './upload-footer.component.html',
  styleUrls: ['./upload-footer.component.scss']
})
export class UploadFooterComponent implements OnInit {
  panelOpenState = false;
  @Input() files: File[] = [];
  task: AngularFireUploadTask;
  childObjects: Array<UploadTask> = [];
  @ViewChildren(UploadTaskComponent) viewChildren!: QueryList<UploadTaskComponent>;

  constructor(private storage: AngularFireStorage) { }
  


  ngOnInit(): void {
  }
  ngAfterViewInit(){
  }

  stopAllTasks(e: Event){
    e.stopPropagation();
  
    this.viewChildren.forEach( children => {
      children.stopTask();
    })
  }
}
