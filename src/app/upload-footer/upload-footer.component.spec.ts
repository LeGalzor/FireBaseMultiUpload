import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFooterComponent } from './upload-footer.component';

describe('UploadFooterComponent', () => {
  let component: UploadFooterComponent;
  let fixture: ComponentFixture<UploadFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
