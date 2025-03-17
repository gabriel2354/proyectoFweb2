import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesRegistroComponent } from './clientes-registro.component';

describe('ClientesRegistroComponent', () => {
  let component: ClientesRegistroComponent;
  let fixture: ComponentFixture<ClientesRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesRegistroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientesRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
