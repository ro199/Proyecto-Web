import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['codigo', 'usuario'])
@Entity('rol')
export class RolEntity {
  @PrimaryGeneratedColumn({
    comment: 'Identificador',
    name: 'codigo',
    unsigned: true,
  })
  codigo: number;

  @Column({
    name: 'usuario',
    length: '50',
    type: 'varchar',
    nullable: true,
  })
  usuario?: string;
}
