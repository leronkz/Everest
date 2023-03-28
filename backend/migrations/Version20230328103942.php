<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230328103942 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE session DROP FOREIGN KEY session_user_ID_user_fk');
        $this->addSql('ALTER TABLE session CHANGE ID_user ID_user INT DEFAULT NULL');
        $this->addSql('ALTER TABLE session ADD CONSTRAINT FK_D044D5D4CEA2F6E1 FOREIGN KEY (ID_user) REFERENCES user (ID_user)');
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY task_category_ID_category_fk');
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY task_user_ID_user_fk');
        $this->addSql('ALTER TABLE task CHANGE ID_user ID_user INT DEFAULT NULL, CHANGE ID_category ID_category INT DEFAULT NULL');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT FK_527EDB259F567953 FOREIGN KEY (ID_category) REFERENCES category (ID_category)');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT FK_527EDB25CEA2F6E1 FOREIGN KEY (ID_user) REFERENCES user (ID_user)');
        $this->addSql('ALTER TABLE user CHANGE password password INT NOT NULL');
        $this->addSql('ALTER TABLE user_data DROP FOREIGN KEY user_data_user_ID_user_fk');
        $this->addSql('ALTER TABLE user_data CHANGE ID_user ID_user INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user_data ADD CONSTRAINT FK_D772BFAACEA2F6E1 FOREIGN KEY (ID_user) REFERENCES user (ID_user)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE messenger_messages');
        $this->addSql('ALTER TABLE session DROP FOREIGN KEY FK_D044D5D4CEA2F6E1');
        $this->addSql('ALTER TABLE session CHANGE ID_user ID_user INT NOT NULL');
        $this->addSql('ALTER TABLE session ADD CONSTRAINT session_user_ID_user_fk FOREIGN KEY (ID_user) REFERENCES user (ID_user) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY FK_527EDB259F567953');
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY FK_527EDB25CEA2F6E1');
        $this->addSql('ALTER TABLE task CHANGE ID_category ID_category INT NOT NULL, CHANGE ID_user ID_user INT NOT NULL');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT task_category_ID_category_fk FOREIGN KEY (ID_category) REFERENCES category (ID_category) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT task_user_ID_user_fk FOREIGN KEY (ID_user) REFERENCES user (ID_user) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user CHANGE password password VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE user_data DROP FOREIGN KEY FK_D772BFAACEA2F6E1');
        $this->addSql('ALTER TABLE user_data CHANGE ID_user ID_user INT NOT NULL');
        $this->addSql('ALTER TABLE user_data ADD CONSTRAINT user_data_user_ID_user_fk FOREIGN KEY (ID_user) REFERENCES user (ID_user) ON UPDATE CASCADE ON DELETE CASCADE');
    }
}
