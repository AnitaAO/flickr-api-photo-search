import { HttpClient } from '@angular/common/http';
// import { FlickrService } from './flickr.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


export interface FlickrPhoto{
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: string
}

export interface FlickrOutput{
  photos: {
    photo: FlickrPhoto[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  Https: any;
// search_keyword(keyword: string) {
//   throw new Error('Method not implemented.');
// }

  constructor(private https: HttpClient) { }

  search_keyword(keyword: string) {

  const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
  const params = `api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=12`;

  return this.Https.get(url + params).pipe(map((res: FlickrOutput) => {
    const urlArr: any[] = [];
    res.photos.photo.forEach((ph: FlickrPhoto) => {
      const photoObj = {
        url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}`,
        title: ph.title
      };
      urlArr.push(photoObj);
    });
    return urlArr;
  }));

  }
}
