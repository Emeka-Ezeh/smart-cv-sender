import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CV {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // e.g. "Frontend CV"

  @Column()
  filePath: string; // path to stored CV file
}
