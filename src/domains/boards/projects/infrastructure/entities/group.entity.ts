import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@/libs/database/orm/typeorm/base/base.entity';
import { FileEntity } from './file.entity';
import { ProjectEntity } from './project.entity';



@Entity( { name: 'group' } )
export class GroupEntity extends BaseEntity {
  /**
   * Table Columns
   */
  @Column( { length: 250, nullable: true, comment: '그룹에 할당된 link' } )
  access_link: string;
  
  @Column( { length: 150, nullable: true, comment: '링크 접근 비밀번호, group_id의 첫 6문자' } )
  password: string;
  
  @Column( { type: 'bigint', comment: '연결된 프로젝트의 아이디' } )
  project_id: string;
  
  
  /**
   * Table Relations
   */
  @ManyToOne(
    () => ProjectEntity,
    project => project.groups,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    } )
  @JoinColumn( { name: 'project_id' } )
  project: ProjectEntity;
  
  @OneToMany(
    () => FileEntity,
    file => file.group, {
      cascade: true,
    } )
  files: FileEntity[];
  
  
  /**
   * Constructor Function
   */
  constructor( groupEntity: any ) {
    super();
    Object.assign( this, groupEntity );
  }
}
