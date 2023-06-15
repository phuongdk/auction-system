import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { AppUser } from 'src/api/users/entities/appuser.entity';
import { Product } from 'src/api/products/entities/product.entity';

@Entity()
export class Bid {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'float', nullable: false })
    bid_attempt_price: number;

    @Column({ type: 'smallint', nullable: true })
    bid_phase: number;

    @Column({ nullable: false })
    userId: string;

    @Column({ nullable: false })
    productId: string;

    @Exclude()
    @ManyToOne(() => AppUser, (user) => user.bids)
    user: AppUser;

    @Exclude()
    @ManyToOne(() => Product, (product) => product.bids, { onDelete: 'CASCADE' })
    product: Product;

    @Exclude()
    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP(6)' })
    created_at: Date;

    @Exclude()
    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP(6)' })
    updated_at: Date;

    @Exclude()
    @DeleteDateColumn({ type: 'timestamp with time zone', default: null })
    deleted_at: Date;
}
