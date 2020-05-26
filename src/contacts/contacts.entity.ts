import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
export interface TypedTransformer<TEntity, TDatabase> {
  to: (entityValue: TEntity) => TDatabase;
  from: (databaseValue: TDatabase) => TEntity;
}

export const dateTransformer: TypedTransformer<Date, string> = {
  to: (value: Date) => { return value.toISOString() },
  from: (value: string) => { return new Date(value); }
} as const;
@Entity()
export class Contacts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ transformer: dateTransformer })
  bod!: Date;

  @Column()
  phone?: string;

  @Column()
  email?: string;

  @Column()
  url?: string;

  @Column()
  groupid: number;

  @Column()
  owner: number;
}