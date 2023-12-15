import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservarCanchasComponent } from './reservar-canchas.component';

describe('ReservarCanchasComponent', () => {
  let component: ReservarCanchasComponent;
  let fixture: ComponentFixture<ReservarCanchasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservarCanchasComponent]
    });
    fixture = TestBed.createComponent(ReservarCanchasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
