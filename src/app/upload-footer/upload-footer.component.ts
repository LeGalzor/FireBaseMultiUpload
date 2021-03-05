import { Component, Input, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { UploadTask } from '@angular/fire/storage/interfaces';
import { UploadTaskComponent } from '../upload-task/upload-task.component';

@Component({
  selector: 'app-upload-footer',
  templateUrl: './upload-footer.component.html',
  styleUrls: ['./upload-footer.component.scss'],
  encapsulation: ViewEncapsulation.None
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
  shouldDisable(){
    return this.files.length > 0 ? false : true ;
  }
  stopAllTasks(e: Event){
    e.stopPropagation();
  
    this.viewChildren.forEach( children => {
      children.stopTask();
    })
  }
}
