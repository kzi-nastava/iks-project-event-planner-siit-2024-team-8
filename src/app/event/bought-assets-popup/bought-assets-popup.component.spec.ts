import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoughtAssetsPopupComponent } from './bought-assets-popup.component';

describe('BoughtAssetsPopupComponent', () => {
  let component: BoughtAssetsPopupComponent;
  let fixture: ComponentFixture<BoughtAssetsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoughtAssetsPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoughtAssetsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
