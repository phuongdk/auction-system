import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    OneToMany
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { AppUser } from 'src/api/users/entities/appuser.entity';
import { Bid } from 'src/api/bids/entities/bid.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'float', nullable: false })
    price: number;

    @Column({ type: 'float', nullable: false })
    bid_price: number;

    @Column({ type: 'varchar', nullable: false })
    status: string;

    @Column({ type: 'int' })
    time_window: number;

    @Exclude()
    @ManyToOne(() => AppUser, (user) => user.products)
    user: AppUser;

    @OneToMany(() => Bid, (bid) => bid.product)
    bids: Bid[];

    @Exclude()
    @CreateDateColumn({type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP(6)'})
    created_at: Date;

    @Exclude()
    @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP(6)'})
    updated_at: Date;

    @Exclude()
    @DeleteDateColumn({type: 'timestamp with time zone', default: null})
    deleted_at: Date;
}