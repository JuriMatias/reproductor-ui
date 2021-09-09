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
  vimeo_api_put: string = "https://api.vimeo.com/me/projects/5482132/videos/";
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
        //res devuelve un array con distintas calidades del video (5 opciones).
          console.log(res.status);
          if (res.transcode.status != 'complete'){
            this.getVideo();
          }
          else{
              console.log(res);
              //buscar el video de mejor definicion
              this.externalLink = res.files.find(x => x.quality == 'hd' && x.width == 1920).link;
              if(this.externalLink == undefined ){
                this.externalLink = res.files.find(x => x.quality == 'sd' && x.width == 640).link;
              }
              console.log(this.externalLink);
              var id = this.getNumbersInString(res.uri);
              console.log(id);
              this.moveToFolder(id);
          }
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

  moveToFolder(id){
    //set headers
    const token = "8a12f0ad78312dfd47980bb3a0f5787b";
    const headers = new HttpHeaders({'Authorization':`bearer ${token}`,
    'Accept':'application/vnd.vimeo.*+json;version=3.4',
    'Content-Type': 'application/json'});
    let options = {headers};

    this.httpClient.put<any>(this.vimeo_api_put + id, null, options).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
  }


}
