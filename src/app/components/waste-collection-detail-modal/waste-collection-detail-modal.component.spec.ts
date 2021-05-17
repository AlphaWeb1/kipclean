import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WasteCollectionDetailModalComponent } from './waste-collection-detail-modal.component';

describe('WasteCollectionDetailModalComponent', () => {
  let component: WasteCollectionDetailModalComponent;
  let fixture: ComponentFixture<WasteCollectionDetailModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WasteCollectionDetailModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WasteCollectionDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
