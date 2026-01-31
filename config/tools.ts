export type ToolConfig = {
    slug: string;
    category: 'CPS' | 'Reaction' | 'Typing' | 'Keyboard' | 'Mouse' | 'Display' | 'Other';
    component: 'ClickGame' | 'ReactionGame' | 'TypingGame' | 'KeyboardGame' | 'DeadPixelGame' | 'MousePrecisionGame' | 'LiveWorldCps' | 'Leaderboard';
    mode?: string;
    duration?: number;
    translationKey: string;
};

export const tools: ToolConfig[] = [
    // CPS Variations
    { slug: 'cps-test', category: 'CPS', component: 'ClickGame', mode: 'standard', duration: 10, translationKey: 'cps_default' },
    { slug: 'cps-test-1s', category: 'CPS', component: 'ClickGame', mode: 'standard', duration: 1, translationKey: 'cps_1s' },
    { slug: 'cps-test-5s', category: 'CPS', component: 'ClickGame', mode: 'standard', duration: 5, translationKey: 'cps_5s' },
    { slug: 'cps-test-60s', category: 'CPS', component: 'ClickGame', mode: 'standard', duration: 60, translationKey: 'cps_60s' },

    // Techniques
    { slug: 'jitter-click', category: 'CPS', component: 'ClickGame', mode: 'jitter', duration: 10, translationKey: 'jitter' },
    { slug: 'butterfly-click', category: 'CPS', component: 'ClickGame', mode: 'butterfly', duration: 10, translationKey: 'butterfly' },
    { slug: 'drag-click', category: 'CPS', component: 'ClickGame', mode: 'drag', duration: 10, translationKey: 'drag' },
    { slug: 'combo-click', category: 'CPS', component: 'ClickGame', mode: 'combo', duration: 10, translationKey: 'combo' },

    // Game Specific
    { slug: 'minecraft-cps', category: 'CPS', component: 'ClickGame', mode: 'minecraft', duration: 10, translationKey: 'minecraft' },
    { slug: 'roblox-cps', category: 'CPS', component: 'ClickGame', mode: 'roblox', duration: 10, translationKey: 'roblox' },
    { slug: 'pubg-cps', category: 'CPS', component: 'ClickGame', mode: 'pubg', duration: 10, translationKey: 'pubg' },
    { slug: 'valorant-cps', category: 'CPS', component: 'ClickGame', mode: 'valorant', duration: 10, translationKey: 'valorant' },
    { slug: 'fortnite-cps', category: 'CPS', component: 'ClickGame', mode: 'fortnite', duration: 10, translationKey: 'fortnite' },

    // Other Clicking
    { slug: 'spacebar-test', category: 'CPS', component: 'ClickGame', mode: 'spacebar', duration: 5, translationKey: 'spacebar' },
    { slug: 'stress-test', category: 'CPS', component: 'ClickGame', mode: 'stress', duration: 30, translationKey: 'stress' },

    // Mouse / Display
    { slug: 'dead-pixel', category: 'Display', component: 'DeadPixelGame', translationKey: 'dead_pixel' },
    { slug: 'mouse-precision', category: 'Mouse', component: 'MousePrecisionGame', translationKey: 'mouse_precision' },
    { slug: 'mouse-test', category: 'Mouse', component: 'MousePrecisionGame', mode: 'speed', translationKey: 'mouse_test' }, // Reusing precision game with speed mode or ClickGame? User said "Mouse Speed Test". Often just CPS but moving? I'll use MousePrecisionGame for now.

    // Typing / Keyboard
    { slug: 'typing-test', category: 'Typing', component: 'TypingGame', translationKey: 'typing' },
    { slug: 'typing-accuracy', category: 'Typing', component: 'TypingGame', mode: 'accuracy', translationKey: 'typing_accuracy' },
    { slug: 'keyboard-test', category: 'Keyboard', component: 'KeyboardGame', translationKey: 'keyboard' },

    // Reaction
    { slug: 'reaction-time', category: 'Reaction', component: 'ReactionGame', translationKey: 'reaction' },
    { slug: 'reaction-custom', category: 'Reaction', component: 'ReactionGame', mode: 'custom', translationKey: 'reaction_custom' },

    // Core
    { slug: 'world-live-cps', category: 'CPS', component: 'LiveWorldCps', translationKey: 'world_live' },
    { slug: 'leaderboard', category: 'Other', component: 'Leaderboard', translationKey: 'leaderboard' },
];
