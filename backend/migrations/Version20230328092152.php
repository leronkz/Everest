<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230328092152 extends AbstractMigration
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
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY task_category_ID_category_fk');
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY task_user_ID_user_fk');
        $this->addSql('ALTER TABLE user_data DROP FOREIGN KEY user_data_user_ID_user_fk');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE session');
        $this->addSql('DROP TABLE task');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_data');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE category (ID_category INT AUTO_INCREMENT NOT NULL, category_name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_0900_ai_ci`, PRIMARY KEY(ID_category)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE session (ID_session INT AUTO_INCREMENT NOT NULL, ID_user INT NOT NULL, login_time DATETIME NOT NULL, logout_time DATETIME NOT NULL, INDEX session_user_ID_user_fk (ID_user), PRIMARY KEY(ID_session)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE task (ID_task INT AUTO_INCREMENT NOT NULL, ID_user INT NOT NULL, title VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_0900_ai_ci`, description VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, deadline DATE NOT NULL, priority VARCHAR(100) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_0900_ai_ci`, ID_category INT NOT NULL, INDEX task_category_ID_category_fk (ID_category), INDEX task_user_ID_user_fk (ID_user), PRIMARY KEY(ID_task)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE user (ID_user INT AUTO_INCREMENT NOT NULL, email VARCHAR(100) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_0900_ai_ci`, password VARCHAR(100) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_0900_ai_ci`, UNIQUE INDEX email (email), PRIMARY KEY(ID_user)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE user_data (ID_user_data INT AUTO_INCREMENT NOT NULL, ID_user INT NOT NULL, name VARCHAR(100) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, surname VARCHAR(100) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, birth_date DATE DEFAULT NULL, image VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_0900_ai_ci`, INDEX user_data_user_ID_user_fk (ID_user), PRIMARY KEY(ID_user_data)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE session ADD CONSTRAINT session_user_ID_user_fk FOREIGN KEY (ID_user) REFERENCES user (ID_user) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT task_category_ID_category_fk FOREIGN KEY (ID_category) REFERENCES category (ID_category) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT task_user_ID_user_fk FOREIGN KEY (ID_user) REFERENCES user (ID_user) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_data ADD CONSTRAINT user_data_user_ID_user_fk FOREIGN KEY (ID_user) REFERENCES user (ID_user) ON UPDATE CASCADE ON DELETE CASCADE');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
