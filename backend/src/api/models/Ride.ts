import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Driver } from 'typeorm';


@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column()
  date: Date;

  @Column()
  driverName: string;

  @Column()
  userId: number;
  // Outros campos necessários
}
