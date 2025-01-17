import { Component, OnInit } from '@angular/core';
import { PriceListItem } from '../model/price-list-item';
import {AuthService} from '../infrastructure/auth/auth.service';
import {PriceListService} from '../services/price-list-service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css'],
})
export class PriceListComponent implements OnInit {
  priceList: PriceListItem[] = [];

  constructor(
    private priceListService: PriceListService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadPriceList();
  }

  loadPriceList(): void {
    const providerId = this.authService.getUserId();

    this.priceListService.getPriceList(providerId).subscribe(
      (data) => {
        this.priceList = data.map((item) => ({
          ...item,
          editMode: false,
        }));
      },
      (error) => {
        console.error('Error loading price list:', error);
      }
    );
  }

  calculateDiscountedPrice(item: PriceListItem): number {
    return item.price - (item.price * item.discount) / 100;
  }

  editItem(item: PriceListItem): void {
    item.editMode = true;
  }

  saveItem(item: PriceListItem): void {
    this.priceListService
      .updatePriceAndDiscount(item.assetId, item.price, item.discount)
      .subscribe(
        () => {
          item.editMode = false;
          item.discountedPrice = this.calculateDiscountedPrice(item);
        },
        (error) => {
          console.error('Error updating price and discount:', error);
        }
      );
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Price List', 14, 22);

    doc.setFontSize(12);
    doc.text('#', 14, 40);
    doc.text('Name', 30, 40);
    doc.text('Price', 80, 40);
    doc.text('Discount (%)', 130, 40);
    doc.text('Discounted price', 180, 40);

    let yPosition = 50;

    this.priceList.forEach((item, index) => {
      doc.text((index + 1).toString(), 14, yPosition);
      doc.text(item.name, 30, yPosition);
      doc.text(item.price.toFixed(2), 80, yPosition);
      doc.text(item.discount.toFixed(2), 130, yPosition);
      doc.text(this.calculateDiscountedPrice(item).toFixed(2), 180, yPosition);

      yPosition += 10;
    });

    doc.save('price-list.pdf');
  }

  toggleEditMode(item: PriceListItem) {
    item.editMode = !item.editMode;
  }
}
