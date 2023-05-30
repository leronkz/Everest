<?php

namespace App\Message;

use App\Entity\User;

class DeleteConfirmation
{
    private User $user;
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function getUser(): User
    {
        return $this->user;
    }
}