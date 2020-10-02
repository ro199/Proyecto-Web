import {Column, Entity, Index, ManyToMany, OneToMany, PrimaryColumn} from 'typeorm';
import {PuntuacionEntity} from "../puntuacion/puntuacion.entity";
import {RentaEntity} from "../renta/renta.entity";

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
    nullable: true,
    length: ' 50',
  })
  nombre?: string;

  @Column({
    name: 'apellido',
    type: 'varchar',
    nullable: true,
    length: ' 50',
  })
  apellido?: string;

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

  @Column({
    name: 'roles',
    type: "varchar",
    nullable: true,
    length: '100',
  })
  roles?: string;

  @OneToMany(
      type => PuntuacionEntity,
      puntuacion => puntuacion.usuario
  )
  puntuaciones: PuntuacionEntity[]

  @OneToMany(
      type => RentaEntity,
      renta => renta.usuario
  )
  rentas: RentaEntity[]

}
