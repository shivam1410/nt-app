import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireStorage) { }

  uploadImage(file) {
    const randomId = Math.random().toString(36).substring(2);
    var ref = this.db.ref(`database/${randomId}/image`);

    var file =  file;

    ref.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });
    return randomId;
  }

  uploadData(randomId,data) {
    var ref = this.db.ref(`database/${randomId}/data`);

    var file =  file;

    ref.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });
  }
}