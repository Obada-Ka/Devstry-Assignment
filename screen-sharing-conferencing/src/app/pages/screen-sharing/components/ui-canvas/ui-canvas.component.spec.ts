import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCanvasComponent } from './ui-canvas.component';

describe('UiCanvasComponent', () => {
  let component: UiCanvasComponent;
  let fixture: ComponentFixture<UiCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
