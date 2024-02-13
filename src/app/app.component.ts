import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  imageUploadForm: FormGroup;
  sourceImage: string;
  resultImage: string;
  sourceSize: string;
  resultSize: string;
  compressSize: number;

  constructor(private formBuilder: FormBuilder, private ng2ImgMax: Ng2ImgMaxService) {
    this.imageUploadForm = this.formBuilder.group({
      fileInput: ''
    });
    this.sourceImage = 'https://angular.io/assets/images/logos/angular/angular.svg';
    this.resultImage = 'https://angular.io/assets/images/logos/angular/angular.svg';
    this.sourceSize = '';
    this.resultSize = '';
    this.compressSize = 1;
  }

  onFileSelected(event: any) {
    this.resultImage = 'https://angular.io/assets/images/logos/angular/angular.svg';
    this.resultSize = '';
    const file: File = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.sourceImage = event.target.result;
        this.sourceSize = ((file.size) / 1024) / 1024 + " MB";
      }
      reader.readAsDataURL(file);
      const maxSizeInMB = this.compressSize;
      this.compressImage(file, maxSizeInMB);
    }
  }

  compressImage(file: File, maxSizeInMB: number) {
    this.ng2ImgMax.compressImage(file, maxSizeInMB)
      .subscribe(compressedImage => {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.resultImage = event.target.result;
          this.resultSize = ((compressedImage.size) / 1024) / 1024 + " MB";
        }
        reader.readAsDataURL(compressedImage);
      }, error => {
        console.log(error.reason);
      });
  }

  sizeChange(event: any) {
    this.compressSize = event.target.value;
  }


}
