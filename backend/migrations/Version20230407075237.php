<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230407075237 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category DROP FOREIGN KEY category_user_ID_user_fk');
        $this->addSql('DROP INDEX category_user_ID_user_fk ON category');
        $this->addSql('ALTER TABLE category DROP ID_user');
        $this->addSql('ALTER TABLE session DROP FOREIGN KEY FK_D044D5D4CEA2F6E1');
        $this->addSql('ALTER TABLE session ADD CONSTRAINT FK_D044D5D4CEA2F6E1 FOREIGN KEY (ID_user) REFERENCES user (ID_user)');
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY FK_527EDB25CEA2F6E1');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT FK_527EDB25CEA2F6E1 FOREIGN KEY (ID_user) REFERENCES user (ID_user)');
        $this->addSql('ALTER TABLE user_data DROP FOREIGN KEY FK_D772BFAACEA2F6E1');
        $this->addSql('ALTER TABLE user_data ADD CONSTRAINT FK_D772BFAACEA2F6E1 FOREIGN KEY (ID_user) REFERENCES user (ID_user)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category ADD ID_user INT DEFAULT NULL');
        $this->addSql('ALTER TABLE category ADD CONSTRAINT category_user_ID_user_fk FOREIGN KEY (ID_user) REFERENCES user (ID_user) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('CREATE INDEX category_user_ID_user_fk ON category (ID_user)');
        $this->addSql('ALTER TABLE session DROP FOREIGN KEY FK_D044D5D4CEA2F6E1');
        $this->addSql('ALTER TABLE session ADD CONSTRAINT FK_D044D5D4CEA2F6E1 FOREIGN KEY (ID_user) REFERENCES user (ID_user) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY FK_527EDB25CEA2F6E1');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT FK_527EDB25CEA2F6E1 FOREIGN KEY (ID_user) REFERENCES user (ID_user) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_data DROP FOREIGN KEY FK_D772BFAACEA2F6E1');
        $this->addSql('ALTER TABLE user_data ADD CONSTRAINT FK_D772BFAACEA2F6E1 FOREIGN KEY (ID_user) REFERENCES user (ID_user) ON UPDATE CASCADE ON DELETE CASCADE');
    }
}
