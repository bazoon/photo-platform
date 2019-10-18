import { Component, OnInit, Input, SimpleChange, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.component.html',
  styleUrls: ['./preview-image.component.less']
})
export class PreviewImageComponent {
  @Input() image = "";
  @Input() isImageVisible = false;
  @Output() clicked = new EventEmitter<boolean>();

  handleCancelImage() {
    this.clicked.emit();
  }

  handleOkImage() {
    this.clicked.emit();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log(this.isImageVisible)
  }


}
