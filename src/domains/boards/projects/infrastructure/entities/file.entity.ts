import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@/libs/database/orm/typeorm/base/base.entity';
import { GroupEntity } from './group.entity';



@Entity( { name: 'file' } )
export class FileEntity extends BaseEntity {
  
  @Column( { length: 100, nullable: true, comment: '파일 이름' } )
  original_name: string;
  
  @Column( { nullable: true, comment: '디폴트 이미지 s3 url' } )
  thumbnail: string;
  
  @Column( { comment: '파일 용량, 단위 byte' } )
  size: string;
  
  @Column( { length: 100, comment: 's3 file path' } )
  s3_path: string;
  
  @DeleteDateColumn( { nullable: true } )
  deleted_at: Date;
  
  @Column( { type: 'bigint', comment: '그룹 id' } )
  group_id: string;
  
  @ManyToOne( () => GroupEntity, group => group.files, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  } )
  @JoinColumn( { name: 'group_id' } )
  group: GroupEntity;
  
}
