import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('creditCards')
class CreditCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: string;

  @Column()
  limit: number;
}
export default CreditCard;
