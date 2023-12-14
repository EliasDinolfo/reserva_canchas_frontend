import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerComplejoComponent } from './ver-complejo.component';

describe('VerComplejoComponent', () => {
  let component: VerComplejoComponent;
  let fixture: ComponentFixture<VerComplejoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerComplejoComponent]
    });
    fixture = TestBed.createComponent(VerComplejoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
