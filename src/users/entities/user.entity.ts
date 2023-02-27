import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { ResponseUserDto } from '../dto/responseUser.dto';
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserEntity {

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @Exclude()
  password: string

  @Column()
  login: string

  @VersionColumn()
  version: number

  @Column({ nullable: true })
  refreshToken: string;

  @CreateDateColumn({
    transformer: {
      to: (data: Date) => data,
      from: (data: Date) => data.getTime(),
    },
  })
  // @Transform(({ value }) => new Date(value).getTime())
  createdAt: number;

  @UpdateDateColumn({
      transformer: {
        to: (data: Date) => data,
        from: (data: Date) => data.getTime(),
      },
    })
  // @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number;

  toResponse(): ResponseUserDto {
    return new ResponseUserDto(this);
  }
}
