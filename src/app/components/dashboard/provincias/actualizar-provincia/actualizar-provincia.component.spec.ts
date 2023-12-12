import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarProvinciaComponent } from './actualizar-provincia.component';

describe('ActualizarProvinciaComponent', () => {
  let component: ActualizarProvinciaComponent;
  let fixture: ComponentFixture<ActualizarProvinciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarProvinciaComponent]
    });
    fixture = TestBed.createComponent(ActualizarProvinciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
