import { Component, OnInit } from '@angular/core';


interface playlist {
  campaign: string,
  videos: any[]
}

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.css']
})

export class ReproductorComponent implements OnInit {
  playlist1: playlist = {
    campaign: "Campaña 1", videos: [
      {
        name: "Video1",
        url: "https://player.vimeo.com/external/580312981.sd.mp4?s=0a6f5407c9cbc35aeedc278bd5135747b9ffbe22&profile_id=165"
      },
      {
        name: "Video2",
        url: "https://player.vimeo.com/external/579884006.sd.mp4?s=657a59a4137b7ec578466306a7a8d1c1ab103f04&profile_id=165"
      }
    ]
  };

  playlist2: playlist = {
    campaign: "Campaña 2", videos: [
      {
        name: "Video3",
        url: "https://player.vimeo.com/external/580312194.sd.mp4?s=e2b44c4862ace672e7546561785f832bda76295c&profile_id=165"
      },
      {
        name: "Video4",
        url: "https://player.vimeo.com/external/580312689.sd.mp4?s=12a68bf463a1e94d044a7202247c6a6a185de57d&profile_id=165"
      }
    ]
  };

  selected: any;
  counter: number = 0;
  currentPlaylist: playlist;
  

  constructor() { }

  ngOnInit(): void {
    this.currentPlaylist = this.playlist1;
    this.selected = this.currentPlaylist.videos[this.counter].url;
    this.counter++;
    //var element = document.getElementById('video');
    //element.muted = true;
    setInterval( () => {
      console.log("Llego una nueva playlist.");
      console.log(this.currentPlaylist);
      if(this.currentPlaylist.campaign === "Campaña 1"){
        this.currentPlaylist = this.playlist2;
        this.counter = 0;
      }
      else{
        this.currentPlaylist = this.playlist1;
        this.counter = 0;
      }
    }, 60000);
  }

  finish() {
    console.log("Finish: ", this.counter);
    if (this.counter === 0){
      //Cambio la playlist.
      if(this.selected === this.currentPlaylist.videos[this.counter].url){
        this.counter ++;
      }
      this.selected = this.currentPlaylist.videos[this.counter].url;
      this.counter++;
    }
    else{
      if (this.counter === (this.currentPlaylist.videos.length)) {
        this.counter = 0;
        this.selected = this.currentPlaylist.videos[this.counter].url;
        this.counter++;
      }
      else {
        console.log("Reproducir siguiente");
        this.selected = this.currentPlaylist.videos[this.counter].url;
        this.counter++;
      }
    }    
    //
  }

}
