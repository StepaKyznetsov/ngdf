import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgdfComponent } from './ngdf.component';

describe('NgdfComponent', () => {
  let component: NgdfComponent;
  let fixture: ComponentFixture<NgdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgdfComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
