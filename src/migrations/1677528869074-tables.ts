import { MigrationInterface, QueryRunner } from "typeorm";

export class tables1677528869074 implements MigrationInterface {
    name = 'tables1677528869074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "year" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" ALTER COLUMN "year" SET NOT NULL`);
    }

}
