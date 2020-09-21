import {Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {UsuarioEntity} from "../usuario/usuario.entity";

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

  @ManyToMany(type => UsuarioEntity, usuario => usuario.roles)
  @JoinTable()
  usuarios: UsuarioEntity[];

}
