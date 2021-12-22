import { MigrationInterface, QueryRunner } from 'typeorm';

export class FakePlate1640126231779 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO plate ("name", "restaurantId", "categoryId") VALUES ('Grec un peu chelou', 1, 1)`,
    );
    await queryRunner.query(
      `INSERT INTO plate ("name", "restaurantId", "categoryId") VALUES ('Grec plus ou moins bon', 1, 1)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM plate WHERE name='Grec un peu chelou'`,
    );
    await queryRunner.query(
      `DELETE FROM plate WHERE name='Grec plus ou moins bon'`,
    );
  }
}
