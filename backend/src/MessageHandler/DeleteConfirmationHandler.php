<?php

namespace App\MessageHandler;

use App\Message\DeleteConfirmation;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;
use Symfony\Component\Mime\Email;

class DeleteConfirmationHandler implements MessageHandlerInterface
{

    public function __construct(private MailerInterface $mailer)
    {

    }

    public function __invoke(DeleteConfirmation $deleteConfirmation)
    {
        $email = (new Email())
            ->from('no-reply@everest.com')
            ->to($deleteConfirmation->getUser()->getEmail())
            ->subject('Pomyślnie usunięto konto')
            ->text('Twoje konto zostało pomyślnie usunięte z aplikacji Everest! 
                          Dziękujemy za korzystanie z aplikacji!');
        $this->mailer->send($email);
    }
}