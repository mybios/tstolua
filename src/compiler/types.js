local ts;
(function (ts) {
    number;
end)(ts || (ts = {}));
// token > SyntaxKind.Identifer => token is a keyword
(function (SyntaxKind) {
    SyntaxKind[SyntaxKind["Unknown"] = 0] = "Unknown";
    SyntaxKind[SyntaxKind["EndOfFileToken"] = 1] = "EndOfFileToken";
    SyntaxKind[SyntaxKind["SingleLineCommentTrivia"] = 2] = "SingleLineCommentTrivia";
    SyntaxKind[SyntaxKind["MultiLineCommentTrivia"] = 3] = "MultiLineCommentTrivia";
    SyntaxKind[SyntaxKind["NewLineTrivia"] = 4] = "NewLineTrivia";
    SyntaxKind[SyntaxKind["WhitespaceTrivia"] = 5] = "WhitespaceTrivia";
    // We detect and provide better error recovery when we encounter a git merge marker.  This
    // allows us to edit files with git-conflict markers in them in a much more pleasant manner.
    SyntaxKind[SyntaxKind["ConflictMarkerTrivia"] = 6] = "ConflictMarkerTrivia";
    // Literals
    SyntaxKind[SyntaxKind["NumericLiteral"] = 7] = "NumericLiteral";
    SyntaxKind[SyntaxKind["StringLiteral"] = 8] = "StringLiteral";
    SyntaxKind[SyntaxKind["RegularExpressionLiteral"] = 9] = "RegularExpressionLiteral";
    SyntaxKind[SyntaxKind["NoSubstitutionTemplateLiteral"] = 10] = "NoSubstitutionTemplateLiteral";
    // Pseudo-literals
    SyntaxKind[SyntaxKind["TemplateHead"] = 11] = "TemplateHead";
    SyntaxKind[SyntaxKind["TemplateMiddle"] = 12] = "TemplateMiddle";
    SyntaxKind[SyntaxKind["TemplateTail"] = 13] = "TemplateTail";
    // Punctuation
    SyntaxKind[SyntaxKind["OpenBraceToken"] = 14] = "OpenBraceToken";
    SyntaxKind[SyntaxKind["CloseBraceToken"] = 15] = "CloseBraceToken";
    SyntaxKind[SyntaxKind["OpenParenToken"] = 16] = "OpenParenToken";
    SyntaxKind[SyntaxKind["CloseParenToken"] = 17] = "CloseParenToken";
    SyntaxKind[SyntaxKind["OpenBracketToken"] = 18] = "OpenBracketToken";
    SyntaxKind[SyntaxKind["CloseBracketToken"] = 19] = "CloseBracketToken";
    SyntaxKind[SyntaxKind["DotToken"] = 20] = "DotToken";
    SyntaxKind[SyntaxKind["DotDotDotToken"] = 21] = "DotDotDotToken";
    SyntaxKind[SyntaxKind["SemicolonToken"] = 22] = "SemicolonToken";
    SyntaxKind[SyntaxKind["CommaToken"] = 23] = "CommaToken";
    SyntaxKind[SyntaxKind["LessThanToken"] = 24] = "LessThanToken";
    SyntaxKind[SyntaxKind["GreaterThanToken"] = 25] = "GreaterThanToken";
    SyntaxKind[SyntaxKind["LessThanEqualsToken"] = 26] = "LessThanEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanEqualsToken"] = 27] = "GreaterThanEqualsToken";
    SyntaxKind[SyntaxKind["EqualsEqualsToken"] = 28] = "EqualsEqualsToken";
    SyntaxKind[SyntaxKind["ExclamationEqualsToken"] = 29] = "ExclamationEqualsToken";
    SyntaxKind[SyntaxKind["EqualsEqualsEqualsToken"] = 30] = "EqualsEqualsEqualsToken";
    SyntaxKind[SyntaxKind["ExclamationEqualsEqualsToken"] = 31] = "ExclamationEqualsEqualsToken";
    SyntaxKind[SyntaxKind["EqualsGreaterThanToken"] = 32] = "EqualsGreaterThanToken";
    SyntaxKind[SyntaxKind["PlusToken"] = 33] = "PlusToken";
    SyntaxKind[SyntaxKind["MinusToken"] = 34] = "MinusToken";
    SyntaxKind[SyntaxKind["AsteriskToken"] = 35] = "AsteriskToken";
    SyntaxKind[SyntaxKind["SlashToken"] = 36] = "SlashToken";
    SyntaxKind[SyntaxKind["PercentToken"] = 37] = "PercentToken";
    SyntaxKind[SyntaxKind["PlusPlusToken"] = 38] = "PlusPlusToken";
    SyntaxKind[SyntaxKind["MinusMinusToken"] = 39] = "MinusMinusToken";
    SyntaxKind[SyntaxKind["LessThanLessThanToken"] = 40] = "LessThanLessThanToken";
    SyntaxKind[SyntaxKind["GreaterThanGreaterThanToken"] = 41] = "GreaterThanGreaterThanToken";
    SyntaxKind[SyntaxKind["GreaterThanGreaterThanGreaterThanToken"] = 42] = "GreaterThanGreaterThanGreaterThanToken";
    SyntaxKind[SyntaxKind["AmpersandToken"] = 43] = "AmpersandToken";
    SyntaxKind[SyntaxKind["BarToken"] = 44] = "BarToken";
    SyntaxKind[SyntaxKind["CaretToken"] = 45] = "CaretToken";
    SyntaxKind[SyntaxKind["ExclamationToken"] = 46] = "ExclamationToken";
    SyntaxKind[SyntaxKind["TildeToken"] = 47] = "TildeToken";
    SyntaxKind[SyntaxKind["AmpersandAmpersandToken"] = 48] = "AmpersandAmpersandToken";
    SyntaxKind[SyntaxKind["BarBarToken"] = 49] = "BarBarToken";
    SyntaxKind[SyntaxKind["QuestionToken"] = 50] = "QuestionToken";
    SyntaxKind[SyntaxKind["ColonToken"] = 51] = "ColonToken";
    SyntaxKind[SyntaxKind["AtToken"] = 52] = "AtToken";
    // Assignments
    SyntaxKind[SyntaxKind["EqualsToken"] = 53] = "EqualsToken";
    SyntaxKind[SyntaxKind["PlusEqualsToken"] = 54] = "PlusEqualsToken";
    SyntaxKind[SyntaxKind["MinusEqualsToken"] = 55] = "MinusEqualsToken";
    SyntaxKind[SyntaxKind["AsteriskEqualsToken"] = 56] = "AsteriskEqualsToken";
    SyntaxKind[SyntaxKind["SlashEqualsToken"] = 57] = "SlashEqualsToken";
    SyntaxKind[SyntaxKind["PercentEqualsToken"] = 58] = "PercentEqualsToken";
    SyntaxKind[SyntaxKind["LessThanLessThanEqualsToken"] = 59] = "LessThanLessThanEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanGreaterThanEqualsToken"] = 60] = "GreaterThanGreaterThanEqualsToken";
    SyntaxKind[SyntaxKind["GreaterThanGreaterThanGreaterThanEqualsToken"] = 61] = "GreaterThanGreaterThanGreaterThanEqualsToken";
    SyntaxKind[SyntaxKind["AmpersandEqualsToken"] = 62] = "AmpersandEqualsToken";
    SyntaxKind[SyntaxKind["BarEqualsToken"] = 63] = "BarEqualsToken";
    SyntaxKind[SyntaxKind["CaretEqualsToken"] = 64] = "CaretEqualsToken";
    // Identifiers
    SyntaxKind[SyntaxKind["Identifier"] = 65] = "Identifier";
    // Reserved words
    SyntaxKind[SyntaxKind["BreakKeyword"] = 66] = "BreakKeyword";
    SyntaxKind[SyntaxKind["CaseKeyword"] = 67] = "CaseKeyword";
    SyntaxKind[SyntaxKind["CatchKeyword"] = 68] = "CatchKeyword";
    SyntaxKind[SyntaxKind["ClassKeyword"] = 69] = "ClassKeyword";
    SyntaxKind[SyntaxKind["ConstKeyword"] = 70] = "ConstKeyword";
    SyntaxKind[SyntaxKind["ContinueKeyword"] = 71] = "ContinueKeyword";
    SyntaxKind[SyntaxKind["DebuggerKeyword"] = 72] = "DebuggerKeyword";
    SyntaxKind[SyntaxKind["DefaultKeyword"] = 73] = "DefaultKeyword";
    SyntaxKind[SyntaxKind["DeleteKeyword"] = 74] = "DeleteKeyword";
    SyntaxKind[SyntaxKind["DoKeyword"] = 75] = "DoKeyword";
    SyntaxKind[SyntaxKind["ElseKeyword"] = 76] = "ElseKeyword";
    SyntaxKind[SyntaxKind["EnumKeyword"] = 77] = "EnumKeyword";
    SyntaxKind[SyntaxKind["ExportKeyword"] = 78] = "ExportKeyword";
    SyntaxKind[SyntaxKind["ExtendsKeyword"] = 79] = "ExtendsKeyword";
    SyntaxKind[SyntaxKind["FalseKeyword"] = 80] = "FalseKeyword";
    SyntaxKind[SyntaxKind["FinallyKeyword"] = 81] = "FinallyKeyword";
    SyntaxKind[SyntaxKind["ForKeyword"] = 82] = "ForKeyword";
    SyntaxKind[SyntaxKind["FunctionKeyword"] = 83] = "FunctionKeyword";
    SyntaxKind[SyntaxKind["IfKeyword"] = 84] = "IfKeyword";
    SyntaxKind[SyntaxKind["ImportKeyword"] = 85] = "ImportKeyword";
    SyntaxKind[SyntaxKind["InKeyword"] = 86] = "InKeyword";
    SyntaxKind[SyntaxKind["InstanceOfKeyword"] = 87] = "InstanceOfKeyword";
    SyntaxKind[SyntaxKind["NewKeyword"] = 88] = "NewKeyword";
    SyntaxKind[SyntaxKind["NullKeyword"] = 89] = "NullKeyword";
    SyntaxKind[SyntaxKind["ReturnKeyword"] = 90] = "ReturnKeyword";
    SyntaxKind[SyntaxKind["SuperKeyword"] = 91] = "SuperKeyword";
    SyntaxKind[SyntaxKind["SwitchKeyword"] = 92] = "SwitchKeyword";
    SyntaxKind[SyntaxKind["ThisKeyword"] = 93] = "ThisKeyword";
    SyntaxKind[SyntaxKind["ThrowKeyword"] = 94] = "ThrowKeyword";
    SyntaxKind[SyntaxKind["TrueKeyword"] = 95] = "TrueKeyword";
    SyntaxKind[SyntaxKind["TryKeyword"] = 96] = "TryKeyword";
    SyntaxKind[SyntaxKind["TypeOfKeyword"] = 97] = "TypeOfKeyword";
    SyntaxKind[SyntaxKind["VarKeyword"] = 98] = "VarKeyword";
    SyntaxKind[SyntaxKind["VoidKeyword"] = 99] = "VoidKeyword";
    SyntaxKind[SyntaxKind["WhileKeyword"] = 100] = "WhileKeyword";
    SyntaxKind[SyntaxKind["WithKeyword"] = 101] = "WithKeyword";
    // Strict mode reserved words
    SyntaxKind[SyntaxKind["ImplementsKeyword"] = 102] = "ImplementsKeyword";
    SyntaxKind[SyntaxKind["InterfaceKeyword"] = 103] = "InterfaceKeyword";
    SyntaxKind[SyntaxKind["LetKeyword"] = 104] = "LetKeyword";
    SyntaxKind[SyntaxKind["PackageKeyword"] = 105] = "PackageKeyword";
    SyntaxKind[SyntaxKind["PrivateKeyword"] = 106] = "PrivateKeyword";
    SyntaxKind[SyntaxKind["ProtectedKeyword"] = 107] = "ProtectedKeyword";
    SyntaxKind[SyntaxKind["PublicKeyword"] = 108] = "PublicKeyword";
    SyntaxKind[SyntaxKind["StaticKeyword"] = 109] = "StaticKeyword";
    SyntaxKind[SyntaxKind["YieldKeyword"] = 110] = "YieldKeyword";
    // Contextual keywords
    SyntaxKind[SyntaxKind["AsKeyword"] = 111] = "AsKeyword";
    SyntaxKind[SyntaxKind["AnyKeyword"] = 112] = "AnyKeyword";
    SyntaxKind[SyntaxKind["BooleanKeyword"] = 113] = "BooleanKeyword";
    SyntaxKind[SyntaxKind["ConstructorKeyword"] = 114] = "ConstructorKeyword";
    SyntaxKind[SyntaxKind["DeclareKeyword"] = 115] = "DeclareKeyword";
    SyntaxKind[SyntaxKind["GetKeyword"] = 116] = "GetKeyword";
    SyntaxKind[SyntaxKind["ModuleKeyword"] = 117] = "ModuleKeyword";
    SyntaxKind[SyntaxKind["NamespaceKeyword"] = 118] = "NamespaceKeyword";
    SyntaxKind[SyntaxKind["RequireKeyword"] = 119] = "RequireKeyword";
    SyntaxKind[SyntaxKind["NumberKeyword"] = 120] = "NumberKeyword";
    SyntaxKind[SyntaxKind["SetKeyword"] = 121] = "SetKeyword";
    SyntaxKind[SyntaxKind["StringKeyword"] = 122] = "StringKeyword";
    SyntaxKind[SyntaxKind["SymbolKeyword"] = 123] = "SymbolKeyword";
    SyntaxKind[SyntaxKind["TypeKeyword"] = 124] = "TypeKeyword";
    SyntaxKind[SyntaxKind["FromKeyword"] = 125] = "FromKeyword";
    SyntaxKind[SyntaxKind["OfKeyword"] = 126] = "OfKeyword";
    // Parse tree nodes
    // Names
    SyntaxKind[SyntaxKind["QualifiedName"] = 127] = "QualifiedName";
    SyntaxKind[SyntaxKind["ComputedPropertyName"] = 128] = "ComputedPropertyName";
    // Signature elements
    SyntaxKind[SyntaxKind["TypeParameter"] = 129] = "TypeParameter";
    SyntaxKind[SyntaxKind["Parameter"] = 130] = "Parameter";
    SyntaxKind[SyntaxKind["Decorator"] = 131] = "Decorator";
    // TypeMember
    SyntaxKind[SyntaxKind["PropertySignature"] = 132] = "PropertySignature";
    SyntaxKind[SyntaxKind["PropertyDeclaration"] = 133] = "PropertyDeclaration";
    SyntaxKind[SyntaxKind["MethodSignature"] = 134] = "MethodSignature";
    SyntaxKind[SyntaxKind["MethodDeclaration"] = 135] = "MethodDeclaration";
    SyntaxKind[SyntaxKind["Constructor"] = 136] = "Constructor";
    SyntaxKind[SyntaxKind["GetAccessor"] = 137] = "GetAccessor";
    SyntaxKind[SyntaxKind["SetAccessor"] = 138] = "SetAccessor";
    SyntaxKind[SyntaxKind["CallSignature"] = 139] = "CallSignature";
    SyntaxKind[SyntaxKind["ConstructSignature"] = 140] = "ConstructSignature";
    SyntaxKind[SyntaxKind["IndexSignature"] = 141] = "IndexSignature";
    // Type
    SyntaxKind[SyntaxKind["TypeReference"] = 142] = "TypeReference";
    SyntaxKind[SyntaxKind["FunctionType"] = 143] = "FunctionType";
    SyntaxKind[SyntaxKind["ConstructorType"] = 144] = "ConstructorType";
    SyntaxKind[SyntaxKind["TypeQuery"] = 145] = "TypeQuery";
    SyntaxKind[SyntaxKind["TypeLiteral"] = 146] = "TypeLiteral";
    SyntaxKind[SyntaxKind["ArrayType"] = 147] = "ArrayType";
    SyntaxKind[SyntaxKind["TupleType"] = 148] = "TupleType";
    SyntaxKind[SyntaxKind["UnionType"] = 149] = "UnionType";
    SyntaxKind[SyntaxKind["ParenthesizedType"] = 150] = "ParenthesizedType";
    // Binding patterns
    SyntaxKind[SyntaxKind["ObjectBindingPattern"] = 151] = "ObjectBindingPattern";
    SyntaxKind[SyntaxKind["ArrayBindingPattern"] = 152] = "ArrayBindingPattern";
    SyntaxKind[SyntaxKind["BindingElement"] = 153] = "BindingElement";
    // Expression
    SyntaxKind[SyntaxKind["ArrayLiteralExpression"] = 154] = "ArrayLiteralExpression";
    SyntaxKind[SyntaxKind["ObjectLiteralExpression"] = 155] = "ObjectLiteralExpression";
    SyntaxKind[SyntaxKind["PropertyAccessExpression"] = 156] = "PropertyAccessExpression";
    SyntaxKind[SyntaxKind["ElementAccessExpression"] = 157] = "ElementAccessExpression";
    SyntaxKind[SyntaxKind["CallExpression"] = 158] = "CallExpression";
    SyntaxKind[SyntaxKind["NewExpression"] = 159] = "NewExpression";
    SyntaxKind[SyntaxKind["TaggedTemplateExpression"] = 160] = "TaggedTemplateExpression";
    SyntaxKind[SyntaxKind["TypeAssertionExpression"] = 161] = "TypeAssertionExpression";
    SyntaxKind[SyntaxKind["ParenthesizedExpression"] = 162] = "ParenthesizedExpression";
    SyntaxKind[SyntaxKind["FunctionExpression"] = 163] = "FunctionExpression";
    SyntaxKind[SyntaxKind["ArrowFunction"] = 164] = "ArrowFunction";
    SyntaxKind[SyntaxKind["DeleteExpression"] = 165] = "DeleteExpression";
    SyntaxKind[SyntaxKind["TypeOfExpression"] = 166] = "TypeOfExpression";
    SyntaxKind[SyntaxKind["VoidExpression"] = 167] = "VoidExpression";
    SyntaxKind[SyntaxKind["PrefixUnaryExpression"] = 168] = "PrefixUnaryExpression";
    SyntaxKind[SyntaxKind["PostfixUnaryExpression"] = 169] = "PostfixUnaryExpression";
    SyntaxKind[SyntaxKind["BinaryExpression"] = 170] = "BinaryExpression";
    SyntaxKind[SyntaxKind["ConditionalExpression"] = 171] = "ConditionalExpression";
    SyntaxKind[SyntaxKind["TemplateExpression"] = 172] = "TemplateExpression";
    SyntaxKind[SyntaxKind["YieldExpression"] = 173] = "YieldExpression";
    SyntaxKind[SyntaxKind["SpreadElementExpression"] = 174] = "SpreadElementExpression";
    SyntaxKind[SyntaxKind["ClassExpression"] = 175] = "ClassExpression";
    SyntaxKind[SyntaxKind["OmittedExpression"] = 176] = "OmittedExpression";
    SyntaxKind[SyntaxKind["ExpressionWithTypeArguments"] = 177] = "ExpressionWithTypeArguments";
    // Misc
    SyntaxKind[SyntaxKind["TemplateSpan"] = 178] = "TemplateSpan";
    SyntaxKind[SyntaxKind["SemicolonClassElement"] = 179] = "SemicolonClassElement";
    // Element
    SyntaxKind[SyntaxKind["Block"] = 180] = "Block";
    SyntaxKind[SyntaxKind["VariableStatement"] = 181] = "VariableStatement";
    SyntaxKind[SyntaxKind["EmptyStatement"] = 182] = "EmptyStatement";
    SyntaxKind[SyntaxKind["ExpressionStatement"] = 183] = "ExpressionStatement";
    SyntaxKind[SyntaxKind["IfStatement"] = 184] = "IfStatement";
    SyntaxKind[SyntaxKind["DoStatement"] = 185] = "DoStatement";
    SyntaxKind[SyntaxKind["WhileStatement"] = 186] = "WhileStatement";
    SyntaxKind[SyntaxKind["ForStatement"] = 187] = "ForStatement";
    SyntaxKind[SyntaxKind["ForInStatement"] = 188] = "ForInStatement";
    SyntaxKind[SyntaxKind["ForOfStatement"] = 189] = "ForOfStatement";
    SyntaxKind[SyntaxKind["ContinueStatement"] = 190] = "ContinueStatement";
    SyntaxKind[SyntaxKind["BreakStatement"] = 191] = "BreakStatement";
    SyntaxKind[SyntaxKind["ReturnStatement"] = 192] = "ReturnStatement";
    SyntaxKind[SyntaxKind["WithStatement"] = 193] = "WithStatement";
    SyntaxKind[SyntaxKind["SwitchStatement"] = 194] = "SwitchStatement";
    SyntaxKind[SyntaxKind["LabeledStatement"] = 195] = "LabeledStatement";
    SyntaxKind[SyntaxKind["ThrowStatement"] = 196] = "ThrowStatement";
    SyntaxKind[SyntaxKind["TryStatement"] = 197] = "TryStatement";
    SyntaxKind[SyntaxKind["DebuggerStatement"] = 198] = "DebuggerStatement";
    SyntaxKind[SyntaxKind["VariableDeclaration"] = 199] = "VariableDeclaration";
    SyntaxKind[SyntaxKind["VariableDeclarationList"] = 200] = "VariableDeclarationList";
    SyntaxKind[SyntaxKind["FunctionDeclaration"] = 201] = "FunctionDeclaration";
    SyntaxKind[SyntaxKind["ClassDeclaration"] = 202] = "ClassDeclaration";
    SyntaxKind[SyntaxKind["InterfaceDeclaration"] = 203] = "InterfaceDeclaration";
    SyntaxKind[SyntaxKind["TypeAliasDeclaration"] = 204] = "TypeAliasDeclaration";
    SyntaxKind[SyntaxKind["EnumDeclaration"] = 205] = "EnumDeclaration";
    SyntaxKind[SyntaxKind["ModuleDeclaration"] = 206] = "ModuleDeclaration";
    SyntaxKind[SyntaxKind["ModuleBlock"] = 207] = "ModuleBlock";
    SyntaxKind[SyntaxKind["CaseBlock"] = 208] = "CaseBlock";
    SyntaxKind[SyntaxKind["ImportEqualsDeclaration"] = 209] = "ImportEqualsDeclaration";
    SyntaxKind[SyntaxKind["ImportDeclaration"] = 210] = "ImportDeclaration";
    SyntaxKind[SyntaxKind["ImportClause"] = 211] = "ImportClause";
    SyntaxKind[SyntaxKind["NamespaceImport"] = 212] = "NamespaceImport";
    SyntaxKind[SyntaxKind["NamedImports"] = 213] = "NamedImports";
    SyntaxKind[SyntaxKind["ImportSpecifier"] = 214] = "ImportSpecifier";
    SyntaxKind[SyntaxKind["ExportAssignment"] = 215] = "ExportAssignment";
    SyntaxKind[SyntaxKind["ExportDeclaration"] = 216] = "ExportDeclaration";
    SyntaxKind[SyntaxKind["NamedExports"] = 217] = "NamedExports";
    SyntaxKind[SyntaxKind["ExportSpecifier"] = 218] = "ExportSpecifier";
    SyntaxKind[SyntaxKind["MissingDeclaration"] = 219] = "MissingDeclaration";
    // Module references
    SyntaxKind[SyntaxKind["ExternalModuleReference"] = 220] = "ExternalModuleReference";
    // Clauses
    SyntaxKind[SyntaxKind["CaseClause"] = 221] = "CaseClause";
    SyntaxKind[SyntaxKind["DefaultClause"] = 222] = "DefaultClause";
    SyntaxKind[SyntaxKind["HeritageClause"] = 223] = "HeritageClause";
    SyntaxKind[SyntaxKind["CatchClause"] = 224] = "CatchClause";
    // Property assignments
    SyntaxKind[SyntaxKind["PropertyAssignment"] = 225] = "PropertyAssignment";
    SyntaxKind[SyntaxKind["ShorthandPropertyAssignment"] = 226] = "ShorthandPropertyAssignment";
    // Enum
    SyntaxKind[SyntaxKind["EnumMember"] = 227] = "EnumMember";
    // Top-level nodes
    SyntaxKind[SyntaxKind["SourceFile"] = 228] = "SourceFile";
    // Synthesized list
    SyntaxKind[SyntaxKind["SyntaxList"] = 229] = "SyntaxList";
    // Enum value count
    SyntaxKind[SyntaxKind["Count"] = 230] = "Count";
    // Markers
    SyntaxKind[SyntaxKind["FirstAssignment"] = 53] = "FirstAssignment";
    SyntaxKind[SyntaxKind["LastAssignment"] = 64] = "LastAssignment";
    SyntaxKind[SyntaxKind["FirstReservedWord"] = 66] = "FirstReservedWord";
    SyntaxKind[SyntaxKind["LastReservedWord"] = 101] = "LastReservedWord";
    SyntaxKind[SyntaxKind["FirstKeyword"] = 66] = "FirstKeyword";
    SyntaxKind[SyntaxKind["LastKeyword"] = 126] = "LastKeyword";
    SyntaxKind[SyntaxKind["FirstFutureReservedWord"] = 102] = "FirstFutureReservedWord";
    SyntaxKind[SyntaxKind["LastFutureReservedWord"] = 110] = "LastFutureReservedWord";
    SyntaxKind[SyntaxKind["FirstTypeNode"] = 142] = "FirstTypeNode";
    SyntaxKind[SyntaxKind["LastTypeNode"] = 150] = "LastTypeNode";
    SyntaxKind[SyntaxKind["FirstPunctuation"] = 14] = "FirstPunctuation";
    SyntaxKind[SyntaxKind["LastPunctuation"] = 64] = "LastPunctuation";
    SyntaxKind[SyntaxKind["FirstToken"] = 0] = "FirstToken";
    SyntaxKind[SyntaxKind["LastToken"] = 126] = "LastToken";
    SyntaxKind[SyntaxKind["FirstTriviaToken"] = 2] = "FirstTriviaToken";
    SyntaxKind[SyntaxKind["LastTriviaToken"] = 6] = "LastTriviaToken";
    SyntaxKind[SyntaxKind["FirstLiteralToken"] = 7] = "FirstLiteralToken";
    SyntaxKind[SyntaxKind["LastLiteralToken"] = 10] = "LastLiteralToken";
    SyntaxKind[SyntaxKind["FirstTemplateToken"] = 10] = "FirstTemplateToken";
    SyntaxKind[SyntaxKind["LastTemplateToken"] = 13] = "LastTemplateToken";
    SyntaxKind[SyntaxKind["FirstBinaryOperator"] = 24] = "FirstBinaryOperator";
    SyntaxKind[SyntaxKind["LastBinaryOperator"] = 64] = "LastBinaryOperator";
    SyntaxKind[SyntaxKind["FirstNode"] = 127] = "FirstNode";
end)(exports.SyntaxKind || (exports.SyntaxKind = {}));
local SyntaxKind = exports.SyntaxKind;
(function (NodeFlags) {
    NodeFlags[NodeFlags["Export"] = 1] = "Export";
    NodeFlags[NodeFlags["Ambient"] = 2] = "Ambient";
    NodeFlags[NodeFlags["Public"] = 16] = "Public";
    NodeFlags[NodeFlags["Private"] = 32] = "Private";
    NodeFlags[NodeFlags["Protected"] = 64] = "Protected";
    NodeFlags[NodeFlags["Static"] = 128] = "Static";
    NodeFlags[NodeFlags["Default"] = 256] = "Default";
    NodeFlags[NodeFlags["MultiLine"] = 512] = "MultiLine";
    NodeFlags[NodeFlags["Synthetic"] = 1024] = "Synthetic";
    NodeFlags[NodeFlags["DeclarationFile"] = 2048] = "DeclarationFile";
    NodeFlags[NodeFlags["Let"] = 4096] = "Let";
    NodeFlags[NodeFlags["Const"] = 8192] = "Const";
    NodeFlags[NodeFlags["OctalLiteral"] = 16384] = "OctalLiteral";
    NodeFlags[NodeFlags["Namespace"] = 32768] = "Namespace";
    NodeFlags[NodeFlags["ExportContext"] = 65536] = "ExportContext";
    NodeFlags[NodeFlags["ParentIsClassObject"] = 1048576] = "ParentIsClassObject";
    NodeFlags[NodeFlags["IsClassObjectMethodCall"] = 2097152] = "IsClassObjectMethodCall";
    NodeFlags[NodeFlags["Modifier"] = 499] = "Modifier";
    NodeFlags[NodeFlags["AccessibilityModifier"] = 112] = "AccessibilityModifier";
    NodeFlags[NodeFlags["BlockScoped"] = 12288] = "BlockScoped";
end)(exports.NodeFlags || (exports.NodeFlags = {}));
local NodeFlags = exports.NodeFlags;
/* @internal */
(function (ParserContextFlags) {
    // Set if this node was parsed in strict mode.  Used for grammar error checks, as well as
    // checking if the node can be reused in incremental settings.
    ParserContextFlags[ParserContextFlags["StrictMode"] = 1] = "StrictMode";
    // If this node was parsed in a context where 'in-expressions' are not allowed.
    ParserContextFlags[ParserContextFlags["DisallowIn"] = 2] = "DisallowIn";
    // If this node was parsed in the 'yield' context created when parsing a generator.
    ParserContextFlags[ParserContextFlags["Yield"] = 4] = "Yield";
    // If this node was parsed in the parameters of a generator.
    ParserContextFlags[ParserContextFlags["GeneratorParameter"] = 8] = "GeneratorParameter";
    // If this node was parsed as part of a decorator
    ParserContextFlags[ParserContextFlags["Decorator"] = 16] = "Decorator";
    // If the parser encountered an error when parsing the code that created this node.  Note
    // the parser only sets this directly on the node it creates right after encountering the
    // error.
    ParserContextFlags[ParserContextFlags["ThisNodeHasError"] = 32] = "ThisNodeHasError";
    // Context flags set directly by the parser.
    ParserContextFlags[ParserContextFlags["ParserGeneratedFlags"] = 63] = "ParserGeneratedFlags";
    // Context flags computed by aggregating child flags upwards.
    // Used during incremental parsing to determine if this node or any of its children had an
    // error.  Computed only once and then cached.
    ParserContextFlags[ParserContextFlags["ThisNodeOrAnySubNodesHasError"] = 64] = "ThisNodeOrAnySubNodesHasError";
    // Used to know if we've computed data from children and cached it in this node.
    ParserContextFlags[ParserContextFlags["HasAggregatedChildData"] = 128] = "HasAggregatedChildData";
end)(exports.ParserContextFlags || (exports.ParserContextFlags = {}));
local ParserContextFlags = exports.ParserContextFlags;
/* @internal */
(function (RelationComparisonResult) {
    RelationComparisonResult[RelationComparisonResult["Succeeded"] = 1] = "Succeeded";
    RelationComparisonResult[RelationComparisonResult["Failed"] = 2] = "Failed";
    RelationComparisonResult[RelationComparisonResult["FailedAndReported"] = 3] = "FailedAndReported";
end)(exports.RelationComparisonResult || (exports.RelationComparisonResult = {}));
local RelationComparisonResult = exports.RelationComparisonResult;
/** Return code used by getEmitOutput function to indicate status of the function */
(function (ExitStatus) {
    // Compiler ran successfully.  Either this was a simple do-nothing compilation (for example,
    // when -version or -help was provided, or this was a normal compilation, no diagnostics
    // were produced, and all outputs were generated successfully.
    ExitStatus[ExitStatus["Success"] = 0] = "Success";
    // Diagnostics were produced and because of them no code was generated.
    ExitStatus[ExitStatus["DiagnosticsPresent_OutputsSkipped"] = 1] = "DiagnosticsPresent_OutputsSkipped";
    // Diagnostics were produced and outputs were generated in spite of them.
    ExitStatus[ExitStatus["DiagnosticsPresent_OutputsGenerated"] = 2] = "DiagnosticsPresent_OutputsGenerated";
end)(exports.ExitStatus || (exports.ExitStatus = {}));
local ExitStatus = exports.ExitStatus;
(function (TypeFormatFlags) {
    TypeFormatFlags[TypeFormatFlags["None"] = 0] = "None";
    TypeFormatFlags[TypeFormatFlags["WriteArrayAsGenericType"] = 1] = "WriteArrayAsGenericType";
    TypeFormatFlags[TypeFormatFlags["UseTypeOfFunction"] = 2] = "UseTypeOfFunction";
    TypeFormatFlags[TypeFormatFlags["NoTruncation"] = 4] = "NoTruncation";
    TypeFormatFlags[TypeFormatFlags["WriteArrowStyleSignature"] = 8] = "WriteArrowStyleSignature";
    TypeFormatFlags[TypeFormatFlags["WriteOwnNameForAnyLike"] = 16] = "WriteOwnNameForAnyLike";
    TypeFormatFlags[TypeFormatFlags["WriteTypeArgumentsOfSignature"] = 32] = "WriteTypeArgumentsOfSignature";
    TypeFormatFlags[TypeFormatFlags["InElementType"] = 64] = "InElementType";
    TypeFormatFlags[TypeFormatFlags["UseFullyQualifiedType"] = 128] = "UseFullyQualifiedType";
end)(exports.TypeFormatFlags || (exports.TypeFormatFlags = {}));
local TypeFormatFlags = exports.TypeFormatFlags;
(function (SymbolFormatFlags) {
    SymbolFormatFlags[SymbolFormatFlags["None"] = 0] = "None";
    // Write symbols's type argument if it is instantiated symbol
    // eg. class C<T> { p: T }   <-- Show p as C<T>.p here
    //     var a: C<number>;
    //     var p = a.p;  <--- Here p is property of C<number> so show it as C<number>.p instead of just C.p
    SymbolFormatFlags[SymbolFormatFlags["WriteTypeParametersOrArguments"] = 1] = "WriteTypeParametersOrArguments";
    // Use only external alias information to get the symbol name in the given context
    // eg.  module m { export class c { } } import x = m.c;
    // When this flag is specified m.c will be used to refer to the class instead of alias symbol x
    SymbolFormatFlags[SymbolFormatFlags["UseOnlyExternalAliasing"] = 2] = "UseOnlyExternalAliasing";
end)(exports.SymbolFormatFlags || (exports.SymbolFormatFlags = {}));
local SymbolFormatFlags = exports.SymbolFormatFlags;
/* @internal */
(function (SymbolAccessibility) {
    SymbolAccessibility[SymbolAccessibility["Accessible"] = 0] = "Accessible";
    SymbolAccessibility[SymbolAccessibility["NotAccessible"] = 1] = "NotAccessible";
    SymbolAccessibility[SymbolAccessibility["CannotBeNamed"] = 2] = "CannotBeNamed";
end)(exports.SymbolAccessibility || (exports.SymbolAccessibility = {}));
local SymbolAccessibility = exports.SymbolAccessibility;
(function (SymbolFlags) {
    SymbolFlags[SymbolFlags["FunctionScopedVariable"] = 1] = "FunctionScopedVariable";
    SymbolFlags[SymbolFlags["BlockScopedVariable"] = 2] = "BlockScopedVariable";
    SymbolFlags[SymbolFlags["Property"] = 4] = "Property";
    SymbolFlags[SymbolFlags["EnumMember"] = 8] = "EnumMember";
    SymbolFlags[SymbolFlags["Function"] = 16] = "Function";
    SymbolFlags[SymbolFlags["Class"] = 32] = "Class";
    SymbolFlags[SymbolFlags["Interface"] = 64] = "Interface";
    SymbolFlags[SymbolFlags["ConstEnum"] = 128] = "ConstEnum";
    SymbolFlags[SymbolFlags["RegularEnum"] = 256] = "RegularEnum";
    SymbolFlags[SymbolFlags["ValueModule"] = 512] = "ValueModule";
    SymbolFlags[SymbolFlags["NamespaceModule"] = 1024] = "NamespaceModule";
    SymbolFlags[SymbolFlags["TypeLiteral"] = 2048] = "TypeLiteral";
    SymbolFlags[SymbolFlags["ObjectLiteral"] = 4096] = "ObjectLiteral";
    SymbolFlags[SymbolFlags["Method"] = 8192] = "Method";
    SymbolFlags[SymbolFlags["Constructor"] = 16384] = "Constructor";
    SymbolFlags[SymbolFlags["GetAccessor"] = 32768] = "GetAccessor";
    SymbolFlags[SymbolFlags["SetAccessor"] = 65536] = "SetAccessor";
    SymbolFlags[SymbolFlags["Signature"] = 131072] = "Signature";
    SymbolFlags[SymbolFlags["TypeParameter"] = 262144] = "TypeParameter";
    SymbolFlags[SymbolFlags["TypeAlias"] = 524288] = "TypeAlias";
    SymbolFlags[SymbolFlags["ExportValue"] = 1048576] = "ExportValue";
    SymbolFlags[SymbolFlags["ExportType"] = 2097152] = "ExportType";
    SymbolFlags[SymbolFlags["ExportNamespace"] = 4194304] = "ExportNamespace";
    SymbolFlags[SymbolFlags["Alias"] = 8388608] = "Alias";
    SymbolFlags[SymbolFlags["Instantiated"] = 16777216] = "Instantiated";
    SymbolFlags[SymbolFlags["Merged"] = 33554432] = "Merged";
    SymbolFlags[SymbolFlags["Transient"] = 67108864] = "Transient";
    SymbolFlags[SymbolFlags["Prototype"] = 134217728] = "Prototype";
    SymbolFlags[SymbolFlags["UnionProperty"] = 268435456] = "UnionProperty";
    SymbolFlags[SymbolFlags["Optional"] = 536870912] = "Optional";
    SymbolFlags[SymbolFlags["ExportStar"] = 1073741824] = "ExportStar";
    SymbolFlags[SymbolFlags["Enum"] = 384] = "Enum";
    SymbolFlags[SymbolFlags["Variable"] = 3] = "Variable";
    SymbolFlags[SymbolFlags["Value"] = 107455] = "Value";
    SymbolFlags[SymbolFlags["Type"] = 793056] = "Type";
    SymbolFlags[SymbolFlags["Namespace"] = 1536] = "Namespace";
    SymbolFlags[SymbolFlags["Module"] = 1536] = "Module";
    SymbolFlags[SymbolFlags["Accessor"] = 98304] = "Accessor";
    // Variables can be redeclared, but can not redeclare a block-scoped declaration with the
    // same name, or any other value that is not a variable, e.g. ValueModule or Class
    SymbolFlags[SymbolFlags["FunctionScopedVariableExcludes"] = 107454] = "FunctionScopedVariableExcludes";
    // Block-scoped declarations are not allowed to be re-declared
    // they can not merge with anything in the value space
    SymbolFlags[SymbolFlags["BlockScopedVariableExcludes"] = 107455] = "BlockScopedVariableExcludes";
    SymbolFlags[SymbolFlags["ParameterExcludes"] = 107455] = "ParameterExcludes";
    SymbolFlags[SymbolFlags["PropertyExcludes"] = 107455] = "PropertyExcludes";
    SymbolFlags[SymbolFlags["EnumMemberExcludes"] = 107455] = "EnumMemberExcludes";
    SymbolFlags[SymbolFlags["FunctionExcludes"] = 106927] = "FunctionExcludes";
    SymbolFlags[SymbolFlags["ClassExcludes"] = 899583] = "ClassExcludes";
    SymbolFlags[SymbolFlags["InterfaceExcludes"] = 792992] = "InterfaceExcludes";
    SymbolFlags[SymbolFlags["RegularEnumExcludes"] = 899327] = "RegularEnumExcludes";
    SymbolFlags[SymbolFlags["ConstEnumExcludes"] = 899967] = "ConstEnumExcludes";
    SymbolFlags[SymbolFlags["ValueModuleExcludes"] = 106639] = "ValueModuleExcludes";
    SymbolFlags[SymbolFlags["NamespaceModuleExcludes"] = 0] = "NamespaceModuleExcludes";
    SymbolFlags[SymbolFlags["MethodExcludes"] = 99263] = "MethodExcludes";
    SymbolFlags[SymbolFlags["GetAccessorExcludes"] = 41919] = "GetAccessorExcludes";
    SymbolFlags[SymbolFlags["SetAccessorExcludes"] = 74687] = "SetAccessorExcludes";
    SymbolFlags[SymbolFlags["TypeParameterExcludes"] = 530912] = "TypeParameterExcludes";
    SymbolFlags[SymbolFlags["TypeAliasExcludes"] = 793056] = "TypeAliasExcludes";
    SymbolFlags[SymbolFlags["AliasExcludes"] = 8388608] = "AliasExcludes";
    SymbolFlags[SymbolFlags["ModuleMember"] = 8914931] = "ModuleMember";
    SymbolFlags[SymbolFlags["ExportHasLocal"] = 944] = "ExportHasLocal";
    SymbolFlags[SymbolFlags["HasLocals"] = 255504] = "HasLocals";
    SymbolFlags[SymbolFlags["HasExports"] = 1952] = "HasExports";
    SymbolFlags[SymbolFlags["HasMembers"] = 6240] = "HasMembers";
    SymbolFlags[SymbolFlags["IsContainer"] = 262128] = "IsContainer";
    SymbolFlags[SymbolFlags["PropertyOrAccessor"] = 98308] = "PropertyOrAccessor";
    SymbolFlags[SymbolFlags["Export"] = 7340032] = "Export";
end)(exports.SymbolFlags || (exports.SymbolFlags = {}));
local SymbolFlags = exports.SymbolFlags;
/* @internal */
(function (NodeCheckFlags) {
    NodeCheckFlags[NodeCheckFlags["TypeChecked"] = 1] = "TypeChecked";
    NodeCheckFlags[NodeCheckFlags["LexicalThis"] = 2] = "LexicalThis";
    NodeCheckFlags[NodeCheckFlags["CaptureThis"] = 4] = "CaptureThis";
    NodeCheckFlags[NodeCheckFlags["EmitExtends"] = 8] = "EmitExtends";
    NodeCheckFlags[NodeCheckFlags["SuperInstance"] = 16] = "SuperInstance";
    NodeCheckFlags[NodeCheckFlags["SuperStatic"] = 32] = "SuperStatic";
    NodeCheckFlags[NodeCheckFlags["ContextChecked"] = 64] = "ContextChecked";
    // Values for enum members have been computed, and any errors have been reported for them.
    NodeCheckFlags[NodeCheckFlags["EnumValuesComputed"] = 128] = "EnumValuesComputed";
    NodeCheckFlags[NodeCheckFlags["BlockScopedBindingInLoop"] = 256] = "BlockScopedBindingInLoop";
    NodeCheckFlags[NodeCheckFlags["EmitDecorate"] = 512] = "EmitDecorate";
    NodeCheckFlags[NodeCheckFlags["EmitParam"] = 1024] = "EmitParam";
    NodeCheckFlags[NodeCheckFlags["LexicalModuleMergesWithClass"] = 2048] = "LexicalModuleMergesWithClass";
end)(exports.NodeCheckFlags || (exports.NodeCheckFlags = {}));
local NodeCheckFlags = exports.NodeCheckFlags;
(function (TypeFlags) {
    TypeFlags[TypeFlags["Any"] = 1] = "Any";
    TypeFlags[TypeFlags["String"] = 2] = "String";
    TypeFlags[TypeFlags["Number"] = 4] = "Number";
    TypeFlags[TypeFlags["Boolean"] = 8] = "Boolean";
    TypeFlags[TypeFlags["Void"] = 16] = "Void";
    TypeFlags[TypeFlags["Undefined"] = 32] = "Undefined";
    TypeFlags[TypeFlags["Null"] = 64] = "Null";
    TypeFlags[TypeFlags["Enum"] = 128] = "Enum";
    TypeFlags[TypeFlags["StringLiteral"] = 256] = "StringLiteral";
    TypeFlags[TypeFlags["TypeParameter"] = 512] = "TypeParameter";
    TypeFlags[TypeFlags["Class"] = 1024] = "Class";
    TypeFlags[TypeFlags["Interface"] = 2048] = "Interface";
    TypeFlags[TypeFlags["Reference"] = 4096] = "Reference";
    TypeFlags[TypeFlags["Tuple"] = 8192] = "Tuple";
    TypeFlags[TypeFlags["Union"] = 16384] = "Union";
    TypeFlags[TypeFlags["Anonymous"] = 32768] = "Anonymous";
    /* @internal */
    TypeFlags[TypeFlags["FromSignature"] = 65536] = "FromSignature";
    TypeFlags[TypeFlags["ObjectLiteral"] = 131072] = "ObjectLiteral";
    /* @internal */
    TypeFlags[TypeFlags["ContainsUndefinedOrNull"] = 262144] = "ContainsUndefinedOrNull";
    /* @internal */
    TypeFlags[TypeFlags["ContainsObjectLiteral"] = 524288] = "ContainsObjectLiteral";
    TypeFlags[TypeFlags["ESSymbol"] = 1048576] = "ESSymbol";
    /* @internal */
    TypeFlags[TypeFlags["Intrinsic"] = 1048703] = "Intrinsic";
    /* @internal */
    TypeFlags[TypeFlags["Primitive"] = 1049086] = "Primitive";
    TypeFlags[TypeFlags["StringLike"] = 258] = "StringLike";
    TypeFlags[TypeFlags["NumberLike"] = 132] = "NumberLike";
    TypeFlags[TypeFlags["ObjectType"] = 48128] = "ObjectType";
    /* @internal */
    TypeFlags[TypeFlags["RequiresWidening"] = 786432] = "RequiresWidening";
end)(exports.TypeFlags || (exports.TypeFlags = {}));
local TypeFlags = exports.TypeFlags;
(function (SignatureKind) {
    SignatureKind[SignatureKind["Call"] = 0] = "Call";
    SignatureKind[SignatureKind["Construct"] = 1] = "Construct";
end)(exports.SignatureKind || (exports.SignatureKind = {}));
local SignatureKind = exports.SignatureKind;
(function (IndexKind) {
    IndexKind[IndexKind["String"] = 0] = "String";
    IndexKind[IndexKind["Number"] = 1] = "Number";
end)(exports.IndexKind || (exports.IndexKind = {}));
local IndexKind = exports.IndexKind;
(function (DiagnosticCategory) {
    DiagnosticCategory[DiagnosticCategory["Warning"] = 0] = "Warning";
    DiagnosticCategory[DiagnosticCategory["Error"] = 1] = "Error";
    DiagnosticCategory[DiagnosticCategory["Message"] = 2] = "Message";
end)(exports.DiagnosticCategory || (exports.DiagnosticCategory = {}));
local DiagnosticCategory = exports.DiagnosticCategory;
(function (ModuleKind) {
    ModuleKind[ModuleKind["None"] = 0] = "None";
    ModuleKind[ModuleKind["CommonJS"] = 1] = "CommonJS";
    ModuleKind[ModuleKind["AMD"] = 2] = "AMD";
    ModuleKind[ModuleKind["UMD"] = 3] = "UMD";
    ModuleKind[ModuleKind["System"] = 4] = "System";
end)(exports.ModuleKind || (exports.ModuleKind = {}));
local ModuleKind = exports.ModuleKind;
(function (NewLineKind) {
    NewLineKind[NewLineKind["CarriageReturnLineFeed"] = 0] = "CarriageReturnLineFeed";
    NewLineKind[NewLineKind["LineFeed"] = 1] = "LineFeed";
end)(exports.NewLineKind || (exports.NewLineKind = {}));
local NewLineKind = exports.NewLineKind;
(function (ScriptTarget) {
    ScriptTarget[ScriptTarget["ES3"] = 0] = "ES3";
    ScriptTarget[ScriptTarget["ES5"] = 1] = "ES5";
    ScriptTarget[ScriptTarget["ES6"] = 2] = "ES6";
    ScriptTarget[ScriptTarget["Latest"] = 2] = "Latest";
end)(exports.ScriptTarget || (exports.ScriptTarget = {}));
local ScriptTarget = exports.ScriptTarget;
/* @internal */
(function (CharacterCodes) {
    CharacterCodes[CharacterCodes["nullCharacter"] = 0] = "nullCharacter";
    CharacterCodes[CharacterCodes["maxAsciiCharacter"] = 127] = "maxAsciiCharacter";
    CharacterCodes[CharacterCodes["lineFeed"] = 10] = "lineFeed";
    CharacterCodes[CharacterCodes["carriageReturn"] = 13] = "carriageReturn";
    CharacterCodes[CharacterCodes["lineSeparator"] = 8232] = "lineSeparator";
    CharacterCodes[CharacterCodes["paragraphSeparator"] = 8233] = "paragraphSeparator";
    CharacterCodes[CharacterCodes["nextLine"] = 133] = "nextLine";
    // Unicode 3.0 space characters
    CharacterCodes[CharacterCodes["space"] = 32] = "space";
    CharacterCodes[CharacterCodes["nonBreakingSpace"] = 160] = "nonBreakingSpace";
    CharacterCodes[CharacterCodes["enQuad"] = 8192] = "enQuad";
    CharacterCodes[CharacterCodes["emQuad"] = 8193] = "emQuad";
    CharacterCodes[CharacterCodes["enSpace"] = 8194] = "enSpace";
    CharacterCodes[CharacterCodes["emSpace"] = 8195] = "emSpace";
    CharacterCodes[CharacterCodes["threePerEmSpace"] = 8196] = "threePerEmSpace";
    CharacterCodes[CharacterCodes["fourPerEmSpace"] = 8197] = "fourPerEmSpace";
    CharacterCodes[CharacterCodes["sixPerEmSpace"] = 8198] = "sixPerEmSpace";
    CharacterCodes[CharacterCodes["figureSpace"] = 8199] = "figureSpace";
    CharacterCodes[CharacterCodes["punctuationSpace"] = 8200] = "punctuationSpace";
    CharacterCodes[CharacterCodes["thinSpace"] = 8201] = "thinSpace";
    CharacterCodes[CharacterCodes["hairSpace"] = 8202] = "hairSpace";
    CharacterCodes[CharacterCodes["zeroWidthSpace"] = 8203] = "zeroWidthSpace";
    CharacterCodes[CharacterCodes["narrowNoBreakSpace"] = 8239] = "narrowNoBreakSpace";
    CharacterCodes[CharacterCodes["ideographicSpace"] = 12288] = "ideographicSpace";
    CharacterCodes[CharacterCodes["mathematicalSpace"] = 8287] = "mathematicalSpace";
    CharacterCodes[CharacterCodes["ogham"] = 5760] = "ogham";
    CharacterCodes[CharacterCodes["_"] = 95] = "_";
    CharacterCodes[CharacterCodes["$"] = 36] = "$";
    CharacterCodes[CharacterCodes["_0"] = 48] = "_0";
    CharacterCodes[CharacterCodes["_1"] = 49] = "_1";
    CharacterCodes[CharacterCodes["_2"] = 50] = "_2";
    CharacterCodes[CharacterCodes["_3"] = 51] = "_3";
    CharacterCodes[CharacterCodes["_4"] = 52] = "_4";
    CharacterCodes[CharacterCodes["_5"] = 53] = "_5";
    CharacterCodes[CharacterCodes["_6"] = 54] = "_6";
    CharacterCodes[CharacterCodes["_7"] = 55] = "_7";
    CharacterCodes[CharacterCodes["_8"] = 56] = "_8";
    CharacterCodes[CharacterCodes["_9"] = 57] = "_9";
    CharacterCodes[CharacterCodes["a"] = 97] = "a";
    CharacterCodes[CharacterCodes["b"] = 98] = "b";
    CharacterCodes[CharacterCodes["c"] = 99] = "c";
    CharacterCodes[CharacterCodes["d"] = 100] = "d";
    CharacterCodes[CharacterCodes["e"] = 101] = "e";
    CharacterCodes[CharacterCodes["f"] = 102] = "f";
    CharacterCodes[CharacterCodes["g"] = 103] = "g";
    CharacterCodes[CharacterCodes["h"] = 104] = "h";
    CharacterCodes[CharacterCodes["i"] = 105] = "i";
    CharacterCodes[CharacterCodes["j"] = 106] = "j";
    CharacterCodes[CharacterCodes["k"] = 107] = "k";
    CharacterCodes[CharacterCodes["l"] = 108] = "l";
    CharacterCodes[CharacterCodes["m"] = 109] = "m";
    CharacterCodes[CharacterCodes["n"] = 110] = "n";
    CharacterCodes[CharacterCodes["o"] = 111] = "o";
    CharacterCodes[CharacterCodes["p"] = 112] = "p";
    CharacterCodes[CharacterCodes["q"] = 113] = "q";
    CharacterCodes[CharacterCodes["r"] = 114] = "r";
    CharacterCodes[CharacterCodes["s"] = 115] = "s";
    CharacterCodes[CharacterCodes["t"] = 116] = "t";
    CharacterCodes[CharacterCodes["u"] = 117] = "u";
    CharacterCodes[CharacterCodes["v"] = 118] = "v";
    CharacterCodes[CharacterCodes["w"] = 119] = "w";
    CharacterCodes[CharacterCodes["x"] = 120] = "x";
    CharacterCodes[CharacterCodes["y"] = 121] = "y";
    CharacterCodes[CharacterCodes["z"] = 122] = "z";
    CharacterCodes[CharacterCodes["A"] = 65] = "A";
    CharacterCodes[CharacterCodes["B"] = 66] = "B";
    CharacterCodes[CharacterCodes["C"] = 67] = "C";
    CharacterCodes[CharacterCodes["D"] = 68] = "D";
    CharacterCodes[CharacterCodes["E"] = 69] = "E";
    CharacterCodes[CharacterCodes["F"] = 70] = "F";
    CharacterCodes[CharacterCodes["G"] = 71] = "G";
    CharacterCodes[CharacterCodes["H"] = 72] = "H";
    CharacterCodes[CharacterCodes["I"] = 73] = "I";
    CharacterCodes[CharacterCodes["J"] = 74] = "J";
    CharacterCodes[CharacterCodes["K"] = 75] = "K";
    CharacterCodes[CharacterCodes["L"] = 76] = "L";
    CharacterCodes[CharacterCodes["M"] = 77] = "M";
    CharacterCodes[CharacterCodes["N"] = 78] = "N";
    CharacterCodes[CharacterCodes["O"] = 79] = "O";
    CharacterCodes[CharacterCodes["P"] = 80] = "P";
    CharacterCodes[CharacterCodes["Q"] = 81] = "Q";
    CharacterCodes[CharacterCodes["R"] = 82] = "R";
    CharacterCodes[CharacterCodes["S"] = 83] = "S";
    CharacterCodes[CharacterCodes["T"] = 84] = "T";
    CharacterCodes[CharacterCodes["U"] = 85] = "U";
    CharacterCodes[CharacterCodes["V"] = 86] = "V";
    CharacterCodes[CharacterCodes["W"] = 87] = "W";
    CharacterCodes[CharacterCodes["X"] = 88] = "X";
    CharacterCodes[CharacterCodes["Y"] = 89] = "Y";
    CharacterCodes[CharacterCodes["Z"] = 90] = "Z";
    CharacterCodes[CharacterCodes["ampersand"] = 38] = "ampersand";
    CharacterCodes[CharacterCodes["asterisk"] = 42] = "asterisk";
    CharacterCodes[CharacterCodes["at"] = 64] = "at";
    CharacterCodes[CharacterCodes["backslash"] = 92] = "backslash";
    CharacterCodes[CharacterCodes["backtick"] = 96] = "backtick";
    CharacterCodes[CharacterCodes["bar"] = 124] = "bar";
    CharacterCodes[CharacterCodes["caret"] = 94] = "caret";
    CharacterCodes[CharacterCodes["closeBrace"] = 125] = "closeBrace";
    CharacterCodes[CharacterCodes["closeBracket"] = 93] = "closeBracket";
    CharacterCodes[CharacterCodes["closeParen"] = 41] = "closeParen";
    CharacterCodes[CharacterCodes["colon"] = 58] = "colon";
    CharacterCodes[CharacterCodes["comma"] = 44] = "comma";
    CharacterCodes[CharacterCodes["dot"] = 46] = "dot";
    CharacterCodes[CharacterCodes["doubleQuote"] = 34] = "doubleQuote";
    CharacterCodes[CharacterCodes["equals"] = 61] = "equals";
    CharacterCodes[CharacterCodes["exclamation"] = 33] = "exclamation";
    CharacterCodes[CharacterCodes["greaterThan"] = 62] = "greaterThan";
    CharacterCodes[CharacterCodes["hash"] = 35] = "hash";
    CharacterCodes[CharacterCodes["lessThan"] = 60] = "lessThan";
    CharacterCodes[CharacterCodes["minus"] = 45] = "minus";
    CharacterCodes[CharacterCodes["openBrace"] = 123] = "openBrace";
    CharacterCodes[CharacterCodes["openBracket"] = 91] = "openBracket";
    CharacterCodes[CharacterCodes["openParen"] = 40] = "openParen";
    CharacterCodes[CharacterCodes["percent"] = 37] = "percent";
    CharacterCodes[CharacterCodes["plus"] = 43] = "plus";
    CharacterCodes[CharacterCodes["question"] = 63] = "question";
    CharacterCodes[CharacterCodes["semicolon"] = 59] = "semicolon";
    CharacterCodes[CharacterCodes["singleQuote"] = 39] = "singleQuote";
    CharacterCodes[CharacterCodes["slash"] = 47] = "slash";
    CharacterCodes[CharacterCodes["tilde"] = 126] = "tilde";
    CharacterCodes[CharacterCodes["backspace"] = 8] = "backspace";
    CharacterCodes[CharacterCodes["formFeed"] = 12] = "formFeed";
    CharacterCodes[CharacterCodes["byteOrderMark"] = 65279] = "byteOrderMark";
    CharacterCodes[CharacterCodes["tab"] = 9] = "tab";
    CharacterCodes[CharacterCodes["verticalTab"] = 11] = "verticalTab";
end)(exports.CharacterCodes || (exports.CharacterCodes = {}));
local CharacterCodes = exports.CharacterCodes;
//# sourceMappingURL=file:///C:/Users/qujianbiao/Downloads/TypeScript-master/built/local/compiler/types.js.map