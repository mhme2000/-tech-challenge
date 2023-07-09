import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Store {
  @PrimaryGeneratedColumn('uuid')
  @ApiHideProperty()
  id: string;

  @CreateDateColumn({ name: 'creation_date' })
  creationDate: Date;

  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'description',
  })
  description: string;
}
