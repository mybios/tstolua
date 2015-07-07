/// <reference path="core.ts"/>
/// <reference path="diagnosticInformationMap.generated.ts"/>
local ts;
(function (ts) {
    local textToToken = {
        "any": SyntaxKind.AnyKeyword,
        "as": SyntaxKind.AsKeyword,
        "boolean": SyntaxKind.BooleanKeyword,
        "break": SyntaxKind.BreakKeyword,
        "case": SyntaxKind.CaseKeyword,
        "catch": SyntaxKind.CatchKeyword,
        "class": SyntaxKind.ClassKeyword,
        "continue": SyntaxKind.ContinueKeyword,
        "const": SyntaxKind.ConstKeyword,
        "constructor": SyntaxKind.ConstructorKeyword,
        "debugger": SyntaxKind.DebuggerKeyword,
        "declare": SyntaxKind.DeclareKeyword,
        "default": SyntaxKind.DefaultKeyword,
        "delete": SyntaxKind.DeleteKeyword,
        "do": SyntaxKind.DoKeyword,
        "else": SyntaxKind.ElseKeyword,
        "enum": SyntaxKind.EnumKeyword,
        "export": SyntaxKind.ExportKeyword,
        "extends": SyntaxKind.ExtendsKeyword,
        "false": SyntaxKind.FalseKeyword,
        "finally": SyntaxKind.FinallyKeyword,
        "for": SyntaxKind.ForKeyword,
        "from": SyntaxKind.FromKeyword,
        "function": SyntaxKind.FunctionKeyword,
        "get": SyntaxKind.GetKeyword,
        "if": SyntaxKind.IfKeyword,
        "implements": SyntaxKind.ImplementsKeyword,
        "import": SyntaxKind.ImportKeyword,
        "in": SyntaxKind.InKeyword,
        "instanceof": SyntaxKind.InstanceOfKeyword,
        "interface": SyntaxKind.InterfaceKeyword,
        "let": SyntaxKind.LetKeyword,
        "module": SyntaxKind.ModuleKeyword,
        "namespace": SyntaxKind.NamespaceKeyword,
        "new": SyntaxKind.NewKeyword,
        "null": SyntaxKind.NullKeyword,
        "number": SyntaxKind.NumberKeyword,
        "package": SyntaxKind.PackageKeyword,
        "private": SyntaxKind.PrivateKeyword,
        "protected": SyntaxKind.ProtectedKeyword,
        "public": SyntaxKind.PublicKeyword,
        "require": SyntaxKind.RequireKeyword,
        "return": SyntaxKind.ReturnKeyword,
        "set": SyntaxKind.SetKeyword,
        "static": SyntaxKind.StaticKeyword,
        "string": SyntaxKind.StringKeyword,
        "super": SyntaxKind.SuperKeyword,
        "switch": SyntaxKind.SwitchKeyword,
        "symbol": SyntaxKind.SymbolKeyword,
        "this": SyntaxKind.ThisKeyword,
        "throw": SyntaxKind.ThrowKeyword,
        "true": SyntaxKind.TrueKeyword,
        "try": SyntaxKind.TryKeyword,
        "type": SyntaxKind.TypeKeyword,
        "typeof": SyntaxKind.TypeOfKeyword,
        "var": SyntaxKind.VarKeyword,
        "void": SyntaxKind.VoidKeyword,
        "while": SyntaxKind.WhileKeyword,
        "with": SyntaxKind.WithKeyword,
        "yield": SyntaxKind.YieldKeyword,
        "of": SyntaxKind.OfKeyword,
        "{": SyntaxKind.OpenBraceToken,
        // for lua
        //"}": SyntaxKind.CloseBraceToken,
        "end": SyntaxKind.CloseBraceToken,
        "(": SyntaxKind.OpenParenToken,
        ")": SyntaxKind.CloseParenToken,
        "[": SyntaxKind.OpenBracketToken,
        "]": SyntaxKind.CloseBracketToken,
        ".": SyntaxKind.DotToken,
        "...": SyntaxKind.DotDotDotToken,
        ";": SyntaxKind.SemicolonToken,
        ",": SyntaxKind.CommaToken,
        "<": SyntaxKind.LessThanToken,
        ">": SyntaxKind.GreaterThanToken,
        "<=": SyntaxKind.LessThanEqualsToken,
        ">=": SyntaxKind.GreaterThanEqualsToken,
        "==": SyntaxKind.EqualsEqualsToken,
        "!=": SyntaxKind.ExclamationEqualsToken,
        "===": SyntaxKind.EqualsEqualsEqualsToken,
        "!==": SyntaxKind.ExclamationEqualsEqualsToken,
        "=>": SyntaxKind.EqualsGreaterThanToken,
        "+": SyntaxKind.PlusToken,
        "-": SyntaxKind.MinusToken,
        "*": SyntaxKind.AsteriskToken,
        "/": SyntaxKind.SlashToken,
        "%": SyntaxKind.PercentToken,
        "++": SyntaxKind.PlusPlusToken,
        "--": SyntaxKind.MinusMinusToken,
        "<<": SyntaxKind.LessThanLessThanToken,
        ">>": SyntaxKind.GreaterThanGreaterThanToken,
        ">>>": SyntaxKind.GreaterThanGreaterThanGreaterThanToken,
        "&": SyntaxKind.AmpersandToken,
        "|": SyntaxKind.BarToken,
        "^": SyntaxKind.CaretToken,
        "!": SyntaxKind.ExclamationToken,
        "~": SyntaxKind.TildeToken,
        "&&": SyntaxKind.AmpersandAmpersandToken,
        "||": SyntaxKind.BarBarToken,
        "?": SyntaxKind.QuestionToken,
        ":": SyntaxKind.ColonToken,
        "=": SyntaxKind.EqualsToken,
        "+=": SyntaxKind.PlusEqualsToken,
        "-=": SyntaxKind.MinusEqualsToken,
        "*=": SyntaxKind.AsteriskEqualsToken,
        "/=": SyntaxKind.SlashEqualsToken,
        "%=": SyntaxKind.PercentEqualsToken,
        "<<=": SyntaxKind.LessThanLessThanEqualsToken,
        ">>=": SyntaxKind.GreaterThanGreaterThanEqualsToken,
        ">>>=": SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken,
        "&=": SyntaxKind.AmpersandEqualsToken,
        "|=": SyntaxKind.BarEqualsToken,
        "^=": SyntaxKind.CaretEqualsToken,
        "@": SyntaxKind.AtToken
    };
    /*
        As per ECMAScript Language Specification 3th Edition, Section 7.6: Identifiers
        IdentifierStart ::
            Can contain Unicode 3.0.0  categories:
            Uppercase letter (Lu),
            Lowercase letter (Ll),
            Titlecase letter (Lt),
            Modifier letter (Lm),
            Other letter (Lo), or
            Letter number (Nl).
        IdentifierPart :: =
            Can contain IdentifierStart + Unicode 3.0.0  categories:
            Non-spacing mark (Mn),
            Combining spacing mark (Mc),
            Decimal number (Nd), or
            Connector punctuation (Pc).

        Codepoint ranges for ES3 Identifiers are extracted from the Unicode 3.0.0 specification at:
        http://www.unicode.org/Public/3.0-Update/UnicodeData-3.0.0.txt
    */
    local unicodeES3IdentifierStart = [170, 170, 181, 181, 186, 186, 192, 214, 216, 246, 248, 543, 546, 563, 592, 685, 688, 696, 699, 705, 720, 721, 736, 740, 750, 750, 890, 890, 902, 902, 904, 906, 908, 908, 910, 929, 931, 974, 976, 983, 986, 1011, 1024, 1153, 1164, 1220, 1223, 1224, 1227, 1228, 1232, 1269, 1272, 1273, 1329, 1366, 1369, 1369, 1377, 1415, 1488, 1514, 1520, 1522, 1569, 1594, 1600, 1610, 1649, 1747, 1749, 1749, 1765, 1766, 1786, 1788, 1808, 1808, 1810, 1836, 1920, 1957, 2309, 2361, 2365, 2365, 2384, 2384, 2392, 2401, 2437, 2444, 2447, 2448, 2451, 2472, 2474, 2480, 2482, 2482, 2486, 2489, 2524, 2525, 2527, 2529, 2544, 2545, 2565, 2570, 2575, 2576, 2579, 2600, 2602, 2608, 2610, 2611, 2613, 2614, 2616, 2617, 2649, 2652, 2654, 2654, 2674, 2676, 2693, 2699, 2701, 2701, 2703, 2705, 2707, 2728, 2730, 2736, 2738, 2739, 2741, 2745, 2749, 2749, 2768, 2768, 2784, 2784, 2821, 2828, 2831, 2832, 2835, 2856, 2858, 2864, 2866, 2867, 2870, 2873, 2877, 2877, 2908, 2909, 2911, 2913, 2949, 2954, 2958, 2960, 2962, 2965, 2969, 2970, 2972, 2972, 2974, 2975, 2979, 2980, 2984, 2986, 2990, 2997, 2999, 3001, 3077, 3084, 3086, 3088, 3090, 3112, 3114, 3123, 3125, 3129, 3168, 3169, 3205, 3212, 3214, 3216, 3218, 3240, 3242, 3251, 3253, 3257, 3294, 3294, 3296, 3297, 3333, 3340, 3342, 3344, 3346, 3368, 3370, 3385, 3424, 3425, 3461, 3478, 3482, 3505, 3507, 3515, 3517, 3517, 3520, 3526, 3585, 3632, 3634, 3635, 3648, 3654, 3713, 3714, 3716, 3716, 3719, 3720, 3722, 3722, 3725, 3725, 3732, 3735, 3737, 3743, 3745, 3747, 3749, 3749, 3751, 3751, 3754, 3755, 3757, 3760, 3762, 3763, 3773, 3773, 3776, 3780, 3782, 3782, 3804, 3805, 3840, 3840, 3904, 3911, 3913, 3946, 3976, 3979, 4096, 4129, 4131, 4135, 4137, 4138, 4176, 4181, 4256, 4293, 4304, 4342, 4352, 4441, 4447, 4514, 4520, 4601, 4608, 4614, 4616, 4678, 4680, 4680, 4682, 4685, 4688, 4694, 4696, 4696, 4698, 4701, 4704, 4742, 4744, 4744, 4746, 4749, 4752, 4782, 4784, 4784, 4786, 4789, 4792, 4798, 4800, 4800, 4802, 4805, 4808, 4814, 4816, 4822, 4824, 4846, 4848, 4878, 4880, 4880, 4882, 4885, 4888, 4894, 4896, 4934, 4936, 4954, 5024, 5108, 5121, 5740, 5743, 5750, 5761, 5786, 5792, 5866, 6016, 6067, 6176, 6263, 6272, 6312, 7680, 7835, 7840, 7929, 7936, 7957, 7960, 7965, 7968, 8005, 8008, 8013, 8016, 8023, 8025, 8025, 8027, 8027, 8029, 8029, 8031, 8061, 8064, 8116, 8118, 8124, 8126, 8126, 8130, 8132, 8134, 8140, 8144, 8147, 8150, 8155, 8160, 8172, 8178, 8180, 8182, 8188, 8319, 8319, 8450, 8450, 8455, 8455, 8458, 8467, 8469, 8469, 8473, 8477, 8484, 8484, 8486, 8486, 8488, 8488, 8490, 8493, 8495, 8497, 8499, 8505, 8544, 8579, 12293, 12295, 12321, 12329, 12337, 12341, 12344, 12346, 12353, 12436, 12445, 12446, 12449, 12538, 12540, 12542, 12549, 12588, 12593, 12686, 12704, 12727, 13312, 19893, 19968, 40869, 40960, 42124, 44032, 55203, 63744, 64045, 64256, 64262, 64275, 64279, 64285, 64285, 64287, 64296, 64298, 64310, 64312, 64316, 64318, 64318, 64320, 64321, 64323, 64324, 64326, 64433, 64467, 64829, 64848, 64911, 64914, 64967, 65008, 65019, 65136, 65138, 65140, 65140, 65142, 65276, 65313, 65338, 65345, 65370, 65382, 65470, 65474, 65479, 65482, 65487, 65490, 65495, 65498, 65500,];
    local unicodeES3IdentifierPart = [170, 170, 181, 181, 186, 186, 192, 214, 216, 246, 248, 543, 546, 563, 592, 685, 688, 696, 699, 705, 720, 721, 736, 740, 750, 750, 768, 846, 864, 866, 890, 890, 902, 902, 904, 906, 908, 908, 910, 929, 931, 974, 976, 983, 986, 1011, 1024, 1153, 1155, 1158, 1164, 1220, 1223, 1224, 1227, 1228, 1232, 1269, 1272, 1273, 1329, 1366, 1369, 1369, 1377, 1415, 1425, 1441, 1443, 1465, 1467, 1469, 1471, 1471, 1473, 1474, 1476, 1476, 1488, 1514, 1520, 1522, 1569, 1594, 1600, 1621, 1632, 1641, 1648, 1747, 1749, 1756, 1759, 1768, 1770, 1773, 1776, 1788, 1808, 1836, 1840, 1866, 1920, 1968, 2305, 2307, 2309, 2361, 2364, 2381, 2384, 2388, 2392, 2403, 2406, 2415, 2433, 2435, 2437, 2444, 2447, 2448, 2451, 2472, 2474, 2480, 2482, 2482, 2486, 2489, 2492, 2492, 2494, 2500, 2503, 2504, 2507, 2509, 2519, 2519, 2524, 2525, 2527, 2531, 2534, 2545, 2562, 2562, 2565, 2570, 2575, 2576, 2579, 2600, 2602, 2608, 2610, 2611, 2613, 2614, 2616, 2617, 2620, 2620, 2622, 2626, 2631, 2632, 2635, 2637, 2649, 2652, 2654, 2654, 2662, 2676, 2689, 2691, 2693, 2699, 2701, 2701, 2703, 2705, 2707, 2728, 2730, 2736, 2738, 2739, 2741, 2745, 2748, 2757, 2759, 2761, 2763, 2765, 2768, 2768, 2784, 2784, 2790, 2799, 2817, 2819, 2821, 2828, 2831, 2832, 2835, 2856, 2858, 2864, 2866, 2867, 2870, 2873, 2876, 2883, 2887, 2888, 2891, 2893, 2902, 2903, 2908, 2909, 2911, 2913, 2918, 2927, 2946, 2947, 2949, 2954, 2958, 2960, 2962, 2965, 2969, 2970, 2972, 2972, 2974, 2975, 2979, 2980, 2984, 2986, 2990, 2997, 2999, 3001, 3006, 3010, 3014, 3016, 3018, 3021, 3031, 3031, 3047, 3055, 3073, 3075, 3077, 3084, 3086, 3088, 3090, 3112, 3114, 3123, 3125, 3129, 3134, 3140, 3142, 3144, 3146, 3149, 3157, 3158, 3168, 3169, 3174, 3183, 3202, 3203, 3205, 3212, 3214, 3216, 3218, 3240, 3242, 3251, 3253, 3257, 3262, 3268, 3270, 3272, 3274, 3277, 3285, 3286, 3294, 3294, 3296, 3297, 3302, 3311, 3330, 3331, 3333, 3340, 3342, 3344, 3346, 3368, 3370, 3385, 3390, 3395, 3398, 3400, 3402, 3405, 3415, 3415, 3424, 3425, 3430, 3439, 3458, 3459, 3461, 3478, 3482, 3505, 3507, 3515, 3517, 3517, 3520, 3526, 3530, 3530, 3535, 3540, 3542, 3542, 3544, 3551, 3570, 3571, 3585, 3642, 3648, 3662, 3664, 3673, 3713, 3714, 3716, 3716, 3719, 3720, 3722, 3722, 3725, 3725, 3732, 3735, 3737, 3743, 3745, 3747, 3749, 3749, 3751, 3751, 3754, 3755, 3757, 3769, 3771, 3773, 3776, 3780, 3782, 3782, 3784, 3789, 3792, 3801, 3804, 3805, 3840, 3840, 3864, 3865, 3872, 3881, 3893, 3893, 3895, 3895, 3897, 3897, 3902, 3911, 3913, 3946, 3953, 3972, 3974, 3979, 3984, 3991, 3993, 4028, 4038, 4038, 4096, 4129, 4131, 4135, 4137, 4138, 4140, 4146, 4150, 4153, 4160, 4169, 4176, 4185, 4256, 4293, 4304, 4342, 4352, 4441, 4447, 4514, 4520, 4601, 4608, 4614, 4616, 4678, 4680, 4680, 4682, 4685, 4688, 4694, 4696, 4696, 4698, 4701, 4704, 4742, 4744, 4744, 4746, 4749, 4752, 4782, 4784, 4784, 4786, 4789, 4792, 4798, 4800, 4800, 4802, 4805, 4808, 4814, 4816, 4822, 4824, 4846, 4848, 4878, 4880, 4880, 4882, 4885, 4888, 4894, 4896, 4934, 4936, 4954, 4969, 4977, 5024, 5108, 5121, 5740, 5743, 5750, 5761, 5786, 5792, 5866, 6016, 6099, 6112, 6121, 6160, 6169, 6176, 6263, 6272, 6313, 7680, 7835, 7840, 7929, 7936, 7957, 7960, 7965, 7968, 8005, 8008, 8013, 8016, 8023, 8025, 8025, 8027, 8027, 8029, 8029, 8031, 8061, 8064, 8116, 8118, 8124, 8126, 8126, 8130, 8132, 8134, 8140, 8144, 8147, 8150, 8155, 8160, 8172, 8178, 8180, 8182, 8188, 8255, 8256, 8319, 8319, 8400, 8412, 8417, 8417, 8450, 8450, 8455, 8455, 8458, 8467, 8469, 8469, 8473, 8477, 8484, 8484, 8486, 8486, 8488, 8488, 8490, 8493, 8495, 8497, 8499, 8505, 8544, 8579, 12293, 12295, 12321, 12335, 12337, 12341, 12344, 12346, 12353, 12436, 12441, 12442, 12445, 12446, 12449, 12542, 12549, 12588, 12593, 12686, 12704, 12727, 13312, 19893, 19968, 40869, 40960, 42124, 44032, 55203, 63744, 64045, 64256, 64262, 64275, 64279, 64285, 64296, 64298, 64310, 64312, 64316, 64318, 64318, 64320, 64321, 64323, 64324, 64326, 64433, 64467, 64829, 64848, 64911, 64914, 64967, 65008, 65019, 65056, 65059, 65075, 65076, 65101, 65103, 65136, 65138, 65140, 65140, 65142, 65276, 65296, 65305, 65313, 65338, 65343, 65343, 65345, 65370, 65381, 65470, 65474, 65479, 65482, 65487, 65490, 65495, 65498, 65500,];
    /*
        As per ECMAScript Language Specification 5th Edition, Section 7.6: ISyntaxToken Names and Identifiers
        IdentifierStart ::
            Can contain Unicode 6.2  categories:
            Uppercase letter (Lu),
            Lowercase letter (Ll),
            Titlecase letter (Lt),
            Modifier letter (Lm),
            Other letter (Lo), or
            Letter number (Nl).
        IdentifierPart ::
            Can contain IdentifierStart + Unicode 6.2  categories:
            Non-spacing mark (Mn),
            Combining spacing mark (Mc),
            Decimal number (Nd),
            Connector punctuation (Pc),
            <ZWNJ>, or
            <ZWJ>.

        Codepoint ranges for ES5 Identifiers are extracted from the Unicode 6.2 specification at:
        http://www.unicode.org/Public/6.2.0/ucd/UnicodeData.txt
    */
    local unicodeES5IdentifierStart = [170, 170, 181, 181, 186, 186, 192, 214, 216, 246, 248, 705, 710, 721, 736, 740, 748, 748, 750, 750, 880, 884, 886, 887, 890, 893, 902, 902, 904, 906, 908, 908, 910, 929, 931, 1013, 1015, 1153, 1162, 1319, 1329, 1366, 1369, 1369, 1377, 1415, 1488, 1514, 1520, 1522, 1568, 1610, 1646, 1647, 1649, 1747, 1749, 1749, 1765, 1766, 1774, 1775, 1786, 1788, 1791, 1791, 1808, 1808, 1810, 1839, 1869, 1957, 1969, 1969, 1994, 2026, 2036, 2037, 2042, 2042, 2048, 2069, 2074, 2074, 2084, 2084, 2088, 2088, 2112, 2136, 2208, 2208, 2210, 2220, 2308, 2361, 2365, 2365, 2384, 2384, 2392, 2401, 2417, 2423, 2425, 2431, 2437, 2444, 2447, 2448, 2451, 2472, 2474, 2480, 2482, 2482, 2486, 2489, 2493, 2493, 2510, 2510, 2524, 2525, 2527, 2529, 2544, 2545, 2565, 2570, 2575, 2576, 2579, 2600, 2602, 2608, 2610, 2611, 2613, 2614, 2616, 2617, 2649, 2652, 2654, 2654, 2674, 2676, 2693, 2701, 2703, 2705, 2707, 2728, 2730, 2736, 2738, 2739, 2741, 2745, 2749, 2749, 2768, 2768, 2784, 2785, 2821, 2828, 2831, 2832, 2835, 2856, 2858, 2864, 2866, 2867, 2869, 2873, 2877, 2877, 2908, 2909, 2911, 2913, 2929, 2929, 2947, 2947, 2949, 2954, 2958, 2960, 2962, 2965, 2969, 2970, 2972, 2972, 2974, 2975, 2979, 2980, 2984, 2986, 2990, 3001, 3024, 3024, 3077, 3084, 3086, 3088, 3090, 3112, 3114, 3123, 3125, 3129, 3133, 3133, 3160, 3161, 3168, 3169, 3205, 3212, 3214, 3216, 3218, 3240, 3242, 3251, 3253, 3257, 3261, 3261, 3294, 3294, 3296, 3297, 3313, 3314, 3333, 3340, 3342, 3344, 3346, 3386, 3389, 3389, 3406, 3406, 3424, 3425, 3450, 3455, 3461, 3478, 3482, 3505, 3507, 3515, 3517, 3517, 3520, 3526, 3585, 3632, 3634, 3635, 3648, 3654, 3713, 3714, 3716, 3716, 3719, 3720, 3722, 3722, 3725, 3725, 3732, 3735, 3737, 3743, 3745, 3747, 3749, 3749, 3751, 3751, 3754, 3755, 3757, 3760, 3762, 3763, 3773, 3773, 3776, 3780, 3782, 3782, 3804, 3807, 3840, 3840, 3904, 3911, 3913, 3948, 3976, 3980, 4096, 4138, 4159, 4159, 4176, 4181, 4186, 4189, 4193, 4193, 4197, 4198, 4206, 4208, 4213, 4225, 4238, 4238, 4256, 4293, 4295, 4295, 4301, 4301, 4304, 4346, 4348, 4680, 4682, 4685, 4688, 4694, 4696, 4696, 4698, 4701, 4704, 4744, 4746, 4749, 4752, 4784, 4786, 4789, 4792, 4798, 4800, 4800, 4802, 4805, 4808, 4822, 4824, 4880, 4882, 4885, 4888, 4954, 4992, 5007, 5024, 5108, 5121, 5740, 5743, 5759, 5761, 5786, 5792, 5866, 5870, 5872, 5888, 5900, 5902, 5905, 5920, 5937, 5952, 5969, 5984, 5996, 5998, 6000, 6016, 6067, 6103, 6103, 6108, 6108, 6176, 6263, 6272, 6312, 6314, 6314, 6320, 6389, 6400, 6428, 6480, 6509, 6512, 6516, 6528, 6571, 6593, 6599, 6656, 6678, 6688, 6740, 6823, 6823, 6917, 6963, 6981, 6987, 7043, 7072, 7086, 7087, 7098, 7141, 7168, 7203, 7245, 7247, 7258, 7293, 7401, 7404, 7406, 7409, 7413, 7414, 7424, 7615, 7680, 7957, 7960, 7965, 7968, 8005, 8008, 8013, 8016, 8023, 8025, 8025, 8027, 8027, 8029, 8029, 8031, 8061, 8064, 8116, 8118, 8124, 8126, 8126, 8130, 8132, 8134, 8140, 8144, 8147, 8150, 8155, 8160, 8172, 8178, 8180, 8182, 8188, 8305, 8305, 8319, 8319, 8336, 8348, 8450, 8450, 8455, 8455, 8458, 8467, 8469, 8469, 8473, 8477, 8484, 8484, 8486, 8486, 8488, 8488, 8490, 8493, 8495, 8505, 8508, 8511, 8517, 8521, 8526, 8526, 8544, 8584, 11264, 11310, 11312, 11358, 11360, 11492, 11499, 11502, 11506, 11507, 11520, 11557, 11559, 11559, 11565, 11565, 11568, 11623, 11631, 11631, 11648, 11670, 11680, 11686, 11688, 11694, 11696, 11702, 11704, 11710, 11712, 11718, 11720, 11726, 11728, 11734, 11736, 11742, 11823, 11823, 12293, 12295, 12321, 12329, 12337, 12341, 12344, 12348, 12353, 12438, 12445, 12447, 12449, 12538, 12540, 12543, 12549, 12589, 12593, 12686, 12704, 12730, 12784, 12799, 13312, 19893, 19968, 40908, 40960, 42124, 42192, 42237, 42240, 42508, 42512, 42527, 42538, 42539, 42560, 42606, 42623, 42647, 42656, 42735, 42775, 42783, 42786, 42888, 42891, 42894, 42896, 42899, 42912, 42922, 43000, 43009, 43011, 43013, 43015, 43018, 43020, 43042, 43072, 43123, 43138, 43187, 43250, 43255, 43259, 43259, 43274, 43301, 43312, 43334, 43360, 43388, 43396, 43442, 43471, 43471, 43520, 43560, 43584, 43586, 43588, 43595, 43616, 43638, 43642, 43642, 43648, 43695, 43697, 43697, 43701, 43702, 43705, 43709, 43712, 43712, 43714, 43714, 43739, 43741, 43744, 43754, 43762, 43764, 43777, 43782, 43785, 43790, 43793, 43798, 43808, 43814, 43816, 43822, 43968, 44002, 44032, 55203, 55216, 55238, 55243, 55291, 63744, 64109, 64112, 64217, 64256, 64262, 64275, 64279, 64285, 64285, 64287, 64296, 64298, 64310, 64312, 64316, 64318, 64318, 64320, 64321, 64323, 64324, 64326, 64433, 64467, 64829, 64848, 64911, 64914, 64967, 65008, 65019, 65136, 65140, 65142, 65276, 65313, 65338, 65345, 65370, 65382, 65470, 65474, 65479, 65482, 65487, 65490, 65495, 65498, 65500,];
    local unicodeES5IdentifierPart = [170, 170, 181, 181, 186, 186, 192, 214, 216, 246, 248, 705, 710, 721, 736, 740, 748, 748, 750, 750, 768, 884, 886, 887, 890, 893, 902, 902, 904, 906, 908, 908, 910, 929, 931, 1013, 1015, 1153, 1155, 1159, 1162, 1319, 1329, 1366, 1369, 1369, 1377, 1415, 1425, 1469, 1471, 1471, 1473, 1474, 1476, 1477, 1479, 1479, 1488, 1514, 1520, 1522, 1552, 1562, 1568, 1641, 1646, 1747, 1749, 1756, 1759, 1768, 1770, 1788, 1791, 1791, 1808, 1866, 1869, 1969, 1984, 2037, 2042, 2042, 2048, 2093, 2112, 2139, 2208, 2208, 2210, 2220, 2276, 2302, 2304, 2403, 2406, 2415, 2417, 2423, 2425, 2431, 2433, 2435, 2437, 2444, 2447, 2448, 2451, 2472, 2474, 2480, 2482, 2482, 2486, 2489, 2492, 2500, 2503, 2504, 2507, 2510, 2519, 2519, 2524, 2525, 2527, 2531, 2534, 2545, 2561, 2563, 2565, 2570, 2575, 2576, 2579, 2600, 2602, 2608, 2610, 2611, 2613, 2614, 2616, 2617, 2620, 2620, 2622, 2626, 2631, 2632, 2635, 2637, 2641, 2641, 2649, 2652, 2654, 2654, 2662, 2677, 2689, 2691, 2693, 2701, 2703, 2705, 2707, 2728, 2730, 2736, 2738, 2739, 2741, 2745, 2748, 2757, 2759, 2761, 2763, 2765, 2768, 2768, 2784, 2787, 2790, 2799, 2817, 2819, 2821, 2828, 2831, 2832, 2835, 2856, 2858, 2864, 2866, 2867, 2869, 2873, 2876, 2884, 2887, 2888, 2891, 2893, 2902, 2903, 2908, 2909, 2911, 2915, 2918, 2927, 2929, 2929, 2946, 2947, 2949, 2954, 2958, 2960, 2962, 2965, 2969, 2970, 2972, 2972, 2974, 2975, 2979, 2980, 2984, 2986, 2990, 3001, 3006, 3010, 3014, 3016, 3018, 3021, 3024, 3024, 3031, 3031, 3046, 3055, 3073, 3075, 3077, 3084, 3086, 3088, 3090, 3112, 3114, 3123, 3125, 3129, 3133, 3140, 3142, 3144, 3146, 3149, 3157, 3158, 3160, 3161, 3168, 3171, 3174, 3183, 3202, 3203, 3205, 3212, 3214, 3216, 3218, 3240, 3242, 3251, 3253, 3257, 3260, 3268, 3270, 3272, 3274, 3277, 3285, 3286, 3294, 3294, 3296, 3299, 3302, 3311, 3313, 3314, 3330, 3331, 3333, 3340, 3342, 3344, 3346, 3386, 3389, 3396, 3398, 3400, 3402, 3406, 3415, 3415, 3424, 3427, 3430, 3439, 3450, 3455, 3458, 3459, 3461, 3478, 3482, 3505, 3507, 3515, 3517, 3517, 3520, 3526, 3530, 3530, 3535, 3540, 3542, 3542, 3544, 3551, 3570, 3571, 3585, 3642, 3648, 3662, 3664, 3673, 3713, 3714, 3716, 3716, 3719, 3720, 3722, 3722, 3725, 3725, 3732, 3735, 3737, 3743, 3745, 3747, 3749, 3749, 3751, 3751, 3754, 3755, 3757, 3769, 3771, 3773, 3776, 3780, 3782, 3782, 3784, 3789, 3792, 3801, 3804, 3807, 3840, 3840, 3864, 3865, 3872, 3881, 3893, 3893, 3895, 3895, 3897, 3897, 3902, 3911, 3913, 3948, 3953, 3972, 3974, 3991, 3993, 4028, 4038, 4038, 4096, 4169, 4176, 4253, 4256, 4293, 4295, 4295, 4301, 4301, 4304, 4346, 4348, 4680, 4682, 4685, 4688, 4694, 4696, 4696, 4698, 4701, 4704, 4744, 4746, 4749, 4752, 4784, 4786, 4789, 4792, 4798, 4800, 4800, 4802, 4805, 4808, 4822, 4824, 4880, 4882, 4885, 4888, 4954, 4957, 4959, 4992, 5007, 5024, 5108, 5121, 5740, 5743, 5759, 5761, 5786, 5792, 5866, 5870, 5872, 5888, 5900, 5902, 5908, 5920, 5940, 5952, 5971, 5984, 5996, 5998, 6000, 6002, 6003, 6016, 6099, 6103, 6103, 6108, 6109, 6112, 6121, 6155, 6157, 6160, 6169, 6176, 6263, 6272, 6314, 6320, 6389, 6400, 6428, 6432, 6443, 6448, 6459, 6470, 6509, 6512, 6516, 6528, 6571, 6576, 6601, 6608, 6617, 6656, 6683, 6688, 6750, 6752, 6780, 6783, 6793, 6800, 6809, 6823, 6823, 6912, 6987, 6992, 7001, 7019, 7027, 7040, 7155, 7168, 7223, 7232, 7241, 7245, 7293, 7376, 7378, 7380, 7414, 7424, 7654, 7676, 7957, 7960, 7965, 7968, 8005, 8008, 8013, 8016, 8023, 8025, 8025, 8027, 8027, 8029, 8029, 8031, 8061, 8064, 8116, 8118, 8124, 8126, 8126, 8130, 8132, 8134, 8140, 8144, 8147, 8150, 8155, 8160, 8172, 8178, 8180, 8182, 8188, 8204, 8205, 8255, 8256, 8276, 8276, 8305, 8305, 8319, 8319, 8336, 8348, 8400, 8412, 8417, 8417, 8421, 8432, 8450, 8450, 8455, 8455, 8458, 8467, 8469, 8469, 8473, 8477, 8484, 8484, 8486, 8486, 8488, 8488, 8490, 8493, 8495, 8505, 8508, 8511, 8517, 8521, 8526, 8526, 8544, 8584, 11264, 11310, 11312, 11358, 11360, 11492, 11499, 11507, 11520, 11557, 11559, 11559, 11565, 11565, 11568, 11623, 11631, 11631, 11647, 11670, 11680, 11686, 11688, 11694, 11696, 11702, 11704, 11710, 11712, 11718, 11720, 11726, 11728, 11734, 11736, 11742, 11744, 11775, 11823, 11823, 12293, 12295, 12321, 12335, 12337, 12341, 12344, 12348, 12353, 12438, 12441, 12442, 12445, 12447, 12449, 12538, 12540, 12543, 12549, 12589, 12593, 12686, 12704, 12730, 12784, 12799, 13312, 19893, 19968, 40908, 40960, 42124, 42192, 42237, 42240, 42508, 42512, 42539, 42560, 42607, 42612, 42621, 42623, 42647, 42655, 42737, 42775, 42783, 42786, 42888, 42891, 42894, 42896, 42899, 42912, 42922, 43000, 43047, 43072, 43123, 43136, 43204, 43216, 43225, 43232, 43255, 43259, 43259, 43264, 43309, 43312, 43347, 43360, 43388, 43392, 43456, 43471, 43481, 43520, 43574, 43584, 43597, 43600, 43609, 43616, 43638, 43642, 43643, 43648, 43714, 43739, 43741, 43744, 43759, 43762, 43766, 43777, 43782, 43785, 43790, 43793, 43798, 43808, 43814, 43816, 43822, 43968, 44010, 44012, 44013, 44016, 44025, 44032, 55203, 55216, 55238, 55243, 55291, 63744, 64109, 64112, 64217, 64256, 64262, 64275, 64279, 64285, 64296, 64298, 64310, 64312, 64316, 64318, 64318, 64320, 64321, 64323, 64324, 64326, 64433, 64467, 64829, 64848, 64911, 64914, 64967, 65008, 65019, 65024, 65039, 65056, 65062, 65075, 65076, 65101, 65103, 65136, 65140, 65142, 65276, 65296, 65305, 65313, 65338, 65343, 65343, 65345, 65370, 65382, 65470, 65474, 65479, 65482, 65487, 65490, 65495, 65498, 65500,];
    function lookupInUnicodeMap(code, map)
        // Bail out quickly if it couldn't possibly be in the map.
        if (code < map[0]) {
            return false;
        end
        // Perform binary search in one of the Unicode range maps
        local lo = 0;
        local hi = map.length;
        local mid;
        while (lo + 1 < hi) {
            mid = lo + (hi - lo) / 2;
            // mid has to be even to catch a range's beginning
            mid -= mid % 2;
            if (map[mid] <= code && code <= map[mid + 1]) {
                return true;
            end
            if (code < map[mid]) {
                hi = mid;
            end
            else {
                lo = mid + 2;
            end
        end
        return false;
    end
    /* @internal */ function isUnicodeIdentifierStart(code, languageVersion)
        return languageVersion >= ScriptTarget.ES5 ?
            lookupInUnicodeMap(code, unicodeES5IdentifierStart) :
            lookupInUnicodeMap(code, unicodeES3IdentifierStart);
    end
    ts.isUnicodeIdentifierStart = isUnicodeIdentifierStart;
    function isUnicodeIdentifierPart(code, languageVersion)
        return languageVersion >= ScriptTarget.ES5 ?
            lookupInUnicodeMap(code, unicodeES5IdentifierPart) :
            lookupInUnicodeMap(code, unicodeES3IdentifierPart);
    end
    function makeReverseMap(source)
        local result = [];
        for (var name_1 in source) {
            if (source.hasOwnProperty(name_1)) {
                result[source[name_1]] = name_1;
            end
        end
        return result;
    end
    local tokenStrings = makeReverseMap(textToToken);
    function tokenToString(t)
        return tokenStrings[t];
    end
    ts.tokenToString = tokenToString;
    /* @internal */
    function stringToToken(s)
        return textToToken[s];
    end
    ts.stringToToken = stringToToken;
    /* @internal */
    function computeLineStarts(text)
        local result = new Array();
        local pos = 0;
        local lineStart = 0;
        while (pos < text.length) {
            local ch_1 = text.charCodeAt(pos++);
            switch (ch_1) {
                case CharacterCodes.carriageReturn:
                    if (text.charCodeAt(pos) === CharacterCodes.lineFeed) {
                        pos++;
                    end
                case CharacterCodes.lineFeed:
                    result.push(lineStart);
                    lineStart = pos;
                    break;
                default:
                    if (ch_1 > CharacterCodes.maxAsciiCharacter && isLineBreak(ch_1)) {
                        result.push(lineStart);
                        lineStart = pos;
                    end
                    break;
            end
        end
        result.push(lineStart);
        return result;
    end
    ts.computeLineStarts = computeLineStarts;
    function getPositionOfLineAndCharacter(sourceFile, line, character)
        return computePositionOfLineAndCharacter(getLineStarts(sourceFile), line, character);
    end
    ts.getPositionOfLineAndCharacter = getPositionOfLineAndCharacter;
    /* @internal */
    function computePositionOfLineAndCharacter(lineStarts, line, character)
        Debug.assert(line >= 0 && line < lineStarts.length);
        return lineStarts[line] + character;
    end
    ts.computePositionOfLineAndCharacter = computePositionOfLineAndCharacter;
    /* @internal */
    function getLineStarts(sourceFile)
        return sourceFile.lineMap || (sourceFile.lineMap = computeLineStarts(sourceFile.text));
    end
    ts.getLineStarts = getLineStarts;
    /* @internal */
    function computeLineAndCharacterOfPosition(lineStarts, position)
        local lineNumber = binarySearch(lineStarts, position);
        if (lineNumber < 0) {
            // If the actual position was not found, 
            // the binary search returns the negative value of the next line start
            // e.g. if the line starts at [5, 10, 23, 80] and the position requested was 20
            // then the search will return -2
            lineNumber = ~lineNumber - 1;
        end
        return {
            line: lineNumber,
            character: position - lineStarts[lineNumber]
        };
    end
    ts.computeLineAndCharacterOfPosition = computeLineAndCharacterOfPosition;
    function getLineAndCharacterOfPosition(sourceFile, position)
        return computeLineAndCharacterOfPosition(getLineStarts(sourceFile), position);
    end
    ts.getLineAndCharacterOfPosition = getLineAndCharacterOfPosition;
    local hasOwnProperty = Object.prototype.hasOwnProperty;
    function isWhiteSpace(ch)
        // Note: nextLine is in the Zs space, and should be considered to be a whitespace.
        // It is explicitly not a line-break as it isn't in the exact set specified by EcmaScript.
        return ch === CharacterCodes.space ||
            ch === CharacterCodes.tab ||
            ch === CharacterCodes.verticalTab ||
            ch === CharacterCodes.formFeed ||
            ch === CharacterCodes.nonBreakingSpace ||
            ch === CharacterCodes.nextLine ||
            ch === CharacterCodes.ogham ||
            ch >= CharacterCodes.enQuad && ch <= CharacterCodes.zeroWidthSpace ||
            ch === CharacterCodes.narrowNoBreakSpace ||
            ch === CharacterCodes.mathematicalSpace ||
            ch === CharacterCodes.ideographicSpace ||
            ch === CharacterCodes.byteOrderMark;
    end
    ts.isWhiteSpace = isWhiteSpace;
    function isLineBreak(ch)
        // ES5 7.3:
        // The ECMAScript line terminator characters are listed in Table 3.
        //     Table 3: Line Terminator Characters
        //     Code Unit Value     Name                    Formal Name
        //     \u000A              Line Feed               <LF>
        //     \u000D              Carriage Return         <CR>
        //     \u2028              Line separator          <LS>
        //     \u2029              Paragraph separator     <PS>
        // Only the characters in Table 3 are treated as line terminators. Other new line or line 
        // breaking characters are treated as white space but not as line terminators. 
        return ch === CharacterCodes.lineFeed ||
            ch === CharacterCodes.carriageReturn ||
            ch === CharacterCodes.lineSeparator ||
            ch === CharacterCodes.paragraphSeparator;
    end
    ts.isLineBreak = isLineBreak;
    function isDigit(ch)
        return ch >= CharacterCodes._0 && ch <= CharacterCodes._9;
    end
    /* @internal */
    function isOctalDigit(ch)
        return ch >= CharacterCodes._0 && ch <= CharacterCodes._7;
    end
    ts.isOctalDigit = isOctalDigit;
    /* @internal */
    function skipTrivia(text, pos, stopAfterLineBreak)
        while (true) {
            local ch_2 = text.charCodeAt(pos);
            switch (ch_2) {
                case CharacterCodes.carriageReturn:
                    if (text.charCodeAt(pos + 1) === CharacterCodes.lineFeed) {
                        pos++;
                    end
                case CharacterCodes.lineFeed:
                    pos++;
                    if (stopAfterLineBreak) {
                        return pos;
                    end
                    continue;
                case CharacterCodes.tab:
                case CharacterCodes.verticalTab:
                case CharacterCodes.formFeed:
                case CharacterCodes.space:
                    pos++;
                    continue;
                case CharacterCodes.slash:
                    if (text.charCodeAt(pos + 1) === CharacterCodes.slash) {
                        pos += 2;
                        while (pos < text.length) {
                            if (isLineBreak(text.charCodeAt(pos))) {
                                break;
                            end
                            pos++;
                        end
                        continue;
                    end
                    if (text.charCodeAt(pos + 1) === CharacterCodes.asterisk) {
                        pos += 2;
                        while (pos < text.length) {
                            if (text.charCodeAt(pos) === CharacterCodes.asterisk && text.charCodeAt(pos + 1) === CharacterCodes.slash) {
                                pos += 2;
                                break;
                            end
                            pos++;
                        end
                        continue;
                    end
                    break;
                case CharacterCodes.lessThan:
                case CharacterCodes.equals:
                case CharacterCodes.greaterThan:
                    if (isConflictMarkerTrivia(text, pos)) {
                        pos = scanConflictMarkerTrivia(text, pos);
                        continue;
                    end
                    break;
                default:
                    if (ch_2 > CharacterCodes.maxAsciiCharacter && (isWhiteSpace(ch_2) || isLineBreak(ch_2))) {
                        pos++;
                        continue;
                    end
                    break;
            end
            return pos;
        end
    end
    ts.skipTrivia = skipTrivia;
    // All conflict markers consist of the same character repeated seven times.  If it is 
    // a <<<<<<< or >>>>>>> marker then it is also followd by a space.
    local mergeConflictMarkerLength = "<<<<<<<".length;
    function isConflictMarkerTrivia(text, pos)
        Debug.assert(pos >= 0);
        // Conflict markers must be at the start of a line.
        if (pos === 0 || isLineBreak(text.charCodeAt(pos - 1))) {
            local ch_3 = text.charCodeAt(pos);
            if ((pos + mergeConflictMarkerLength) < text.length) {
                for (var i = 0, n = mergeConflictMarkerLength; i < n; i++) {
                    if (text.charCodeAt(pos + i) !== ch_3) {
                        return false;
                    end
                end
                return ch_3 === CharacterCodes.equals ||
                    text.charCodeAt(pos + mergeConflictMarkerLength) === CharacterCodes.space;
            end
        end
        return false;
    end
    function scanConflictMarkerTrivia(text, pos, error)
        if (error) {
            error(Diagnostics.Merge_conflict_marker_encountered, mergeConflictMarkerLength);
        end
        local ch = text.charCodeAt(pos);
        local len = text.length;
        if (ch === CharacterCodes.lessThan || ch === CharacterCodes.greaterThan) {
            while (pos < len && !isLineBreak(text.charCodeAt(pos))) {
                pos++;
            end
        end
        else {
            Debug.assert(ch === CharacterCodes.equals);
            // Consume everything from the start of the mid-conlict marker to the start of the next
            // end-conflict marker.
            while (pos < len) {
                local ch_4 = text.charCodeAt(pos);
                if (ch_4 === CharacterCodes.greaterThan && isConflictMarkerTrivia(text, pos)) {
                    break;
                end
                pos++;
            end
        end
        return pos;
    end
    // Extract comments from the given source text starting at the given position. If trailing is 
    // false, whitespace is skipped until the first line break and comments between that location 
    // and the next token are returned.If trailing is true, comments occurring between the given 
    // position and the next line break are returned.The return value is an array containing a 
    // TextRange for each comment. Single-line comment ranges include the beginning '//' characters 
    // but not the ending line break. Multi - line comment ranges include the beginning '/* and 
    // ending '*/' characters.The return value is undefined if no comments were found.
    function getCommentRanges(text, pos, trailing)
        local result;
        local collecting = trailing || pos === 0;
        while (true) {
            local ch_5 = text.charCodeAt(pos);
            switch (ch_5) {
                case CharacterCodes.carriageReturn:
                    if (text.charCodeAt(pos + 1) === CharacterCodes.lineFeed) {
                        pos++;
                    end
                case CharacterCodes.lineFeed:
                    pos++;
                    if (trailing) {
                        return result;
                    end
                    collecting = true;
                    if (result && result.length) {
                        lastOrUndefined(result).hasTrailingNewLine = true;
                    end
                    continue;
                case CharacterCodes.tab:
                case CharacterCodes.verticalTab:
                case CharacterCodes.formFeed:
                case CharacterCodes.space:
                    pos++;
                    continue;
                case CharacterCodes.slash:
                    local nextChar = text.charCodeAt(pos + 1);
                    local hasTrailingNewLine = false;
                    if (nextChar === CharacterCodes.slash || nextChar === CharacterCodes.asterisk) {
                        local kind = nextChar === CharacterCodes.slash ? SyntaxKind.SingleLineCommentTrivia : SyntaxKind.MultiLineCommentTrivia;
                        local startPos_1 = pos;
                        pos += 2;
                        if (nextChar === CharacterCodes.slash) {
                            while (pos < text.length) {
                                if (isLineBreak(text.charCodeAt(pos))) {
                                    hasTrailingNewLine = true;
                                    break;
                                end
                                pos++;
                            end
                        end
                        else {
                            while (pos < text.length) {
                                if (text.charCodeAt(pos) === CharacterCodes.asterisk && text.charCodeAt(pos + 1) === CharacterCodes.slash) {
                                    pos += 2;
                                    break;
                                end
                                pos++;
                            end
                        end
                        if (collecting) {
                            if (!result) {
                                result = [];
                            end
                            result.push({ pos: startPos_1 }, pos, hasTrailingNewLine, kind);
                        end
                        ;
                    end
                    continue;
            end
            break;
            if (ch_5 > CharacterCodes.maxAsciiCharacter && (isWhiteSpace(ch_5) || isLineBreak(ch_5))) {
                if (result && result.length && isLineBreak(ch_5)) {
                    lastOrUndefined(result).hasTrailingNewLine = true;
                end
                pos++;
                continue;
            end
            break;
        end
        return result;
    end
end)(ts || (ts = {}));
function getLeadingCommentRanges(text, pos)
    return getCommentRanges(text, pos, false);
end
exports.getLeadingCommentRanges = getLeadingCommentRanges;
function getTrailingCommentRanges(text, pos)
    return getCommentRanges(text, pos, true);
end
exports.getTrailingCommentRanges = getTrailingCommentRanges;
function isIdentifierStart(ch, languageVersion)
    return ch >= CharacterCodes.A && ch <= CharacterCodes.Z || ch >= CharacterCodes.a && ch <= CharacterCodes.z ||
        ch === CharacterCodes.$ || ch === CharacterCodes._ ||
        ch > CharacterCodes.maxAsciiCharacter && isUnicodeIdentifierStart(ch, languageVersion);
end
exports.isIdentifierStart = isIdentifierStart;
function isIdentifierPart(ch, languageVersion)
    return ch >= CharacterCodes.A && ch <= CharacterCodes.Z || ch >= CharacterCodes.a && ch <= CharacterCodes.z ||
        ch >= CharacterCodes._0 && ch <= CharacterCodes._9 || ch === CharacterCodes.$ || ch === CharacterCodes._ ||
        ch > CharacterCodes.maxAsciiCharacter && isUnicodeIdentifierPart(ch, languageVersion);
end
exports.isIdentifierPart = isIdentifierPart;
/** Creates a scanner over a (possibly unspecified) range of a piece of text. */
function createScanner(languageVersion, skipTrivia, text, onError, start, length)
    local pos; // Current position (end position of text of current token)
    let;
end
exports.createScanner = createScanner;
number; // end of text
local startPos; // Start position of whitespace before current token
local tokenPos; // Start position of text of current token
local token;
local tokenValue;
local precedingLineBreak;
local hasExtendedUnicodeEscape;
local tokenIsUnterminated;
setText(text, start, length);
return {
    getStartPos: function () { return startPos; },
    getTextPos: function () { return pos; },
    getToken: function () { return token; },
    getTokenPos: function () { return tokenPos; },
    getTokenText: function () { return text.substring(tokenPos, pos); },
    getTokenValue: function () { return tokenValue; },
    hasExtendedUnicodeEscape: function () { return hasExtendedUnicodeEscape; },
    hasPrecedingLineBreak: function () { return precedingLineBreak; },
    isIdentifier: function () { return token === SyntaxKind.Identifier || token > SyntaxKind.LastReservedWord; },
    isReservedWord: function () { return token >= SyntaxKind.FirstReservedWord && token <= SyntaxKind.LastReservedWord; },
    isUnterminated: function () { return tokenIsUnterminated; },
    reScanGreaterToken: reScanGreaterToken,
    reScanSlashToken: reScanSlashToken,
    reScanTemplateToken: reScanTemplateToken,
    scan: scan,
    setText: setText,
    setScriptTarget: setScriptTarget,
    setOnError: setOnError,
    setTextPos: setTextPos,
    tryScan: tryScan,
    lookAhead: lookAhead
};
function error(message, length)
    if (onError) {
        onError(message, length || 0);
    end
end
function isIdentifierStart(ch)
    return ch >= CharacterCodes.A && ch <= CharacterCodes.Z || ch >= CharacterCodes.a && ch <= CharacterCodes.z ||
        ch === CharacterCodes.$ || ch === CharacterCodes._ ||
        ch > CharacterCodes.maxAsciiCharacter && isUnicodeIdentifierStart(ch, languageVersion);
end
function isIdentifierPart(ch)
    return ch >= CharacterCodes.A && ch <= CharacterCodes.Z || ch >= CharacterCodes.a && ch <= CharacterCodes.z ||
        ch >= CharacterCodes._0 && ch <= CharacterCodes._9 || ch === CharacterCodes.$ || ch === CharacterCodes._ ||
        ch > CharacterCodes.maxAsciiCharacter && isUnicodeIdentifierPart(ch, languageVersion);
end
function scanNumber()
    local start = pos;
    while (isDigit(text.charCodeAt(pos)))
        pos++;
    if (text.charCodeAt(pos) === CharacterCodes.dot) {
        pos++;
        while (isDigit(text.charCodeAt(pos)))
            pos++;
    end
    let;
end
pos;
if (text.charCodeAt(pos) === CharacterCodes.E || text.charCodeAt(pos) === CharacterCodes.e) {
    pos++;
    if (text.charCodeAt(pos) === CharacterCodes.plus || text.charCodeAt(pos) === CharacterCodes.minus)
        pos++;
    if (isDigit(text.charCodeAt(pos))) {
        pos++;
        while (isDigit(text.charCodeAt(pos)))
            pos++;
    end
    pos;
end
else {
    error(Diagnostics.Digit_expected);
end
return +(text.substring(start));
function scanOctalDigits()
    local start = pos;
    while (isOctalDigit(text.charCodeAt(pos))) {
        pos++;
    end
    return +(text.substring(start, pos));
end
/**
 * Scans the given number of hexadecimal digits in the text,
 * returning -1 if the given number is unavailable.
 */
function scanExactNumberOfHexDigits(count)
    return scanHexDigits(count, false);
end
/**
 * Scans as many hexadecimal digits as are available in the text,
 * returning -1 if the given number of digits was unavailable.
 */
function scanMinimumNumberOfHexDigits(count)
    return scanHexDigits(count, true);
end
function scanHexDigits(minCount, scanAsManyAsPossible)
    local digits = 0;
    local value = 0;
    while (digits < minCount || scanAsManyAsPossible) {
        local ch_6 = text.charCodeAt(pos);
        if (ch_6 >= CharacterCodes._0 && ch_6 <= CharacterCodes._9) {
            value = value * 16 + ch_6 - CharacterCodes._0;
        end
        else if (ch_6 >= CharacterCodes.A && ch_6 <= CharacterCodes.F) {
            value = value * 16 + ch_6 - CharacterCodes.A + 10;
        end
        else if (ch_6 >= CharacterCodes.a && ch_6 <= CharacterCodes.f) {
            value = value * 16 + ch_6 - CharacterCodes.a + 10;
        end
        else {
            break;
        end
        pos++;
        digits++;
    end
    if (digits < minCount) {
        value = -1;
    end
    return value;
end
function scanString()
    local quote = text.charCodeAt(pos++);
    local result = "";
    local start = pos;
    while (true) {
        if (pos >= )
            ;
    end
    {
        result += text.substring(start, pos);
        tokenIsUnterminated = true;
        error(Diagnostics.Unterminated_string_literal);
        break;
    end
    local ch = text.charCodeAt(pos);
    if (ch === quote) {
        result += text.substring(start, pos);
        pos++;
        break;
    end
    if (ch === CharacterCodes.backslash) {
        result += text.substring(start, pos);
        result += scanEscapeSequence();
        start = pos;
        continue;
    end
    if (isLineBreak(ch)) {
        result += text.substring(start, pos);
        tokenIsUnterminated = true;
        error(Diagnostics.Unterminated_string_literal);
        break;
    end
    pos++;
end
return result;
/**
 * Sets the current 'tokenValue' and returns a NoSubstitutionTemplateLiteral or
 * a literal component of a TemplateExpression.
 */
function scanTemplateAndSetTokenValue()
    local startedWithBacktick = text.charCodeAt(pos) === CharacterCodes.backtick;
    pos++;
    local start = pos;
    local contents = "";
    local resultingToken;
    while (true) {
        if (pos >= )
            ;
    end
    {
        contents += text.substring(start, pos);
        tokenIsUnterminated = true;
        error(Diagnostics.Unterminated_template_literal);
        resultingToken = startedWithBacktick ? SyntaxKind.NoSubstitutionTemplateLiteral : SyntaxKind.TemplateTail;
        break;
    end
    local currChar = text.charCodeAt(pos);
    // '`'
    if (currChar === CharacterCodes.backtick) {
        contents += text.substring(start, pos);
        pos++;
        resultingToken = startedWithBacktick ? SyntaxKind.NoSubstitutionTemplateLiteral : SyntaxKind.TemplateTail;
        break;
    end
    // '${'
    if (currChar === CharacterCodes.$ && pos + 1 < )
        ;
end
 && text.charCodeAt(pos + 1) === CharacterCodes.openBrace;
{
    contents += text.substring(start, pos);
    pos += 2;
    resultingToken = startedWithBacktick ? SyntaxKind.TemplateHead : SyntaxKind.TemplateMiddle;
    break;
end
// Escape character
if (currChar === CharacterCodes.backslash) {
    contents += text.substring(start, pos);
    contents += scanEscapeSequence();
    start = pos;
    continue;
end
// Speculated ECMAScript 6 Spec 11.8.6.1:
// <CR><LF> and <CR> LineTerminatorSequences are normalized to <LF> for Template Values
if (currChar === CharacterCodes.carriageReturn) {
    contents += text.substring(start, pos);
    pos++;
    if (pos < )
        ;
end
 && text.charCodeAt(pos) === CharacterCodes.lineFeed;
{
    pos++;
end
contents += "\n";
start = pos;
continue;
pos++;
Debug.assert(resultingToken !== undefined);
tokenValue = contents;
return resultingToken;
function scanEscapeSequence()
    pos++;
    if (pos >= )
        ;
end
{
    error(Diagnostics.Unexpected_end_of_text);
    return "";
end
local ch = text.charCodeAt(pos++);
switch (ch) {
    case CharacterCodes._0:
        return "\0";
    case CharacterCodes.b:
        return "\b";
    case CharacterCodes.t:
        return "\t";
    case CharacterCodes.n:
        return "\n";
    case CharacterCodes.v:
        return "\v";
    case CharacterCodes.f:
        return "\f";
    case CharacterCodes.r:
        return "\r";
    case CharacterCodes.singleQuote:
        return "\'";
    case CharacterCodes.doubleQuote:
        return "\"";
    case CharacterCodes.u:
        // '\u{DDDDDDDD}'
        if (pos < )
            ;
end
 && text.charCodeAt(pos) === CharacterCodes.openBrace;
{
    hasExtendedUnicodeEscape = true;
    pos++;
    return scanExtendedUnicodeEscape();
end
// '\uDDDD'
return scanHexadecimalEscape(4);
CharacterCodes.x;
// '\xDD'
return scanHexadecimalEscape(2);
CharacterCodes.carriageReturn;
if (pos < )
    ;
 && text.charCodeAt(pos) === CharacterCodes.lineFeed;
{
    pos++;
end
CharacterCodes.lineFeed;
CharacterCodes.lineSeparator;
CharacterCodes.paragraphSeparator;
return "";
return String.fromCharCode(ch);
function scanHexadecimalEscape(numDigits)
    local escapedValue = scanExactNumberOfHexDigits(numDigits);
    if (escapedValue >= 0) {
        return String.fromCharCode(escapedValue);
    end
    else {
        error(Diagnostics.Hexadecimal_digit_expected);
        return "";
    end
end
function scanExtendedUnicodeEscape()
    local escapedValue = scanMinimumNumberOfHexDigits(1);
    local isInvalidExtendedEscape = false;
    // Validate the value of the digit
    if (escapedValue < 0) {
        error(Diagnostics.Hexadecimal_digit_expected);
        isInvalidExtendedEscape = true;
    end
    else if (escapedValue > 0x10FFFF) {
        error(Diagnostics.An_extended_Unicode_escape_value_must_be_between_0x0_and_0x10FFFF_inclusive);
        isInvalidExtendedEscape = true;
    end
    if (pos >= )
        ;
end
{
    error(Diagnostics.Unexpected_end_of_text);
    isInvalidExtendedEscape = true;
end
if (text.charCodeAt(pos) == CharacterCodes.closeBrace) {
    // Only swallow the following character up if it's a '}'.
    pos++;
end
else {
    error(Diagnostics.Unterminated_Unicode_escape_sequence);
    isInvalidExtendedEscape = true;
end
if (isInvalidExtendedEscape) {
    return "";
end
return utf16EncodeAsString(escapedValue);
// Derived from the 10.1.1 UTF16Encoding of the ES6 Spec.
function utf16EncodeAsString(codePoint)
    Debug.assert(0x0 <= codePoint && codePoint <= 0x10FFFF);
    if (codePoint <= 65535) {
        return String.fromCharCode(codePoint);
    end
    local codeUnit1 = Math.floor((codePoint - 65536) / 1024) + 0xD800;
    local codeUnit2 = ((codePoint - 65536) % 1024) + 0xDC00;
    return String.fromCharCode(codeUnit1, codeUnit2);
end
// Current character is known to be a backslash. Check for Unicode escape of the form '\uXXXX'
// and return code point value if valid Unicode escape is found. Otherwise return -1.
function peekUnicodeEscape()
    if (pos + 5 < )
        ;
end
 && text.charCodeAt(pos + 1) === CharacterCodes.u;
{
    local start = pos;
    pos += 2;
    local value = scanExactNumberOfHexDigits(4);
    pos = start;
    return value;
end
return -1;
function scanIdentifierParts()
    local result = "";
    local start = pos;
    while (pos < )
        ;
end
{
    local ch_7 = text.charCodeAt(pos);
    if (isIdentifierPart(ch_7)) {
        pos++;
    end
    else if (ch_7 === CharacterCodes.backslash) {
        ch_7 = peekUnicodeEscape();
        if (!(ch_7 >= 0 && isIdentifierPart(ch_7))) {
            break;
        end
        result += text.substring(start, pos);
        result += String.fromCharCode(ch_7);
        // Valid Unicode escape is always six characters
        pos += 6;
        start = pos;
    end
    else {
        break;
    end
end
result += text.substring(start, pos);
return result;
function getIdentifierToken()
    // Reserved words are between 2 and 11 characters long and start with a lowercase letter
    local len = tokenValue.length;
    if (len >= 2 && len <= 11) {
        local ch_8 = tokenValue.charCodeAt(0);
        if (ch_8 >= CharacterCodes.a && ch_8 <= CharacterCodes.z && hasOwnProperty.call(textToToken, tokenValue)) {
            return token = textToToken[tokenValue];
        end
    end
    return token = SyntaxKind.Identifier;
end
function scanBinaryOrOctalDigits(base)
    Debug.assert(base !== 2 || base !== 8, "Expected either base 2 or base 8");
    local value = 0;
    // For counting number of digits; Valid binaryIntegerLiteral must have at least one binary digit following B or b.
    // Similarly valid octalIntegerLiteral must have at least one octal digit following o or O.
    local numberOfDigits = 0;
    while (true) {
        local ch_9 = text.charCodeAt(pos);
        local valueOfCh = ch_9 - CharacterCodes._0;
        if (!isDigit(ch_9) || valueOfCh >= base) {
            break;
        end
        value = value * base + valueOfCh;
        pos++;
        numberOfDigits++;
    end
    // Invalid binaryIntegerLiteral or octalIntegerLiteral
    if (numberOfDigits === 0) {
        return -1;
    end
    return value;
end
function scan()
    startPos = pos;
    hasExtendedUnicodeEscape = false;
    precedingLineBreak = false;
    tokenIsUnterminated = false;
    while (true) {
        tokenPos = pos;
        if (pos >= )
            ;
    end
    {
        return token = SyntaxKind.EndOfFileToken;
    end
    local ch = text.charCodeAt(pos);
    switch (ch) {
        case CharacterCodes.lineFeed:
        case CharacterCodes.carriageReturn:
            precedingLineBreak = true;
            if (skipTrivia) {
                pos++;
                continue;
            end
            else {
                if (ch === CharacterCodes.carriageReturn && pos + 1 < )
                    ;
            end
             && text.charCodeAt(pos + 1) === CharacterCodes.lineFeed;
            {
                // consume both CR and LF
                pos += 2;
            end
            {
                pos++;
            end
            return token = SyntaxKind.NewLineTrivia;
    end
    CharacterCodes.tab;
    CharacterCodes.verticalTab;
    CharacterCodes.formFeed;
    CharacterCodes.space;
    if (skipTrivia) {
        pos++;
        continue;
    end
    else {
        while (pos < )
            ;
    end
     && isWhiteSpace(text.charCodeAt(pos));
    {
        pos++;
    end
    return token = SyntaxKind.WhitespaceTrivia;
end
CharacterCodes.exclamation;
if (text.charCodeAt(pos + 1) === CharacterCodes.equals) {
    if (text.charCodeAt(pos + 2) === CharacterCodes.equals) {
        return pos += 3, token = SyntaxKind.ExclamationEqualsEqualsToken;
    end
    return pos += 2, token = SyntaxKind.ExclamationEqualsToken;
end
return pos++, token = SyntaxKind.ExclamationToken;
CharacterCodes.doubleQuote;
CharacterCodes.singleQuote;
tokenValue = scanString();
return token = SyntaxKind.StringLiteral;
CharacterCodes.backtick;
return token = scanTemplateAndSetTokenValue();
CharacterCodes.percent;
if (text.charCodeAt(pos + 1) === CharacterCodes.equals) {
    return pos += 2, token = SyntaxKind.PercentEqualsToken;
end
return pos++, token = SyntaxKind.PercentToken;
CharacterCodes.ampersand;
if (text.charCodeAt(pos + 1) === CharacterCodes.ampersand) {
    return pos += 2, token = SyntaxKind.AmpersandAmpersandToken;
end
if (text.charCodeAt(pos + 1) === CharacterCodes.equals) {
    return pos += 2, token = SyntaxKind.AmpersandEqualsToken;
end
return pos++, token = SyntaxKind.AmpersandToken;
CharacterCodes.openParen;
return pos++, token = SyntaxKind.OpenParenToken;
CharacterCodes.closeParen;
return pos++, token = SyntaxKind.CloseParenToken;
CharacterCodes.asterisk;
if (text.charCodeAt(pos + 1) === CharacterCodes.equals) {
    return pos += 2, token = SyntaxKind.AsteriskEqualsToken;
end
return pos++, token = SyntaxKind.AsteriskToken;
CharacterCodes.plus;
if (text.charCodeAt(pos + 1) === CharacterCodes.plus) {
    return pos += 2, token = SyntaxKind.PlusPlusToken;
end
if (text.charCodeAt(pos + 1) === CharacterCodes.equals) {
    return pos += 2, token = SyntaxKind.PlusEqualsToken;
end
return pos++, token = SyntaxKind.PlusToken;
CharacterCodes.comma;
return pos++, token = SyntaxKind.CommaToken;
CharacterCodes.minus;
if (text.charCodeAt(pos + 1) === CharacterCodes.minus) {
    return pos += 2, token = SyntaxKind.MinusMinusToken;
end
if (text.charCodeAt(pos + 1) === CharacterCodes.equals) {
    return pos += 2, token = SyntaxKind.MinusEqualsToken;
end
return pos++, token = SyntaxKind.MinusToken;
CharacterCodes.dot;
if (isDigit(text.charCodeAt(pos + 1))) {
    tokenValue = "" + scanNumber();
    return token = SyntaxKind.NumericLiteral;
end
if (text.charCodeAt(pos + 1) === CharacterCodes.dot && text.charCodeAt(pos + 2) === CharacterCodes.dot) {
    return pos += 3, token = SyntaxKind.DotDotDotToken;
end
return pos++, token = SyntaxKind.DotToken;
CharacterCodes.slash;
// Single-line comment
if (text.charCodeAt(pos + 1) === CharacterCodes.slash) {
    pos += 2;
    while (pos < )
        ;
end
{
    if (isLineBreak(text.charCodeAt(pos))) {
        break;
    end
    pos++;
end
if (skipTrivia) {
    continue;
end
else {
    return token = SyntaxKind.SingleLineCommentTrivia;
end
// Multi-line comment
if (text.charCodeAt(pos + 1) === CharacterCodes.asterisk) {
    pos += 2;
    local commentClosed = false;
    while (pos < )
        ;
end
{
    local ch_10 = text.charCodeAt(pos);
    if (ch_10 === CharacterCodes.asterisk && text.charCodeAt(pos + 1) === CharacterCodes.slash) {
        pos += 2;
        commentClosed = true;
        break;
    end
    if (isLineBreak(ch_10)) {
        precedingLineBreak = true;
    end
    pos++;
end
if (!commentClosed) {
    error(Diagnostics.Asterisk_Slash_expected);
end
if (skipTrivia) {
    continue;
end
else {
    tokenIsUnterminated = !commentClosed;
    return token = SyntaxKind.MultiLineCommentTrivia;
end
if (text.charCodeAt(pos + 1) === CharacterCodes.equals) {
    return pos += 2, token = SyntaxKind.SlashEqualsToken;
end
return pos++, token = SyntaxKind.SlashToken;
CharacterCodes._0;
if (pos + 2 < )
    ;
 && (text.charCodeAt(pos + 1) === CharacterCodes.X || text.charCodeAt(pos + 1) === CharacterCodes.x);
{
    pos += 2;
    local value = scanMinimumNumberOfHexDigits(1);
    if (value < 0) {
        error(Diagnostics.Hexadecimal_digit_expected);
        value = 0;
    end
    tokenValue = "" + value;
    return token = SyntaxKind.NumericLiteral;
end
if (pos + 2 < )
    ;
 && (text.charCodeAt(pos + 1) === CharacterCodes.B || text.charCodeAt(pos + 1) === CharacterCodes.b);
{
    pos += 2;
    local value = scanBinaryOrOctalDigits(2);
    if (value < 0) {
        error(Diagnostics.Binary_digit_expected);
        value = 0;
    end
    tokenValue = "" + value;
    return token = SyntaxKind.NumericLiteral;
end
if (pos + 2 < )
    ;
 && (text.charCodeAt(pos + 1) === CharacterCodes.O || text.charCodeAt(pos + 1) === CharacterCodes.o);
{
    pos += 2;
    local value = scanBinaryOrOctalDigits(8);
    if (value < 0) {
        error(Diagnostics.Octal_digit_expected);
        value = 0;
    end
    tokenValue = "" + value;
    return token = SyntaxKind.NumericLiteral;
end
// Try to parse as an octal
if (pos + 1 < )
    ;
 && isOctalDigit(text.charCodeAt(pos + 1));
{
    tokenValue = "" + scanOctalDigits();
    return token = SyntaxKind.NumericLiteral;
end
CharacterCodes._1;
CharacterCodes._2;
CharacterCodes._3;
CharacterCodes._4;
CharacterCodes._5;
CharacterCodes._6;
CharacterCodes._7;
CharacterCodes._8;
CharacterCodes._9;
tokenValue = "" + scanNumber();
return token = SyntaxKind.NumericLiteral;
CharacterCodes.colon;
return pos++, token = SyntaxKind.ColonToken;
CharacterCodes.semicolon;
return pos++, token = SyntaxKind.SemicolonToken;
CharacterCodes.lessThan;
if (isConflictMarkerTrivia(text, pos)) {
    pos = scanConflictMarkerTrivia(text, pos, error);
    if (skipTrivia) {
        continue;
    end
    else {
        return token = SyntaxKind.ConflictMarkerTrivia;
    end
end
if (text.charCodeAt(pos + 1) === CharacterCodes.lessThan) {
    if (text.charCodeAt(pos + 2) === CharacterCodes.equals) {
        return pos += 3, token = SyntaxKind.LessThanLessThanEqualsToken;
    end
    return pos += 2, token = SyntaxKind.LessThanLessThanToken;
end
if (text.charCodeAt(pos + 1) === CharacterCodes.equals) {
    return pos += 2, token = SyntaxKind.LessThanEqualsToken;
end
return pos++, token = SyntaxKind.LessThanToken;
CharacterCodes.equals;
if (isConflictMarkerTrivia(text, pos)) {
    pos = scanConflictMarkerTrivia(text, pos, error);
    if (skipTrivia) {
        continue;
    end
    else {
        return token = SyntaxKind.ConflictMarkerTrivia;
    end
end
if (text.charCodeAt(pos + 1) === CharacterCodes.equals) {
    if (text.charCodeAt(pos + 2) === CharacterCodes.equals) {
        return pos += 3, token = SyntaxKind.EqualsEqualsEqualsToken;
    end
    return pos += 2, token = SyntaxKind.EqualsEqualsToken;
end
if (text.charCodeAt(pos + 1) === CharacterCodes.greaterThan) {
    return pos += 2, token = SyntaxKind.EqualsGreaterThanToken;
end
return pos++, token = SyntaxKind.EqualsToken;
CharacterCodes.greaterThan;
if (isConflictMarkerTrivia(text, pos)) {
    pos = scanConflictMarkerTrivia(text, pos, error);
    if (skipTrivia) {
        continue;
    end
    else {
        return token = SyntaxKind.ConflictMarkerTrivia;
    end
end
return pos++, token = SyntaxKind.GreaterThanToken;
CharacterCodes.question;
return pos++, token = SyntaxKind.QuestionToken;
CharacterCodes.openBracket;
return pos++, token = SyntaxKind.OpenBracketToken;
CharacterCodes.closeBracket;
return pos++, token = SyntaxKind.CloseBracketToken;
CharacterCodes.caret;
if (text.charCodeAt(pos + 1) === CharacterCodes.equals) {
    return pos += 2, token = SyntaxKind.CaretEqualsToken;
end
return pos++, token = SyntaxKind.CaretToken;
CharacterCodes.openBrace;
return pos++, token = SyntaxKind.OpenBraceToken;
CharacterCodes.bar;
if (text.charCodeAt(pos + 1) === CharacterCodes.bar) {
    return pos += 2, token = SyntaxKind.BarBarToken;
end
if (text.charCodeAt(pos + 1) === CharacterCodes.equals) {
    return pos += 2, token = SyntaxKind.BarEqualsToken;
end
return pos++, token = SyntaxKind.BarToken;
CharacterCodes.closeBrace;
return pos++, token = SyntaxKind.CloseBraceToken;
CharacterCodes.tilde;
return pos++, token = SyntaxKind.TildeToken;
CharacterCodes.at;
return pos++, token = SyntaxKind.AtToken;
CharacterCodes.backslash;
local cookedChar = peekUnicodeEscape();
if (cookedChar >= 0 && isIdentifierStart(cookedChar)) {
    pos += 6;
    tokenValue = String.fromCharCode(cookedChar) + scanIdentifierParts();
    return token = getIdentifierToken();
end
error(Diagnostics.Invalid_character);
return pos++, token = SyntaxKind.Unknown;
if (isIdentifierStart(ch)) {
    pos++;
    while (pos < )
        ;
end
 && isIdentifierPart(ch = text.charCodeAt(pos));
pos++;
tokenValue = text.substring(tokenPos, pos);
if (ch === CharacterCodes.backslash) {
    tokenValue += scanIdentifierParts();
end
return token = getIdentifierToken();
if (isWhiteSpace(ch)) {
    pos++;
    continue;
end
else if (isLineBreak(ch)) {
    precedingLineBreak = true;
    pos++;
    continue;
end
error(Diagnostics.Invalid_character);
return pos++, token = SyntaxKind.Unknown;
function reScanGreaterToken()
    if (token === SyntaxKind.GreaterThanToken) {
        if (text.charCodeAt(pos) === CharacterCodes.greaterThan) {
            if (text.charCodeAt(pos + 1) === CharacterCodes.greaterThan) {
                if (text.charCodeAt(pos + 2) === CharacterCodes.equals) {
                    return pos += 3, token = SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken;
                end
                return pos += 2, token = SyntaxKind.GreaterThanGreaterThanGreaterThanToken;
            end
            if (text.charCodeAt(pos + 1) === CharacterCodes.equals) {
                return pos += 2, token = SyntaxKind.GreaterThanGreaterThanEqualsToken;
            end
            return pos++, token = SyntaxKind.GreaterThanGreaterThanToken;
        end
        if (text.charCodeAt(pos) === CharacterCodes.equals) {
            return pos++, token = SyntaxKind.GreaterThanEqualsToken;
        end
    end
    return token;
end
function reScanSlashToken()
    if (token === SyntaxKind.SlashToken || token === SyntaxKind.SlashEqualsToken) {
        local p = tokenPos + 1;
        local inEscape = false;
        local inCharacterClass = false;
        while (true) {
            // If we reach the end of a file, or hit a newline, then this is an unterminated
            // regex.  Report error and return what we have so far.
            if (p >= )
                ;
        end
        {
            tokenIsUnterminated = true;
            error(Diagnostics.Unterminated_regular_expression_literal);
            break;
        end
        local ch_11 = text.charCodeAt(p);
        if (isLineBreak(ch_11)) {
            tokenIsUnterminated = true;
            error(Diagnostics.Unterminated_regular_expression_literal);
            break;
        end
        if (inEscape) {
            // Parsing an escape character;
            // reset the flag and just advance to the next char.
            inEscape = false;
        end
        else if (ch_11 === CharacterCodes.slash && !inCharacterClass) {
            // A slash within a character class is permissible,
            // but in general it signals the end of the regexp literal.
            p++;
            break;
        end
        else if (ch_11 === CharacterCodes.openBracket) {
            inCharacterClass = true;
        end
        else if (ch_11 === CharacterCodes.backslash) {
            inEscape = true;
        end
        else if (ch_11 === CharacterCodes.closeBracket) {
            inCharacterClass = false;
        end
        p++;
    end
    while (p < )
        ;
end
 && isIdentifierPart(text.charCodeAt(p));
{
    p++;
end
pos = p;
tokenValue = text.substring(tokenPos, pos);
token = SyntaxKind.RegularExpressionLiteral;
return token;
/**
 * Unconditionally back up and scan a template expression portion.
 */
function reScanTemplateToken()
    Debug.assert(token === SyntaxKind.CloseBraceToken, "'reScanTemplateToken' should only be called on a '}'");
    pos = tokenPos;
    return token = scanTemplateAndSetTokenValue();
end
function speculationHelper(callback, isLookahead)
    local savePos = pos;
    local saveStartPos = startPos;
    local saveTokenPos = tokenPos;
    local saveToken = token;
    local saveTokenValue = tokenValue;
    local savePrecedingLineBreak = precedingLineBreak;
    local result = callback();
    // If our callback returned something 'falsy' or we're just looking ahead,
    // then unconditionally restore us to where we were.
    if (!result || isLookahead) {
        pos = savePos;
        startPos = saveStartPos;
        tokenPos = saveTokenPos;
        token = saveToken;
        tokenValue = saveTokenValue;
        precedingLineBreak = savePrecedingLineBreak;
    end
    return result;
end
function lookAhead(callback)
    return speculationHelper(callback, true);
end
function tryScan(callback)
    return speculationHelper(callback, false);
end
function setText(newText, start, length)
    text = newText || "";
end
length === undefined ? text.length : start + length;
setTextPos(start || 0);
function setOnError(errorCallback)
    onError = errorCallback;
end
function setScriptTarget(scriptTarget)
    languageVersion = scriptTarget;
end
function setTextPos(textPos)
    Debug.assert(textPos >= 0);
    pos = textPos;
    startPos = textPos;
    tokenPos = textPos;
    token = SyntaxKind.Unknown;
    precedingLineBreak = false;
    tokenValue = undefined;
    hasExtendedUnicodeEscape = false;
    tokenIsUnterminated = false;
end
//# sourceMappingURL=file:///C:/Users/qujianbiao/Downloads/TypeScript-master/built/local/compiler/scanner.js.map