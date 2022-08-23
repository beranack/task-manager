import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { User } from 'src/auth/user.entity';
import { Exclude } from "class-transformer";

@Entity()
export class Task {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @Column()
  date: Date;

  @Exclude({ toPlainOnly: true })
  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  user: User;
}
