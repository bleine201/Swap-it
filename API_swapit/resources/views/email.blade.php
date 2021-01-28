@component('mail::message')
# Introduction
    {{$email}}
<b>Thank You For Using our App Confirm Your Email </b> 

@component('mail::button', ['url' => url('/callback/' . $token . '/' . $email)])
Button Text
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
