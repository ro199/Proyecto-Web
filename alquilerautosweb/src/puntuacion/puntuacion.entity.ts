import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['id_puntuacion', 'numero_estrellas', 'comentario'])
@Entity('puntuacion')
export class PuntuacionEntity {
  @PrimaryGeneratedColumn({
    name: 'id_puntuacion',
    unsigned: true,
    comment: 'Identificador',
  })
  id_puntuacion: number;

  @Column({
    name: 'numero_estrellas',
    nullable: true,
    type: 'int',
  })
  numero_estrellas?: number;

  @Column({
    name: 'comentario',
    nullable: true,
    length: '200',
    type: 'varchar',
  })
  comentario?: string;
}
