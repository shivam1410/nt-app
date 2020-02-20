import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  image: any;
  constructor(
    private camera: Camera,
    private DomSanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
  }

  getImage(){
    console.log("get image")
    const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64 (DATA_URL):
   const base64Image = 'data:image/jpeg;base64,' + imageData;
   this.image = base64Image;
   console.log(this.image);

   
  }, (err) => {
   // Handle error
  });
  }

  

}