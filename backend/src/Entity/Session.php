<?php

namespace App\Entity;

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

    /**
     * @return int
     */
    public function getIdSession(): int
    {
        return $this->idSession;
    }

    /**
     * @param int $idSession
     */
    public function setIdSession(int $idSession): void
    {
        $this->idSession = $idSession;
    }

    /**
     * @return \DateTime
     */
    public function getLoginTime(): \DateTime
    {
        return $this->loginTime;
    }

    /**
     * @param \DateTime $loginTime
     */
    public function setLoginTime(\DateTime $loginTime): void
    {
        $this->loginTime = $loginTime;
    }

    /**
     * @return \DateTime
     */
    public function getLogoutTime(): \DateTime
    {
        return $this->logoutTime;
    }

    /**
     * @param \DateTime $logoutTime
     */
    public function setLogoutTime(\DateTime $logoutTime): void
    {
        $this->logoutTime = $logoutTime;
    }

    /**
     * @return User
     */
    public function getIdUser(): User
    {
        return $this->idUser;
    }

    /**
     * @param User $idUser
     */
    public function setIdUser(User $idUser): void
    {
        $this->idUser = $idUser;
    }


}
