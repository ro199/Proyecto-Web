import {Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {AutoEntity} from "../auto/auto.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";

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

  @ManyToOne(
      type => AutoEntity,
      auto => auto.puntuaciones
  )
  auto: AutoEntity[];

  @ManyToOne(
      type => UsuarioEntity,
      usuario => usuario.puntuaciones
  )
  usuario: UsuarioEntity[]
}
