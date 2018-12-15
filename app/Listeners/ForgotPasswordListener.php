<?php

namespace App\Listeners;

use App\Events\ForgotPasswordEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

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
        $name = $event->user->name;
        $email = $event->user->email;

        // Send email
    }
}
