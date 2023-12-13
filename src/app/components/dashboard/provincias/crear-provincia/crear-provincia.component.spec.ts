import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProvinciaComponent } from './crear-provincia.component';

describe('CrearProvinciaComponent', () => {
  let component: CrearProvinciaComponent;
  let fixture: ComponentFixture<CrearProvinciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearProvinciaComponent]
    });
    fixture = TestBed.createComponent(CrearProvinciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
