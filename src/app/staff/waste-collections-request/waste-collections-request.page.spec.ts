import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WasteCollectionsRequestPage } from './waste-collections-request.page';

describe('WasteCollectionsRequestPage', () => {
  let component: WasteCollectionsRequestPage;
  let fixture: ComponentFixture<WasteCollectionsRequestPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WasteCollectionsRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WasteCollectionsRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
