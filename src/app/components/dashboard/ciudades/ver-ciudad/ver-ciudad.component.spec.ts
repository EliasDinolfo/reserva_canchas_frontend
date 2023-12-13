import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCiudadComponent } from './ver-ciudad.component';

describe('VerCiudadComponent', () => {
  let component: VerCiudadComponent;
  let fixture: ComponentFixture<VerCiudadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerCiudadComponent]
    });
    fixture = TestBed.createComponent(VerCiudadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
