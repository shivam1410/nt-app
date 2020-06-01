import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx'
import { ModelService } from '../service/model.service';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  image: any;
  queryData: string = '';
  QueryDataRecieved = null;
  spinner: boolean = false;
  imagePrediction;
  imagePredictionData = [];

  currentPosition;
  height;
  minimumThreshold;
  stratPosition;

  constructor(
    private camera: Camera,
    public DomSanitizer: DomSanitizer,
    private model: ModelService,
    private file: File
  ) {}

  ngOnInit() {
    this.close()
    this.height  = document.querySelector(".bottomSheet").clientHeight;
    console.log("height", this.height);
  }

  async getImage(){
    this.image = null;
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.spinner = true;
    const imageData = await this.camera.getPicture(options);
    const base64Image = 'data:image/jpeg;base64,' + imageData;
    this.image = base64Image;
    this.spinner = false;
    this.imagePrediction =await this.model.fetchdata(imageData);
    console.log(this.imagePrediction)
    this.imagePredictionData = this.imagePrediction["predictions"]
    this.open();
    console.log(this.imagePrediction.json())

  }

  query(queryData){
    this.model.queryModel(queryData,this.image);
  }


  open(){
    (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.bottom = "0px";
    (<HTMLStyleElement>document.querySelector(".bg")).style.display = "block";
  }

  close(){
    this.stratPosition = 0;
    this.height  = document.querySelector(".bottomSheet").clientHeight;
    if(this.height> 50){
      this.currentPosition = this.height - 40;
    }
    else{
      this.currentPosition = 50;
    }
    
    (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.transform = "translate3d(0px," + this.currentPosition + "px,0px)";
    (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.bottom = `-${this.currentPosition}px`;
    (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.transform = "translate3d(0px,0px,0px)";
    (<HTMLStyleElement>document.querySelector(".bg")).style.display = "none";
  }

  touchMove(ev: TouchEvent){ 
    if(this.stratPosition == 0){
      this.stratPosition = ev.touches[0].clientY;
    }
    this.height  = document.querySelector(".bottomSheet").clientHeight;

    var y = ev.touches[0].clientY;

    this.currentPosition = y- this.stratPosition;

    if(this.currentPosition>0 && this.stratPosition>0){
      (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.transform = "translate3d(0px," + this.currentPosition + "px,0px)";
    }

    this.minimumThreshold = this.height -130;
    if(this.currentPosition > this.minimumThreshold){
      this.currentPosition = this.height - 40;
      (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.transform = "translate3d(0px," + this.currentPosition + "px,0px)";
    }
  }

  touchEnd(){
    this.minimumThreshold = this.height -130;
    let finalPosition = 30 - this.height;
    if(this.currentPosition < this.minimumThreshold){
      (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.transform = "translate3d(0px,0px,0px)";
    }
    else{
      (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.bottom = `${finalPosition}`;
      console.log(this.minimumThreshold, this.currentPosition, this.height)
    }
  }
  

}

// .then((imageData) => {
  // imageData is either a base64 encoded string or a file URI
  // If it's base64 (DATA_URL):
  
  // var filename = imageData.substring(imageData.lastIndexOf('/')+1);
  // var path =  imageData.substring(0,imageData.lastIndexOf('/')+1);
  // console.log(imageData)
  // this.file.readAsDataURL(path, filename).then(res=>{
  //   this.image = res;
  // });
//   console.log(this.imagePrediction)
// })
// .catch(e => {
//   console.error(e)
//   this.spinner = false;
// });