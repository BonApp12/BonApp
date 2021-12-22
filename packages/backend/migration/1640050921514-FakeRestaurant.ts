import { MigrationInterface, QueryRunner } from 'typeorm';

export class FakeRestaurant1640050921514 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO restaurant("name", "siren", "addressId") VALUES ('Gouna Supremacy', '0557845633215', 1)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM restaurant WHERE name = 'Gouna Supremacy'`,
    );
  }
}
