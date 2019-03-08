import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Temperature {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    data: number;

    @Column()
    device?: string;

    @CreateDateColumn()
    date: Date;
}
