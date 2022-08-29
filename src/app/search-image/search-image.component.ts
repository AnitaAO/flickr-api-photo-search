import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../services/flickr.service';

@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.scss']
})
export class SearchImageComponent implements OnInit {
  images = [];
  keyword: string | undefined;

  constructor(private flickrService: FlickrService) { }

  ngOnInit(): void {
  }
  search(event: any) {

    this.keyword = event.target.value.toLowerCase();
    if (this.keyword && this.keyword.length > 0) {
      this.flickrService.search_keyword(this.keyword)
      .toPromise()
      .then((res: never[]) => {
        this.images = res;
      });
    }
  }

  onScroll() {
    if (this.keyword && this.keyword.length > 0) {
      this.flickrService.search_keyword(this.keyword)
      .toPromise()
      .then((res: ConcatArray<never>) => {
        this.images = this.images.concat(res);
      });
    }
  }

}
