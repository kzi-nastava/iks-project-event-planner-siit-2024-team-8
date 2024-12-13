import { Component, Input, OnInit } from '@angular/core';
import { Asset } from '../../model/asset';
import { AssetCategoryService } from '../../services/asset-category-service';
import { AssetCategory } from '../../model/asset-category';

@Component({
  selector: 'app-asset-card',
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.css']
})
export class AssetCardComponent implements OnInit {

  @Input() asset: Asset;
  category: AssetCategory;
  favourite: boolean = false;

  constructor(private assetCategoryService: AssetCategoryService) {}

  ngOnInit(): void {
    if (this.asset.category) {
      this.assetCategoryService.getCategoryById(this.asset.category).subscribe((category: AssetCategory) => {
        this.category = category;
      });
    }
  }

  onFavouriteClicked(): void {
    this.favourite = !this.favourite;
  }
}
