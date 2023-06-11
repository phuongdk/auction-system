import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { AppUser } from 'src/api/users/entities/appuser.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ type: 'varchar', nullable: false })
    status: string;

    @Column({ type: 'int' })
    time_window: number;

    @Exclude()
    @CreateDateColumn({type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP(6)'})
    created_at: Date;

    @Exclude()
    @UpdateDateColumn({type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP(6)'})
    updated_at: Date;

    @Exclude()
    @DeleteDateColumn({type: 'timestamp with time zone', default: null})
    deleted_at: Date;

    @ManyToOne(() => AppUser, (user) => user.products)
    user: AppUser
}