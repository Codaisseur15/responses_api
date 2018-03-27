import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'


@Entity()
export class Response extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('int')
  courseId: number

  @Column('int', {nullable: true})
  studentId: number

  @Column('int')
  quizId: number

  @Column('json')
  quizResponse: { [questionId: number]: number[] }

  @Column('real')
  score: number

  @Column('real')
  maxScore: number
}

// { [questionId: number]: { Answer: number[] } };


// @Entity()
// export class Answer extends BaseEntity {
//
//   @PrimaryGeneratedColumn()
//   id?: number
//
//   @Column()
//   answerId: number
//
// }
//
// @Entity()
// export class Question extends BaseEntity {
//
//   @PrimaryGeneratedColumn()
//   id?: number
//
//   @Column()
//   questionId: number
//
// }
