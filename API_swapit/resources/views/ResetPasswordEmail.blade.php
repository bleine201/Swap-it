@component('mail::message')

<b>You have requested to reset your password </b>
<p>here is the code {{$code}}</p>

Thanks,<br>
{{ config('app.name') }}
@endcomponent
