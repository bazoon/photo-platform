import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ContestSection } from '../../core/types/contestSection';


interface Photo {
  name: string,
  imageUrl: string
};


@Component({
  selector: 'app-section-photos',
  templateUrl: './section-photos.component.html',
  styleUrls: ['./section-photos.component.less']
})
export class SectionPhotosComponent implements OnInit {
  photos: Array<Photo> = [];
  section?: ContestSection;
  isImageVisible = false;
  currentImage?: string;

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      const id = p.get('sectionId');

      this.api.get<Array<Photo>>(`api/contestPhotos/photos/${id}`).subscribe(photos => {
        this.photos = photos;
      });
      this.api.get<ContestSection>(`api/contestSections/${id}`).subscribe(section => {
        this.section = section;
      });
    });
  }

  showImage(image: string) {
    this.isImageVisible = true;
    this.currentImage = image;
  }

}
