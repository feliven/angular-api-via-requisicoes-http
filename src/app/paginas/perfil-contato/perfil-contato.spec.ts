import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilContato } from './perfil-contato';

describe('PerfilContato', () => {
  let component: PerfilContato;
  let fixture: ComponentFixture<PerfilContato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilContato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilContato);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
