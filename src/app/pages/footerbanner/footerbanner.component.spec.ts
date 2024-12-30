import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterbannerComponent } from './footerbanner.component';

describe('FooterbannerComponent', () => {
  let component: FooterbannerComponent;
  let fixture: ComponentFixture<FooterbannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterbannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterbannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
