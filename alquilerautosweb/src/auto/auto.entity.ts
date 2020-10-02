import {Column, Entity, Index, PrimaryGeneratedColumn, OneToMany, ManyToMany} from 'typeorm';
import {RentaEntity} from "../renta/renta.entity";
import {PuntuacionEntity} from "../puntuacion/puntuacion.entity";
import {OfertaEntity} from "../oferta/oferta.entity";

@Index(['id_autos', 'nombre', 'numMotor', 'precio', 'source'])
@Entity('autos')
export class AutoEntity {
  @PrimaryGeneratedColumn({
    name: 'id_autos',
    unsigned: true,
    comment: 'Identificador',
  })
  id_autos: number;

  @Column({
    name: 'nombre',
    nullable: true,
    length: '80',
    type: 'varchar',
  })
  nombre?: string;

  @Column({
    name: 'numMotor',
    nullable: true,
    length: '50',
    type: 'varchar',
  })
  numMotor?: string;

  @Column({
    name: 'precio',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 3,
  })
  precio?: number;

  @Column({
    name: 'source',
    nullable: true,
    length: '100',
    type: 'varchar',
  })
  source?: string;

  @OneToMany(
      type => RentaEntity,
      renta => renta.auto
  )
  rentas: RentaEntity[];

  @OneToMany(
      type => PuntuacionEntity,
      puntuacion => puntuacion.auto
  )
  puntuaciones: PuntuacionEntity[];

  @OneToMany(type => OfertaEntity,
      oferta => oferta.autos)
  ofertas: OfertaEntity[];

}
