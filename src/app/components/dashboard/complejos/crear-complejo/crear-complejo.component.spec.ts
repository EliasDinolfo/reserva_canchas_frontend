import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearComplejoComponent } from './crear-complejo.component';

describe('CrearComplejoComponent', () => {
  let component: CrearComplejoComponent;
  let fixture: ComponentFixture<CrearComplejoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearComplejoComponent]
    });
    fixture = TestBed.createComponent(CrearComplejoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
