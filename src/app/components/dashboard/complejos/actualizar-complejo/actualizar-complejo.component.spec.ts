import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarComplejoComponent } from './actualizar-complejo.component';

describe('ActualizarComplejoComponent', () => {
  let component: ActualizarComplejoComponent;
  let fixture: ComponentFixture<ActualizarComplejoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarComplejoComponent]
    });
    fixture = TestBed.createComponent(ActualizarComplejoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
