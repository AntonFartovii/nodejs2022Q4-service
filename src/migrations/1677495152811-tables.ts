import { MigrationInterface, QueryRunner } from "typeorm";

export class tables1677495152811 implements MigrationInterface {
    name = 'tables1677495152811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "refreshToken" character varying`);
        await queryRunner.query(`ALTER TABLE "album" DROP COLUMN "artistId"`);
        await queryRunner.query(`ALTER TABLE "album" ADD "artistId" uuid`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`);
        await queryRunner.query(`ALTER TABLE "album" DROP COLUMN "artistId"`);
        await queryRunner.query(`ALTER TABLE "album" ADD "artistId" character varying`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
    }

}
