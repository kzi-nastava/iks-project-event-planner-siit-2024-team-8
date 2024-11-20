import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarHomeComponent } from './search-bar-home.component';

describe('SearchBarHomeComponent', () => {
  let component: SearchBarHomeComponent;
  let fixture: ComponentFixture<SearchBarHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
