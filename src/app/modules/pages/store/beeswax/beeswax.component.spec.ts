import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeeswaxComponent } from './beeswax.component';

describe('BeeswaxComponent', () => {
  let component: BeeswaxComponent;
  let fixture: ComponentFixture<BeeswaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeeswaxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeeswaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
