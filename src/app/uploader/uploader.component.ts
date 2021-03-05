import { Component } from '@angular/core';

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {

  isHovering: boolean;
  filesToUpload: File[] = [];
  files: File[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDropOrBrowse(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }
  handleFileInput(files: FileList) {
    this.onDropOrBrowse(files);
}
}