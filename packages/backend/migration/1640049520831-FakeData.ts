import { MigrationInterface, QueryRunner } from 'typeorm';

export class FakeData1640049520831 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO address ("address", "postal_code", "city") VALUES ('19 rue du Galion', '95380', 'Puiseux-en-France')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM address WHERE address = '19 rue du Galion'`,
    );
  }
}
