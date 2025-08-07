import {ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';
import { CreateAssetComponent } from './create-asset.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {of, throwError} from 'rxjs';
import { UtilityService } from '../../services/utility-service';
import { ProductService } from '../../services/product-service';
import { AssetCategoryService } from '../../services/asset-category-service';
import { AuthService } from '../../infrastructure/auth/auth.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {AssetCategory} from '../../model/asset-category';

describe('CreateAssetComponent', () => {
  let component: CreateAssetComponent;
  let fixture: ComponentFixture<CreateAssetComponent>;

  let mockRouter = { navigate: jasmine.createSpy('navigate') };
  let mockUtilityService = { createUtility: jasmine.createSpy('createUtility').and.returnValue(of({})) };
  let mockProductService = { createProduct: jasmine.createSpy('createProduct').and.returnValue(of({})) };
  let mockCategoryService = {
    getActiveUtilityCategories: jasmine.createSpy('getActiveUtilityCategories').and.returnValue(of([])),
    getActiveProductCategories: jasmine.createSpy('getActiveProductCategories').and.returnValue(of([])),
  };
  let mockAuthService = { getUserId: () => 'test-user-id' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAssetComponent],
      imports: [
        FormsModule,
        MatSlideToggleModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: UtilityService, useValue: mockUtilityService },
        { provide: ProductService, useValue: mockProductService },
        { provide: AssetCategoryService, useValue: mockCategoryService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should show utility-specific fields when assetType is utility', () => {
    component.onAssetTypeChange('utility');
    expect(component.isUtility).toBeTrue();
    expect(component.isProduct).toBeFalse();
  });

  it('should not submit form if validation fails', fakeAsync(() => {
    const utilityCategories = [{ id: '123', name: 'Test Utility Category' }];
    mockCategoryService.getActiveUtilityCategories.and.returnValue(of(utilityCategories));

    fixture.detectChanges();

    component.assetType = 'utility';
    component.onAssetTypeChange('utility');

    tick();

    spyOn(component as any, 'validateForm').and.returnValue(false);

    component.onSubmit();

    expect(mockUtilityService.createUtility).not.toHaveBeenCalled();
    expect(mockProductService.createProduct).not.toHaveBeenCalled();
  }));

  it('should call createUtility if assetType is utility and form is valid', () => {
    component.isUtility = true;
    component.isProduct = false;
    component.assetType = 'utility';
    spyOn(component as any, 'validateForm').and.returnValue(true);

    component.asset = {
      id: null,
      category: 'some-category-id',
      name: 'Utility Test',
      description: 'Test description',
      price: 200,
      discount: 10,
      grade: 0,
      images: [],
      possibleEventTypes: [],
      visible: true,
      available: true,
      status: '',
      deleted: false,
      providerId: ''
    };

    component.utilityDuration = 5;
    component.utilityReservationTerm = '2025-07-24';
    component.utilityCancellationTerm = '2025-07-23';
    component.utilityManualConfirmation = true;

    component.onSubmit();

    expect(mockUtilityService.createUtility).toHaveBeenCalled();
  });

  it('should call createProduct if assetType is product and form is valid', () => {
    component.isUtility = false;
    component.isProduct = true;
    component.assetType = 'product';
    spyOn(component as any, 'validateForm').and.returnValue(true);

    component.asset = {
      id: null,
      category: 'some-category-id',
      name: 'Product Test',
      description: 'Product description',
      price: 300,
      discount: 20,
      grade: 0,
      images: [],
      possibleEventTypes: [],
      visible: true,
      available: true,
      status: '',
      deleted: false,
      providerId: ''
    };

    component.onSubmit();

    expect(mockProductService.createProduct).toHaveBeenCalled();
  });

  it('should set showNewCategoryField to true when category is "none"', () => {
    component.asset.category = 'none';
    component.onCategoryChange();
    expect(component.showNewCategoryField).toBeTrue();
  });

  it('should set showNewCategoryField to false when category is valid', () => {
    component.asset.category = 'some-category-id';
    component.onCategoryChange();
    expect(component.showNewCategoryField).toBeFalse();
  });

  it('should invalidate form with empty or invalid fields', () => {
    component.asset = {
      id: null,
      category: '',
      name: '123InvalidName!', // invalid name
      description: '',
      price: 0,
      discount: 150, // invalid discount
      grade: 0,
      images: [],
      possibleEventTypes: [],
      visible: false,
      available: false,
      status: '',
      deleted: false,
      providerId: ''
    };

    component.utilityDuration = 0; // invalid duration
    component.utilityReservationTerm = '';
    component.utilityCancellationTerm = '';

    component.isUtility = true;
    component.isProduct = false;

    const valid = component.validateForm();

    expect(valid).toBeFalse();
    expect(component.validationMessages.category).toBeDefined();
    expect(component.validationMessages.name).toBeDefined();
    expect(component.validationMessages.description).toBeDefined();
    expect(component.validationMessages.price).toBeDefined();
    expect(component.validationMessages.discount).toBeDefined();
    expect(component.validationMessages.utilityDuration).toBeDefined();
    expect(component.validationMessages.utilityTerms).toBeDefined();
  });//

  it('should show new category fields only when category is none', () => {
    component.asset.category = 'none';
    component.onCategoryChange();
    expect(component.showNewCategoryField).toBeTrue();

    component.asset.category = 'some-category-id';
    component.onCategoryChange();
    expect(component.showNewCategoryField).toBeFalse();

    component.asset.category = null;
    component.onCategoryChange();
    expect(component.showNewCategoryField).toBeTrue();
  });

  it('should load utility categories and set default category or none', fakeAsync(() => {
    const categories: AssetCategory[] = [
      { id: 'cat1', name: 'Cat 1', description: 'Description', type: 'UTILITY' }
    ];
    mockCategoryService.getActiveUtilityCategories.and.returnValue(of(categories));

    component.onAssetTypeChange('utility');
    tick();

    expect(component.categories).toEqual(categories);
    expect(component.asset.category).toBe('cat1');
    expect(component.showNewCategoryField).toBeFalse();
  }));

  it('should set category to none if no utility categories', fakeAsync(() => {
    mockCategoryService.getActiveUtilityCategories.and.returnValue(of([]));

    component.onAssetTypeChange('utility');
    tick();

    expect(component.categories).toEqual([]);
    expect(component.asset.category).toBe('none');
    expect(component.showNewCategoryField).toBeTrue();
  }));

  it('should navigate to profile after successful utility creation', fakeAsync(() => {
    component.isUtility = true;
    component.isProduct = false;
    spyOn(component as any, 'validateForm').and.returnValue(true);

    component.asset = {
      id: null,
      category: 'cat1',
      name: 'Utility Name',
      description: 'Desc',
      price: 100,
      discount: 0,
      grade: 0,
      images: [],
      possibleEventTypes: [],
      visible: true,
      available: true,
      status: '',
      deleted: false,
      providerId: ''
    };
    component.utilityDuration = 5;
    component.utilityReservationTerm = '2025-07-24';
    component.utilityCancellationTerm = '2025-07-23';
    component.utilityManualConfirmation = true;

    component.onSubmit();
    tick();

    expect(mockUtilityService.createUtility).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/profile']);
  }));


  it('should handle error when utility creation fails', fakeAsync(() => {
    component.isUtility = true;
    component.isProduct = false;
    spyOn(component as any, 'validateForm').and.returnValue(true);

    const errorResponse = { status: 500, message: 'Server error' };
    mockUtilityService.createUtility.and.returnValue(throwError(() => errorResponse));

    spyOn(console, 'error');

    component.asset = {
      id: null,
      category: 'cat1',
      name: 'Utility Name',
      description: 'Desc',
      price: 100,
      discount: 0,
      grade: 0,
      images: [],
      possibleEventTypes: [],
      visible: true,
      available: true,
      status: '',
      deleted: false,
      providerId: ''
    };
    component.utilityDuration = 5;
    component.utilityReservationTerm = '2025-07-24';
    component.utilityCancellationTerm = '2025-07-23';
    component.utilityManualConfirmation = true;

    component.onSubmit();
    tick();

    expect(console.error).toHaveBeenCalledWith('Error creating utility:', errorResponse);
  }));
});
