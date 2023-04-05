<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

/**
 * Session
 *
 * @ORM\Table(name="session", indexes={@ORM\Index(name="session_user_ID_user_fk", columns={"ID_user"})})
 * @ORM\Entity(repositoryClass="App\Repository\SessionRepository")
 */
class Session
{
    /**
     * @var int
     *
     * @ORM\Column(name="ID_session", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idSession;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="login_time", type="datetime", nullable=false)
     */
    private $loginTime;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="logout_time", type="datetime", nullable=false)
     */
    private $logoutTime;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="ID_user", referencedColumnName="ID_user")
     * })
     */
    private $idUser;

    public function getIdSession(): ?int
    {
        return $this->idSession;
    }

    public function getLoginTime(): ?\DateTimeInterface
    {
        return $this->loginTime;
    }

    public function setLoginTime(\DateTimeInterface $loginTime): self
    {
        $this->loginTime = $loginTime;

        return $this;
    }

    public function getLogoutTime(): ?\DateTimeInterface
    {
        return $this->logoutTime;
    }

    public function setLogoutTime(\DateTimeInterface $logoutTime): self
    {
        $this->logoutTime = $logoutTime;

        return $this;
    }

    public function getIdUser(): ?User
    {
        return $this->idUser;
    }

    public function setIdUser(?User $idUser): self
    {
        $this->idUser = $idUser;

        return $this;
    }


}
