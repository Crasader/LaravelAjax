<?php

namespace App\Listeners;

use App\Events\ForgotPasswordEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Mail;

class ForgotPasswordListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(ForgotPasswordEvent $event)
    {
        $user = $event->user;
        $name = $event->user->name;
        $email = $event->user->email;
        $password = $event->user->password;


        $data = [
            'name'=> $name,
            'email' => $email,
            'password' => $password
        ];

         Mail::to($email)->send(new \App\Mail\ForgotPasswordMail($user));
    }
}
