import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  $URL: string=`http://max-image-caption-generator.max.us-south.containers.appdomain.cloud/`;
  base64Image;
  constructor(
    private http: Http,
  ) { }
  
  async fetchdata(base64Image){
    this.base64Image = base64Image;
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

  query(q:string) {
		// $("#show-grad-cam-result").hide();
		// var question = $("#question").val();
		// var vqa_model = $('input[name=vqa_model]:checked').val();
		// var l = $("#inputImageAfterUpload")[0].src;
		// var img_path = getLocation(l).pathname;

		// $ajax({
		// 	type: 'POST', // http type
		// 	url: '/',     // url where we want to post
		// 	data: {
		// 		'img_path':img_path,
		// 		'csrfmiddlewaretoken': 'PKtWNNv2EGg1lMYCAE4SRKQANCVIqvU0s7vRVco3bqtPgn3947LCW6GyZyEjesta',
		// 		'question': question,
		// 		'vqa_model': vqa_model,
		// 		'socketid': "2e1f41df-7708-4468-9dc8-6a3835a10248",
		// 		'job_id': job_id
		// 	} // Data Object
		// }).done(function(response)){
		// 	console.log("Ajax called !! let's enjoy")
    // };
    let url = this.$URL + 'model/predict';

    let blob = this.getBlob(this.base64Image, 'image/jpeg')
    console.log(blob.size)

    let formData = new FormData(); 
    formData.append('image',blob,'image');
    formData.append('query',q);

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
