import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Lux {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    data: number;

    @Column()
    device?: string;

    @CreateDateColumn()
    date: Date;
}
