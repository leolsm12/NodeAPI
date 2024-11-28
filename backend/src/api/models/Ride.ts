import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn  } from 'typeorm';

@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_id: string;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @CreateDateColumn()
  data: Date;

  @Column()
  duration: string;
  
  @Column()
  distance:number
 
  @Column()
  driverName: string;

  @Column()
  driverId: number;

  @Column()
  value: number;
  
}
