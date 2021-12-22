import { MigrationInterface, QueryRunner } from 'typeorm';

export class FakeCategory1640126206678 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO plate_category ("name") VALUES ('plat')`,
    );
    await queryRunner.query(
      `INSERT INTO plate_category ("name") VALUES ('dessert')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM plate_category WHERE name='plat'`);
    await queryRunner.query(`DELETE FROM plate_category WHERE name='dessert'`);
  }
}
