import {Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {AutoEntity} from "../auto/auto.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";

@Index([
  'id_renta',
  'total_pagar',
  'metodo_pago',
  'lugar_entrega',
  'lugar_recogida',
  'fecha_entrega',
  'fecha_recogida',
  'estado',
])
@Entity('renta')
export class RentaEntity {
  @PrimaryGeneratedColumn({
    name: 'id_renta',
    comment: 'Identificador',
    unsigned: true,
  })
  id_renta: number;

  @Column({
    name: 'total_pagar',
    type: 'decimal',
    precision: 10,
    scale: 4,
    nullable: true,
  })
  total_pagar: number;

  @Column({
    name: 'metodo_pago',
    nullable: true,
    length: '50',
    type: 'varchar',
  })
  metodo_pago?: string;

  @Column({
    name: 'lugar_entrega',
    length: '100',
    nullable: true,
    type: 'varchar',
  })
  lugar_entrega?: string;

  @Column({
    name: 'lugar_recogida',
    nullable: true,
    length: '100',
    type: 'varchar',
  })
  lugar_recogida?: string;

  @Column({
    name: 'fecha_entrega',
    nullable: true,
    type: 'date',
  })
  fecha_entrega?: string;

  @Column({
    name: 'fecha_recogida',
    nullable: true,
    type: 'date',
  })
  fecha_recogida?: string;

  @Column({
    name: 'estado',
    nullable: true,
    length: '20',
    type: 'varchar',
  })
  estado?: string;

  @ManyToOne(
      type => AutoEntity,
      auto => auto.rentas
  )
  auto: AutoEntity;

  @ManyToOne(
      type => UsuarioEntity,
      usuario => usuario.rentas
  )
  usuario: UsuarioEntity;

}
