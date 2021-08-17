import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePortFolioComponent } from './simple-port-folio.component';

describe('SimplePortFolioComponent', () => {
  let component: SimplePortFolioComponent;
  let fixture: ComponentFixture<SimplePortFolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimplePortFolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplePortFolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
