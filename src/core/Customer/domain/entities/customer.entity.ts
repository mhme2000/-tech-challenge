import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Customer {
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
    name: 'document',
  })
  document: string;
}
