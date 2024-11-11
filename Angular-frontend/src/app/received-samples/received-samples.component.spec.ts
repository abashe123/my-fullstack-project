import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedSamplesComponent } from './received-samples.component';

describe('ReceivedSamplesComponent', () => {
  let component: ReceivedSamplesComponent;
  let fixture: ComponentFixture<ReceivedSamplesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceivedSamplesComponent]
    });
    fixture = TestBed.createComponent(ReceivedSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
