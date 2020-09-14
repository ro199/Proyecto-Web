import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Index([
  'cedula',
  'nombre',
  'apellido',
  'direccion',
  'telefono',
  'correo_electronico',
  'password',
])
@Entity('usuario')
export class UsuarioEntity {
  @PrimaryColumn({
    comment: 'Identificador',
    name: 'cedula',
    length: '10',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  cedula: string;

  @Column({
    name: 'nombre',
    type: 'varchar',
    nullable: false,
    length: ' 50',
  })
  nombre: string;

  @Column({
    name: 'apellido',
    type: 'varchar',
    nullable: false,
    length: ' 50',
  })
  apellido: string;

  @Column({
    name: 'direccion',
    type: 'varchar',
    nullable: true,
    length: '50',
  })
  direccion?: string;

  @Column({
    name: 'telefono',
    type: 'varchar',
    nullable: true,
    length: '15',
  })
  telefono?: string;

  @Column({
    name: 'correo electronico',
    type: 'varchar',
    nullable: true,
    length: 20,
  })
  correo_electronico?: string;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
    length: '50',
  })
  password: string;
}
