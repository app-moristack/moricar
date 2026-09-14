<?php

return [
    'admin' => [
        'email' => env('ADMIN_EMAIL', 'admin@moricar.mu'),
        'password' => env('ADMIN_PASSWORD'),
    ],

    'support_email' => env('MORICAR_SUPPORT_EMAIL', 'hello@moricar.duckdns.org'),
    'support_whatsapp' => env('MORICAR_SUPPORT_WHATSAPP', '+23057079335'),

    'search' => [
        'default_radius_km' => (int) env('MORICAR_DEFAULT_RADIUS_KM', 10),
        'max_radius_km' => (int) env('MORICAR_MAX_RADIUS_KM', 50),
        'radius_options_km' => [2, 5, 10, 20, 30, 50],
        'per_page' => 12,
        'max_per_page' => 50,
    ],

    'moderation' => [
        'review_on_sensitive_edit' => (bool) env('MORICAR_REVIEW_ON_SENSITIVE_EDIT', true),
    ],

    'whatsapp' => [
        'message_template' => env(
            'MORICAR_WHATSAPP_TEMPLATE',
            'Hello, I found your listing on :app. I would like to know more about :service.',
        ),
    ],

    'uploads' => [
        'max_kilobytes' => 5120,
        'min_dimension' => 200,
        'max_dimension' => 6000,
        'mime_types' => ['image/jpeg', 'image/png', 'image/webp'],
        'max_portfolio_images' => 20,
    ],
];
