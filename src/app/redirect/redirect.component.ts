import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
  id:string;
  vimeo_api: string = "https://api.vimeo.com/videos/";
  externalLink: string;

  constructor(private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log(params.video_uri);
      this.id = this.getNumbersInString(params.video_uri);
      this.getVideo();
    });
  }

  getVideo(){
    const token = "7fcf285dad8d8a1e56914edd362df3a2";
    const headers = new HttpHeaders({'Authorization':`bearer ${token}`,
    'Accept':'application/vnd.vimeo.*+json;version=3.4',
    'Content-Type': 'application/json'});
    let options = {headers};
    this.httpClient.get<any>(this.vimeo_api + this.id, options).subscribe(
      (res) => {
          console.log(res.files[1].link);
          this.externalLink = res.files[1].link;
        
      },
      (err) => console.log(err)
    );
  }

  getNumbersInString(string) {
    var tmp = string.split("");
    var map = tmp.map(function(current) {
      if (!isNaN(parseInt(current))) {
        return current;
      }
    });
  
    var numbers = map.filter(function(value) {
      return value != undefined;
    });
  
    return numbers.join("");
  }

}
