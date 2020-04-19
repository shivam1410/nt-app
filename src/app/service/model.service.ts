import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  $URL: string=`http://max-image-caption-generator.max.us-south.containers.appdomain.cloud/`;
  
  constructor(
    private http: Http,
  ) { }

  async fetchdata(base64Image){

    let url = this.$URL + 'model/predict';

    let blob = this.getBlob(base64Image, 'image/jpeg')
    console.log(blob.size)

    let formData = new FormData(); 
    formData.append('image',blob,'image')
    

    return this.http.post(url,formData).toPromise()
    .then(d=>{
      return d.json();
    })
    .catch(e=>{
      console.error(e);
    })
  }

  getBlob(b64Data:string, contentType:string, sliceSize:number= 512) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        let byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    let blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

  queryModel(imageData, query){
    // console.log(imageData, query);
  }

  storeDataFirebase(){

  }
}
