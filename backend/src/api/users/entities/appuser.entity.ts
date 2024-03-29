import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Product } from 'src/api/products/entities/product.entity';
import { Bid } from 'src/api/bids/entities/bid.entity';

@Entity()
export class AppUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    email: string;

    @Exclude()
    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'varchar', nullable: false })
    first_name: string;

    @Column({ type: 'varchar', nullable: false })
    last_name: string;

    @Column({ type: 'float', nullable: false })
    balance: number;

    @Column({ type: 'float', default: null, nullable: true })
    temporary_hold: number;

    @Column({ type: 'varchar', nullable: true })
    refreshToken: string;

    @Expose()
    get full_name(): string {
        return `${this.first_name} ${this.last_name}`;
    };

    @OneToMany(() => Product, (product) => product.user)
    products: Product[];

    @OneToMany(() => Bid, (bid) => bid.user)
    bids: Bid[];

    @Exclude()
    @CreateDateColumn({ type: 'timestamp with time zone', default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @Exclude()
    @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true, default: null })
    updated_at: Date;

    @Exclude()
    @DeleteDateColumn({ type: 'timestamp with time zone', default: null })
    deleted_at: Date;

    // constructor(user: Partial<AppUser>) {
    //     Object.assign(this, user);
    // }
}