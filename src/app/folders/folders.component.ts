import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {
  vimeo_api: string = "https://api.vimeo.com/me/projects";
  get_folders: string = "https://api.vimeo.com/users/149177143/projects"
  name: string;
  folders: any;
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getFolders();
  }

  createFolder(){
    const data = {
      name: this.name
    }
    //set headers
    const token = "7fcf285dad8d8a1e56914edd362df3a2";
    const headers = new HttpHeaders({'Authorization':`bearer ${token}`,
    'Accept':'application/vnd.vimeo.*+json;version=3.4',
    'Content-Type': 'application/json'});
    let options = {headers};
    this.httpClient.post<any>(this.vimeo_api, data, options).subscribe(
      (res) => {
          console.log(res);
      },
      (err) => console.log(err)
    );
  }

  getFolders(){
    const token = "7fcf285dad8d8a1e56914edd362df3a2";
    const headers = new HttpHeaders({'Authorization':`bearer ${token}`,
    'Accept':'application/vnd.vimeo.*+json;version=3.4',
    'Content-Type': 'application/json'});
    let options = {headers};
    this.httpClient.get<any>(this.get_folders, options).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
  }

}
