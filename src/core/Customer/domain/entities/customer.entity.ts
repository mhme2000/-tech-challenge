import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn({ name: 'email', nullable: false })
  email: string;

  @PrimaryColumn({ name: 'document', nullable: false })
  document: string;

  @CreateDateColumn({ name: 'creation_date', nullable: false })
  creationDate: Date;

  @Column({ name: 'name', nullable: false })
  name: string;
}
