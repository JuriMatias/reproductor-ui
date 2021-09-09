import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {
  uploadForm: FormGroup;
  VIMEO_API = "https://api.vimeo.com/me/videos";
  fileToUpload: File;
  name: string;
  response: any;
  form2: any;
  redirect: string = "http://localhost:4200/redirect?video_uri=value";

  constructor(private _formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.uploadForm = this._formBuilder.group({
      video: '',
      name: ''
    });
  }

  uploadFile() {
    //set headers
    const token = "7fcf285dad8d8a1e56914edd362df3a2";
    const headers = new HttpHeaders({'Authorization':`bearer ${token}`,
    'Accept':'application/vnd.vimeo.*+json;version=3.4',
    'Content-Type': 'application/json'});
    let options = {headers};
    //set body
    let size = this.fileToUpload.size;

    const data = {
      "upload": {
        "approach": "post",
        "size": `${size}`,
        "redirect_url": `${this.redirect}`
      },
      "name": this.name.replace(/\.[^/.]+$/, "")
    }    
    console.log(data);
    
    this.httpClient.post<any>(this.VIMEO_API, data, options).subscribe(
      (res) => {
          console.log(res.upload.form);
          this.response = res;
          this.form2 = this._sanitizer.bypassSecurityTrustHtml(res.upload.form);
          console.log(this.form2);
        
      },
      (err) => console.log(err)
    );
  }

  onSelectFiles(event) {
    if (event.target.files && event.target.files[0]) {

      this.fileToUpload = event.target.files[0];
      this.name = this.fileToUpload.name;
      console.log(this.fileToUpload.name);
      this.uploadForm.get('video').setValue(this.fileToUpload);
      //this.name = this.uploadForm.get('name').value;
      // file reader
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
