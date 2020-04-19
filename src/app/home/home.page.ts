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
  constructor(
    private camera: Camera,
    private DomSanitizer: DomSanitizer,
    private model: ModelService,
    private file: File
  ) {}

  ngOnInit() {
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
    console.log(this.imagePrediction.json())

  }

  query(queryData){
    this.model.queryModel(queryData,this.image);
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