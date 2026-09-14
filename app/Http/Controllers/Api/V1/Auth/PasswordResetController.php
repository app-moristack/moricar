<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Actions\Auth\RevokeAccountSessions;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password as PasswordRule;
use Illuminate\Validation\ValidationException;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;

class PasswordResetController extends Controller
{
    public function sendLink(Request $request): JsonResponse
    {
        $validated = $request->validate(['email' => ['required', 'string', 'email', 'max:254']]);

        $mailer = config('mail.default');
        $deliveryConfigured = ! in_array($mailer, ['log', 'array'], true)
            && ($mailer !== 'smtp' || filled(config('mail.mailers.smtp.host')));

        if (! app()->isProduction() || $deliveryConfigured) {
            try {
                Password::sendResetLink($validated);
            } catch (TransportExceptionInterface $exception) {
                // Transport messages may contain credentials or recipient data.
                Log::warning('Password recovery delivery failed.', ['exception_type' => $exception::class]);
            }
        }

        return response()->json(['message' => 'If an account matches this email, you will receive password reset instructions.']);
    }

    public function reset(Request $request, RevokeAccountSessions $revokeSessions): JsonResponse
    {
        $validated = $request->validate([
            'token' => ['required', 'string', 'max:256'],
            'email' => ['required', 'string', 'email', 'max:254'],
            'password' => ['required', 'string', 'max:128', 'confirmed', PasswordRule::defaults()],
        ]);

        $status = Password::reset($validated, function ($user, string $password) use ($revokeSessions) {
            $user->forceFill([
                'password' => Hash::make($password),
                'remember_token' => Str::random(60),
            ])->save();
            $revokeSessions->handle($user);
        });

        if ($status !== Password::PASSWORD_RESET) {
            throw ValidationException::withMessages(['email' => __($status)]);
        }

        return response()->json(['message' => __($status)]);
    }
}
