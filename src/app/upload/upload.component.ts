import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  uploadForm: FormGroup;
  SERVER_URL = "http://localhost:8080";
  fileToUpload: File;

  constructor(private _formBuilder: FormBuilder,
    private httpClient: HttpClient,) { }

  ngOnInit(): void {
    this.uploadForm = this._formBuilder.group({
      video: '',
      name: ''
    });
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('video').value);
    formData.append('name', this.uploadForm.get('name').value);
    console.log(this.uploadForm.get('video').value);
    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => {
        if (res.resultado == "OK") {
          console.log("Archivo Subido");
        }
        else {
          console.log(res);
        }
      },
      (err) => console.log(err)
    );
  }

  onSelectFiles(event) {
    if (event.target.files && event.target.files[0]) {

      this.fileToUpload = event.target.files[0];
      this.uploadForm.get('video').setValue(this.fileToUpload);

      // file reader
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
