import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index([
  'id_oferta',
  'nombre',
  'descripcion',
  'procentaje',
  'link_web',
  'fecha_inicio',
  'fecha_fin',
  'valor',
])
@Entity('oferta')
export class OfertaEntity {
  @PrimaryGeneratedColumn({
    name: 'id_oferta',
    unsigned: true,
    comment: 'Identificador',
  })
  id_oferta: number;

  @Column({
    name: 'nombre',
    nullable: true,
    length: '50',
    type: 'varchar',
  })
  nombre?: string;

  @Column({
    name: 'descripcion',
    nullable: true,
    length: '100',
    type: 'varchar',
  })
  descripcion?: string;

  @Column({
    name: 'porcentaje',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 4,
  })
  porcentaje?: number;

  @Column({
    name: 'link_web',
    nullable: true,
    length: '50',
    type: 'varchar',
  })
  link_web?: string;

  @Column({
    name: 'fecha_inicio',
    nullable: true,
    type: 'date',
  })
  fecha_inicio?: string;

  @Column({
    name: 'fecha_fin',
    nullable: true,
    type: 'date',
  })
  fecha_fin?: string;

  @Column({
    name: 'valor',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 4,
  })
  valor?: number;
}
