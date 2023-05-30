<?php

namespace App\MessageHandler;

use App\Message\RegisterConfirmation;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;
use Symfony\Component\Mime\Email;

class RegisterConfirmationHandler implements MessageHandlerInterface
{
    public function __construct(private MailerInterface $mailer)
    {

    }

    public function __invoke(RegisterConfirmation $registerConfirmation)
    {
            $email = (new Email())
            ->from('no-reply@everest.com')
            ->to($registerConfirmation->getUser()->getEmail())
            ->subject('Pomyślnie zarejestrowano')
                ->text('Twoje konto zostało pomyślnie zarejestrowane w aplikacji Everest!');
            $this->mailer->send($email);
    }
}