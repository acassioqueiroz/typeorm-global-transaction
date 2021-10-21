import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accounts')
class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: number;

  @Column()
  balance: number;
}

export default Account;
