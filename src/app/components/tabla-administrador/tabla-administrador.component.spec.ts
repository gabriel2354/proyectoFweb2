import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAdministradorComponent } from './tabla-administrador.component';

describe('TablaAdministradorComponent', () => {
  let component: TablaAdministradorComponent;
  let fixture: ComponentFixture<TablaAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaAdministradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
