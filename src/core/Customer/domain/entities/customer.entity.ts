import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  @ApiHideProperty()
  id?: string;

  @Column({
    name: 'creation_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creationDate?: Date;

  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'document',
  })
  document: string;
}
