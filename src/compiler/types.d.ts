export declare const enum SyntaxKind {
    Unknown = 0,
    EndOfFileToken = 1,
    SingleLineCommentTrivia = 2,
    MultiLineCommentTrivia = 3,
    NewLineTrivia = 4,
    WhitespaceTrivia = 5,
    ConflictMarkerTrivia = 6,
    NumericLiteral = 7,
    StringLiteral = 8,
    RegularExpressionLiteral = 9,
    NoSubstitutionTemplateLiteral = 10,
    TemplateHead = 11,
    TemplateMiddle = 12,
    TemplateTail = 13,
    OpenBraceToken = 14,
    CloseBraceToken = 15,
    OpenParenToken = 16,
    CloseParenToken = 17,
    OpenBracketToken = 18,
    CloseBracketToken = 19,
    DotToken = 20,
    DotDotDotToken = 21,
    SemicolonToken = 22,
    CommaToken = 23,
    LessThanToken = 24,
    GreaterThanToken = 25,
    LessThanEqualsToken = 26,
    GreaterThanEqualsToken = 27,
    EqualsEqualsToken = 28,
    ExclamationEqualsToken = 29,
    EqualsEqualsEqualsToken = 30,
    ExclamationEqualsEqualsToken = 31,
    EqualsGreaterThanToken = 32,
    PlusToken = 33,
    MinusToken = 34,
    AsteriskToken = 35,
    SlashToken = 36,
    PercentToken = 37,
    PlusPlusToken = 38,
    MinusMinusToken = 39,
    LessThanLessThanToken = 40,
    GreaterThanGreaterThanToken = 41,
    GreaterThanGreaterThanGreaterThanToken = 42,
    AmpersandToken = 43,
    BarToken = 44,
    CaretToken = 45,
    ExclamationToken = 46,
    TildeToken = 47,
    AmpersandAmpersandToken = 48,
    BarBarToken = 49,
    QuestionToken = 50,
    ColonToken = 51,
    AtToken = 52,
    EqualsToken = 53,
    PlusEqualsToken = 54,
    MinusEqualsToken = 55,
    AsteriskEqualsToken = 56,
    SlashEqualsToken = 57,
    PercentEqualsToken = 58,
    LessThanLessThanEqualsToken = 59,
    GreaterThanGreaterThanEqualsToken = 60,
    GreaterThanGreaterThanGreaterThanEqualsToken = 61,
    AmpersandEqualsToken = 62,
    BarEqualsToken = 63,
    CaretEqualsToken = 64,
    Identifier = 65,
    BreakKeyword = 66,
    CaseKeyword = 67,
    CatchKeyword = 68,
    ClassKeyword = 69,
    ConstKeyword = 70,
    ContinueKeyword = 71,
    DebuggerKeyword = 72,
    DefaultKeyword = 73,
    DeleteKeyword = 74,
    DoKeyword = 75,
    ElseKeyword = 76,
    EnumKeyword = 77,
    ExportKeyword = 78,
    ExtendsKeyword = 79,
    FalseKeyword = 80,
    FinallyKeyword = 81,
    ForKeyword = 82,
    FunctionKeyword = 83,
    IfKeyword = 84,
    ImportKeyword = 85,
    InKeyword = 86,
    InstanceOfKeyword = 87,
    NewKeyword = 88,
    NullKeyword = 89,
    ReturnKeyword = 90,
    SuperKeyword = 91,
    SwitchKeyword = 92,
    ThisKeyword = 93,
    ThrowKeyword = 94,
    TrueKeyword = 95,
    TryKeyword = 96,
    TypeOfKeyword = 97,
    VarKeyword = 98,
    VoidKeyword = 99,
    WhileKeyword = 100,
    WithKeyword = 101,
    ImplementsKeyword = 102,
    InterfaceKeyword = 103,
    LetKeyword = 104,
    PackageKeyword = 105,
    PrivateKeyword = 106,
    ProtectedKeyword = 107,
    PublicKeyword = 108,
    StaticKeyword = 109,
    YieldKeyword = 110,
    AsKeyword = 111,
    AnyKeyword = 112,
    BooleanKeyword = 113,
    ConstructorKeyword = 114,
    DeclareKeyword = 115,
    GetKeyword = 116,
    ModuleKeyword = 117,
    NamespaceKeyword = 118,
    RequireKeyword = 119,
    NumberKeyword = 120,
    SetKeyword = 121,
    StringKeyword = 122,
    SymbolKeyword = 123,
    TypeKeyword = 124,
    FromKeyword = 125,
    OfKeyword = 126,
    QualifiedName = 127,
    ComputedPropertyName = 128,
    TypeParameter = 129,
    Parameter = 130,
    Decorator = 131,
    PropertySignature = 132,
    PropertyDeclaration = 133,
    MethodSignature = 134,
    MethodDeclaration = 135,
    Constructor = 136,
    GetAccessor = 137,
    SetAccessor = 138,
    CallSignature = 139,
    ConstructSignature = 140,
    IndexSignature = 141,
    TypeReference = 142,
    FunctionType = 143,
    ConstructorType = 144,
    TypeQuery = 145,
    TypeLiteral = 146,
    ArrayType = 147,
    TupleType = 148,
    UnionType = 149,
    ParenthesizedType = 150,
    ObjectBindingPattern = 151,
    ArrayBindingPattern = 152,
    BindingElement = 153,
    ArrayLiteralExpression = 154,
    ObjectLiteralExpression = 155,
    PropertyAccessExpression = 156,
    ElementAccessExpression = 157,
    CallExpression = 158,
    NewExpression = 159,
    TaggedTemplateExpression = 160,
    TypeAssertionExpression = 161,
    ParenthesizedExpression = 162,
    FunctionExpression = 163,
    ArrowFunction = 164,
    DeleteExpression = 165,
    TypeOfExpression = 166,
    VoidExpression = 167,
    PrefixUnaryExpression = 168,
    PostfixUnaryExpression = 169,
    BinaryExpression = 170,
    ConditionalExpression = 171,
    TemplateExpression = 172,
    YieldExpression = 173,
    SpreadElementExpression = 174,
    ClassExpression = 175,
    OmittedExpression = 176,
    ExpressionWithTypeArguments = 177,
    TemplateSpan = 178,
    SemicolonClassElement = 179,
    Block = 180,
    VariableStatement = 181,
    EmptyStatement = 182,
    ExpressionStatement = 183,
    IfStatement = 184,
    DoStatement = 185,
    WhileStatement = 186,
    ForStatement = 187,
    ForInStatement = 188,
    ForOfStatement = 189,
    ContinueStatement = 190,
    BreakStatement = 191,
    ReturnStatement = 192,
    WithStatement = 193,
    SwitchStatement = 194,
    LabeledStatement = 195,
    ThrowStatement = 196,
    TryStatement = 197,
    DebuggerStatement = 198,
    VariableDeclaration = 199,
    VariableDeclarationList = 200,
    FunctionDeclaration = 201,
    ClassDeclaration = 202,
    InterfaceDeclaration = 203,
    TypeAliasDeclaration = 204,
    EnumDeclaration = 205,
    ModuleDeclaration = 206,
    ModuleBlock = 207,
    CaseBlock = 208,
    ImportEqualsDeclaration = 209,
    ImportDeclaration = 210,
    ImportClause = 211,
    NamespaceImport = 212,
    NamedImports = 213,
    ImportSpecifier = 214,
    ExportAssignment = 215,
    ExportDeclaration = 216,
    NamedExports = 217,
    ExportSpecifier = 218,
    MissingDeclaration = 219,
    ExternalModuleReference = 220,
    CaseClause = 221,
    DefaultClause = 222,
    HeritageClause = 223,
    CatchClause = 224,
    PropertyAssignment = 225,
    ShorthandPropertyAssignment = 226,
    EnumMember = 227,
    SourceFile = 228,
    SyntaxList = 229,
    Count = 230,
    FirstAssignment = 53,
    LastAssignment = 64,
    FirstReservedWord = 66,
    LastReservedWord = 101,
    FirstKeyword = 66,
    LastKeyword = 126,
    FirstFutureReservedWord = 102,
    LastFutureReservedWord = 110,
    FirstTypeNode = 142,
    LastTypeNode = 150,
    FirstPunctuation = 14,
    LastPunctuation = 64,
    FirstToken = 0,
    LastToken = 126,
    FirstTriviaToken = 2,
    LastTriviaToken = 6,
    FirstLiteralToken = 7,
    LastLiteralToken = 10,
    FirstTemplateToken = 10,
    LastTemplateToken = 13,
    FirstBinaryOperator = 24,
    LastBinaryOperator = 64,
    FirstNode = 127,
}
export declare const enum NodeFlags {
    Export = 1,
    Ambient = 2,
    Public = 16,
    Private = 32,
    Protected = 64,
    Static = 128,
    Default = 256,
    MultiLine = 512,
    Synthetic = 1024,
    DeclarationFile = 2048,
    Let = 4096,
    Const = 8192,
    OctalLiteral = 16384,
    Namespace = 32768,
    ExportContext = 65536,
    ParentIsClassObject = 1048576,
    IsClassObjectMethodCall = 2097152,
    Modifier = 499,
    AccessibilityModifier = 112,
    BlockScoped = 12288,
}
export interface Node extends TextRange {
    kind: SyntaxKind;
    flags: NodeFlags;
    decorators?: NodeArray<Decorator>;
    modifiers?: ModifiersArray;
    parent?: Node;
}
export interface NodeArray<T> extends Array<T>, TextRange {
    hasTrailingComma?: boolean;
}
export interface ModifiersArray extends NodeArray<Node> {
    flags: number;
}
export interface Identifier extends PrimaryExpression {
    text: string;
    originalKeywordKind?: SyntaxKind;
}
export interface QualifiedName extends Node {
    left: EntityName;
    right: Identifier;
}
export declare type EntityName = Identifier | QualifiedName;
export declare type DeclarationName = Identifier | LiteralExpression | ComputedPropertyName | BindingPattern;
export interface Declaration extends Node {
    _declarationBrand: any;
    name?: DeclarationName;
}
export interface ComputedPropertyName extends Node {
    expression: Expression;
}
export interface Decorator extends Node {
    expression: LeftHandSideExpression;
}
export interface TypeParameterDeclaration extends Declaration {
    name: Identifier;
    constraint?: TypeNode;
    expression?: Expression;
}
export interface SignatureDeclaration extends Declaration {
    typeParameters?: NodeArray<TypeParameterDeclaration>;
    parameters: NodeArray<ParameterDeclaration>;
    type?: TypeNode;
}
export interface VariableDeclaration extends Declaration {
    parent?: VariableDeclarationList;
    name: Identifier | BindingPattern;
    type?: TypeNode;
    initializer?: Expression;
}
export interface VariableDeclarationList extends Node {
    declarations: NodeArray<VariableDeclaration>;
}
export interface ParameterDeclaration extends Declaration {
    dotDotDotToken?: Node;
    name: Identifier | BindingPattern;
    questionToken?: Node;
    type?: TypeNode;
    initializer?: Expression;
}
export interface BindingElement extends Declaration {
    propertyName?: Identifier;
    dotDotDotToken?: Node;
    name: Identifier | BindingPattern;
    initializer?: Expression;
}
export interface PropertyDeclaration extends Declaration, ClassElement {
    name: DeclarationName;
    questionToken?: Node;
    type?: TypeNode;
    initializer?: Expression;
}
export interface ObjectLiteralElement extends Declaration {
    _objectLiteralBrandBrand: any;
}
export interface PropertyAssignment extends ObjectLiteralElement {
    _propertyAssignmentBrand: any;
    name: DeclarationName;
    questionToken?: Node;
    initializer: Expression;
}
export interface ShorthandPropertyAssignment extends ObjectLiteralElement {
    name: Identifier;
    questionToken?: Node;
}
export interface VariableLikeDeclaration extends Declaration {
    propertyName?: Identifier;
    dotDotDotToken?: Node;
    name: DeclarationName;
    questionToken?: Node;
    type?: TypeNode;
    initializer?: Expression;
}
export interface BindingPattern extends Node {
    elements: NodeArray<BindingElement>;
}
/**
 * Several node kinds share function-like features such as a signature,
 * a name, and a body. These nodes should extend FunctionLikeDeclaration.
 * Examples:
 *  FunctionDeclaration
 *  MethodDeclaration
 *  AccessorDeclaration
 */
export interface FunctionLikeDeclaration extends SignatureDeclaration {
    _functionLikeDeclarationBrand: any;
    asteriskToken?: Node;
    questionToken?: Node;
    body?: Block | Expression;
}
export interface FunctionDeclaration extends FunctionLikeDeclaration, Statement {
    name?: Identifier;
    body?: Block;
}
export interface MethodDeclaration extends FunctionLikeDeclaration, ClassElement, ObjectLiteralElement {
    body?: Block;
}
export interface ConstructorDeclaration extends FunctionLikeDeclaration, ClassElement {
    body?: Block;
}
export interface SemicolonClassElement extends ClassElement {
    _semicolonClassElementBrand: any;
}
export interface AccessorDeclaration extends FunctionLikeDeclaration, ClassElement, ObjectLiteralElement {
    _accessorDeclarationBrand: any;
    body: Block;
}
export interface IndexSignatureDeclaration extends SignatureDeclaration, ClassElement {
    _indexSignatureDeclarationBrand: any;
}
export interface TypeNode extends Node {
    _typeNodeBrand: any;
}
export interface FunctionOrConstructorTypeNode extends TypeNode, SignatureDeclaration {
    _functionOrConstructorTypeNodeBrand: any;
}
export interface TypeReferenceNode extends TypeNode {
    typeName: EntityName;
    typeArguments?: NodeArray<TypeNode>;
}
export interface TypeQueryNode extends TypeNode {
    exprName: EntityName;
}
export interface TypeLiteralNode extends TypeNode, Declaration {
    members: NodeArray<Node>;
}
export interface ArrayTypeNode extends TypeNode {
    elementType: TypeNode;
}
export interface TupleTypeNode extends TypeNode {
    elementTypes: NodeArray<TypeNode>;
}
export interface UnionTypeNode extends TypeNode {
    types: NodeArray<TypeNode>;
}
export interface ParenthesizedTypeNode extends TypeNode {
    type: TypeNode;
}
export interface StringLiteral extends LiteralExpression, TypeNode {
    _stringLiteralBrand: any;
}
export interface Expression extends Node {
    _expressionBrand: any;
    contextualType?: Type;
}
export interface UnaryExpression extends Expression {
    _unaryExpressionBrand: any;
}
export interface PrefixUnaryExpression extends UnaryExpression {
    operator: SyntaxKind;
    operand: UnaryExpression;
}
export interface PostfixUnaryExpression extends PostfixExpression {
    operand: LeftHandSideExpression;
    operator: SyntaxKind;
}
export interface PostfixExpression extends UnaryExpression {
    _postfixExpressionBrand: any;
}
export interface LeftHandSideExpression extends PostfixExpression {
    _leftHandSideExpressionBrand: any;
}
export interface MemberExpression extends LeftHandSideExpression {
    _memberExpressionBrand: any;
}
export interface PrimaryExpression extends MemberExpression {
    _primaryExpressionBrand: any;
}
export interface DeleteExpression extends UnaryExpression {
    expression: UnaryExpression;
}
export interface TypeOfExpression extends UnaryExpression {
    expression: UnaryExpression;
}
export interface VoidExpression extends UnaryExpression {
    expression: UnaryExpression;
}
export interface YieldExpression extends Expression {
    asteriskToken?: Node;
    expression: Expression;
}
export interface BinaryExpression extends Expression {
    left: Expression;
    operatorToken: Node;
    right: Expression;
}
export interface ConditionalExpression extends Expression {
    condition: Expression;
    questionToken: Node;
    whenTrue: Expression;
    colonToken: Node;
    whenFalse: Expression;
}
export interface FunctionExpression extends PrimaryExpression, FunctionLikeDeclaration {
    name?: Identifier;
    body: Block | Expression;
}
export interface ArrowFunction extends Expression, FunctionLikeDeclaration {
    equalsGreaterThanToken: Node;
}
export interface LiteralExpression extends PrimaryExpression {
    text: string;
    isUnterminated?: boolean;
    hasExtendedUnicodeEscape?: boolean;
}
export interface TemplateExpression extends PrimaryExpression {
    head: LiteralExpression;
    templateSpans: NodeArray<TemplateSpan>;
}
export interface TemplateSpan extends Node {
    expression: Expression;
    literal: LiteralExpression;
}
export interface ParenthesizedExpression extends PrimaryExpression {
    expression: Expression;
}
export interface ArrayLiteralExpression extends PrimaryExpression {
    elements: NodeArray<Expression>;
}
export interface SpreadElementExpression extends Expression {
    expression: Expression;
}
export interface ObjectLiteralExpression extends PrimaryExpression, Declaration {
    properties: NodeArray<ObjectLiteralElement>;
}
export interface PropertyAccessExpression extends MemberExpression {
    expression: LeftHandSideExpression;
    dotToken: Node;
    name: Identifier;
}
export interface ElementAccessExpression extends MemberExpression {
    expression: LeftHandSideExpression;
    argumentExpression?: Expression;
}
export interface CallExpression extends LeftHandSideExpression {
    expression: LeftHandSideExpression;
    typeArguments?: NodeArray<TypeNode>;
    arguments: NodeArray<Expression>;
}
export interface ExpressionWithTypeArguments extends TypeNode {
    expression: LeftHandSideExpression;
    typeArguments?: NodeArray<TypeNode>;
}
export interface NewExpression extends CallExpression, PrimaryExpression {
}
export interface TaggedTemplateExpression extends MemberExpression {
    tag: LeftHandSideExpression;
    template: LiteralExpression | TemplateExpression;
}
export declare type CallLikeExpression = CallExpression | NewExpression | TaggedTemplateExpression;
export interface TypeAssertion extends UnaryExpression {
    type: TypeNode;
    expression: UnaryExpression;
}
export interface Statement extends Node, ModuleElement {
    _statementBrand: any;
}
export interface Block extends Statement {
    statements: NodeArray<Statement>;
}
export interface VariableStatement extends Statement {
    declarationList: VariableDeclarationList;
}
export interface ExpressionStatement extends Statement {
    expression: Expression;
}
export interface IfStatement extends Statement {
    expression: Expression;
    thenStatement: Statement;
    elseStatement?: Statement;
}
export interface IterationStatement extends Statement {
    statement: Statement;
}
export interface DoStatement extends IterationStatement {
    expression: Expression;
}
export interface WhileStatement extends IterationStatement {
    expression: Expression;
}
export interface ForStatement extends IterationStatement {
    initializer?: VariableDeclarationList | Expression;
    condition?: Expression;
    incrementor?: Expression;
}
export interface ForInStatement extends IterationStatement {
    initializer: VariableDeclarationList | Expression;
    expression: Expression;
}
export interface ForOfStatement extends IterationStatement {
    initializer: VariableDeclarationList | Expression;
    expression: Expression;
}
export interface BreakOrContinueStatement extends Statement {
    label?: Identifier;
}
export interface ReturnStatement extends Statement {
    expression?: Expression;
}
export interface WithStatement extends Statement {
    expression: Expression;
    statement: Statement;
}
export interface SwitchStatement extends Statement {
    expression: Expression;
    caseBlock: CaseBlock;
}
export interface CaseBlock extends Node {
    clauses: NodeArray<CaseOrDefaultClause>;
}
export interface CaseClause extends Node {
    expression?: Expression;
    statements: NodeArray<Statement>;
}
export interface DefaultClause extends Node {
    statements: NodeArray<Statement>;
}
export declare type CaseOrDefaultClause = CaseClause | DefaultClause;
export interface LabeledStatement extends Statement {
    label: Identifier;
    statement: Statement;
}
export interface ThrowStatement extends Statement {
    expression: Expression;
}
export interface TryStatement extends Statement {
    tryBlock: Block;
    catchClause?: CatchClause;
    finallyBlock?: Block;
}
export interface CatchClause extends Node {
    variableDeclaration: VariableDeclaration;
    block: Block;
}
export interface ModuleElement extends Node {
    _moduleElementBrand: any;
}
export interface ClassLikeDeclaration extends Declaration {
    name?: Identifier;
    typeParameters?: NodeArray<TypeParameterDeclaration>;
    heritageClauses?: NodeArray<HeritageClause>;
    members: NodeArray<ClassElement>;
}
export interface ClassDeclaration extends ClassLikeDeclaration, Statement {
}
export interface ClassExpression extends ClassLikeDeclaration, PrimaryExpression {
}
export interface ClassElement extends Declaration {
    _classElementBrand: any;
}
export interface InterfaceDeclaration extends Declaration, ModuleElement {
    name: Identifier;
    typeParameters?: NodeArray<TypeParameterDeclaration>;
    heritageClauses?: NodeArray<HeritageClause>;
    members: NodeArray<Declaration>;
}
export interface HeritageClause extends Node {
    token: SyntaxKind;
    types?: NodeArray<ExpressionWithTypeArguments>;
}
export interface TypeAliasDeclaration extends Declaration, ModuleElement {
    name: Identifier;
    type: TypeNode;
}
export interface EnumMember extends Declaration {
    name: DeclarationName;
    initializer?: Expression;
}
export interface EnumDeclaration extends Declaration, ModuleElement {
    name: Identifier;
    members: NodeArray<EnumMember>;
}
export interface ModuleDeclaration extends Declaration, ModuleElement {
    name: Identifier | LiteralExpression;
    body: ModuleBlock | ModuleDeclaration;
}
export interface ModuleBlock extends Node, ModuleElement {
    statements: NodeArray<ModuleElement>;
}
export interface ImportEqualsDeclaration extends Declaration, ModuleElement {
    name: Identifier;
    moduleReference: EntityName | ExternalModuleReference;
}
export interface ExternalModuleReference extends Node {
    expression?: Expression;
}
export interface ImportDeclaration extends ModuleElement {
    importClause?: ImportClause;
    moduleSpecifier: Expression;
}
export interface ImportClause extends Declaration {
    name?: Identifier;
    namedBindings?: NamespaceImport | NamedImports;
}
export interface NamespaceImport extends Declaration {
    name: Identifier;
}
export interface ExportDeclaration extends Declaration, ModuleElement {
    exportClause?: NamedExports;
    moduleSpecifier?: Expression;
}
export interface NamedImportsOrExports extends Node {
    elements: NodeArray<ImportOrExportSpecifier>;
}
export declare type NamedImports = NamedImportsOrExports;
export declare type NamedExports = NamedImportsOrExports;
export interface ImportOrExportSpecifier extends Declaration {
    propertyName?: Identifier;
    name: Identifier;
}
export declare type ImportSpecifier = ImportOrExportSpecifier;
export declare type ExportSpecifier = ImportOrExportSpecifier;
export interface ExportAssignment extends Declaration, ModuleElement {
    isExportEquals?: boolean;
    expression: Expression;
}
export interface FileReference extends TextRange {
    fileName: string;
}
export interface CommentRange extends TextRange {
    hasTrailingNewLine?: boolean;
    kind: SyntaxKind;
}
export interface SourceFile extends Declaration {
    statements: NodeArray<ModuleElement>;
    endOfFileToken: Node;
    fileName: string;
    text: string;
    amdDependencies: {
        path: string;
        name: string;
    }[];
    amdModuleName: string;
    referencedFiles: FileReference[];
    hasNoDefaultLib: boolean;
    languageVersion: ScriptTarget;
}
export interface ScriptReferenceHost {
    getCompilerOptions(): CompilerOptions;
    getSourceFile(fileName: string): SourceFile;
    getCurrentDirectory(): string;
}
export interface ParseConfigHost {
    readDirectory(rootDir: string, extension: string): string[];
}
export interface WriteFileCallback {
    (fileName: string, data: string, writeByteOrderMark: boolean, onError?: (message: string) => void): void;
}
export interface Program extends ScriptReferenceHost {
    /**
     * Get a list of files in the program
     */
    getSourceFiles(): SourceFile[];
    /**
     * Emits the JavaScript and declaration files.  If targetSourceFile is not specified, then
     * the JavaScript and declaration files will be produced for all the files in this program.
     * If targetSourceFile is specified, then only the JavaScript and declaration for that
     * specific file will be generated.
     *
     * If writeFile is not specified then the writeFile callback from the compiler host will be
     * used for writing the JavaScript and declaration files.  Otherwise, the writeFile parameter
     * will be invoked when writing the JavaScript and declaration files.
     */
    emit(targetSourceFile?: SourceFile, writeFile?: WriteFileCallback): EmitResult;
    getSyntacticDiagnostics(sourceFile?: SourceFile): Diagnostic[];
    getGlobalDiagnostics(): Diagnostic[];
    getSemanticDiagnostics(sourceFile?: SourceFile): Diagnostic[];
    getDeclarationDiagnostics(sourceFile?: SourceFile): Diagnostic[];
    /**
     * Gets a type checker that can be used to semantically analyze source fils in the program.
     */
    getTypeChecker(): TypeChecker;
}
export interface SourceMapSpan {
    /** Line number in the .js file. */
    emittedLine: number;
    /** Column number in the .js file. */
    emittedColumn: number;
    /** Line number in the .ts file. */
    sourceLine: number;
    /** Column number in the .ts file. */
    sourceColumn: number;
    /** Optional name (index into names array) associated with this span. */
    nameIndex?: number;
    /** .ts file (index into sources array) associated with this span */
    sourceIndex: number;
}
export interface SourceMapData {
    sourceMapFilePath: string;
    jsSourceMappingURL: string;
    sourceMapFile: string;
    sourceMapSourceRoot: string;
    sourceMapSources: string[];
    sourceMapSourcesContent?: string[];
    inputSourceFileNames: string[];
    sourceMapNames?: string[];
    sourceMapMappings: string;
    sourceMapDecodedMappings: SourceMapSpan[];
}
/** Return code used by getEmitOutput function to indicate status of the function */
export declare enum ExitStatus {
    Success = 0,
    DiagnosticsPresent_OutputsSkipped = 1,
    DiagnosticsPresent_OutputsGenerated = 2,
}
export interface EmitResult {
    emitSkipped: boolean;
    diagnostics: Diagnostic[];
}
export interface TypeCheckerHost {
    getCompilerOptions(): CompilerOptions;
    getSourceFiles(): SourceFile[];
    getSourceFile(fileName: string): SourceFile;
}
export interface TypeChecker {
    getTypeOfSymbolAtLocation(symbol: Symbol, node: Node): Type;
    getDeclaredTypeOfSymbol(symbol: Symbol): Type;
    getPropertiesOfType(type: Type): Symbol[];
    getPropertyOfType(type: Type, propertyName: string): Symbol;
    getSignaturesOfType(type: Type, kind: SignatureKind): Signature[];
    getIndexTypeOfType(type: Type, kind: IndexKind): Type;
    getReturnTypeOfSignature(signature: Signature): Type;
    getSymbolsInScope(location: Node, meaning: SymbolFlags): Symbol[];
    getSymbolAtLocation(node: Node): Symbol;
    getShorthandAssignmentValueSymbol(location: Node): Symbol;
    getTypeAtLocation(node: Node): Type;
    typeToString(type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): string;
    symbolToString(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags): string;
    getSymbolDisplayBuilder(): SymbolDisplayBuilder;
    getFullyQualifiedName(symbol: Symbol): string;
    getAugmentedPropertiesOfType(type: Type): Symbol[];
    getRootSymbols(symbol: Symbol): Symbol[];
    getContextualType(node: Expression): Type;
    getResolvedSignature(node: CallLikeExpression, candidatesOutArray?: Signature[]): Signature;
    getSignatureFromDeclaration(declaration: SignatureDeclaration): Signature;
    isImplementationOfOverload(node: FunctionLikeDeclaration): boolean;
    isUndefinedSymbol(symbol: Symbol): boolean;
    isArgumentsSymbol(symbol: Symbol): boolean;
    getConstantValue(node: EnumMember | PropertyAccessExpression | ElementAccessExpression): number;
    isValidPropertyAccess(node: PropertyAccessExpression | QualifiedName, propertyName: string): boolean;
    getAliasedSymbol(symbol: Symbol): Symbol;
    getExportsOfModule(moduleSymbol: Symbol): Symbol[];
}
export interface SymbolDisplayBuilder {
    buildTypeDisplay(type: Type, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
    buildSymbolDisplay(symbol: Symbol, writer: SymbolWriter, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags?: SymbolFormatFlags): void;
    buildSignatureDisplay(signatures: Signature, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
    buildParameterDisplay(parameter: Symbol, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
    buildTypeParameterDisplay(tp: TypeParameter, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
    buildTypeParameterDisplayFromSymbol(symbol: Symbol, writer: SymbolWriter, enclosingDeclaraiton?: Node, flags?: TypeFormatFlags): void;
    buildDisplayForParametersAndDelimiters(parameters: Symbol[], writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
    buildDisplayForTypeParametersAndDelimiters(typeParameters: TypeParameter[], writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
    buildReturnTypeDisplay(signature: Signature, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
}
export interface SymbolWriter {
    writeKeyword(text: string): void;
    writeOperator(text: string): void;
    writePunctuation(text: string): void;
    writeSpace(text: string): void;
    writeStringLiteral(text: string): void;
    writeParameter(text: string): void;
    writeSymbol(text: string, symbol: Symbol): void;
    writeLine(): void;
    increaseIndent(): void;
    decreaseIndent(): void;
    clear(): void;
    trackSymbol(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags): void;
}
export declare const enum TypeFormatFlags {
    None = 0,
    WriteArrayAsGenericType = 1,
    UseTypeOfFunction = 2,
    NoTruncation = 4,
    WriteArrowStyleSignature = 8,
    WriteOwnNameForAnyLike = 16,
    WriteTypeArgumentsOfSignature = 32,
    InElementType = 64,
    UseFullyQualifiedType = 128,
}
export declare const enum SymbolFormatFlags {
    None = 0,
    WriteTypeParametersOrArguments = 1,
    UseOnlyExternalAliasing = 2,
}
export declare const enum SymbolFlags {
    FunctionScopedVariable = 1,
    BlockScopedVariable = 2,
    Property = 4,
    EnumMember = 8,
    Function = 16,
    Class = 32,
    Interface = 64,
    ConstEnum = 128,
    RegularEnum = 256,
    ValueModule = 512,
    NamespaceModule = 1024,
    TypeLiteral = 2048,
    ObjectLiteral = 4096,
    Method = 8192,
    Constructor = 16384,
    GetAccessor = 32768,
    SetAccessor = 65536,
    Signature = 131072,
    TypeParameter = 262144,
    TypeAlias = 524288,
    ExportValue = 1048576,
    ExportType = 2097152,
    ExportNamespace = 4194304,
    Alias = 8388608,
    Instantiated = 16777216,
    Merged = 33554432,
    Transient = 67108864,
    Prototype = 134217728,
    UnionProperty = 268435456,
    Optional = 536870912,
    ExportStar = 1073741824,
    Enum = 384,
    Variable = 3,
    Value = 107455,
    Type = 793056,
    Namespace = 1536,
    Module = 1536,
    Accessor = 98304,
    FunctionScopedVariableExcludes = 107454,
    BlockScopedVariableExcludes = 107455,
    ParameterExcludes = 107455,
    PropertyExcludes = 107455,
    EnumMemberExcludes = 107455,
    FunctionExcludes = 106927,
    ClassExcludes = 899583,
    InterfaceExcludes = 792992,
    RegularEnumExcludes = 899327,
    ConstEnumExcludes = 899967,
    ValueModuleExcludes = 106639,
    NamespaceModuleExcludes = 0,
    MethodExcludes = 99263,
    GetAccessorExcludes = 41919,
    SetAccessorExcludes = 74687,
    TypeParameterExcludes = 530912,
    TypeAliasExcludes = 793056,
    AliasExcludes = 8388608,
    ModuleMember = 8914931,
    ExportHasLocal = 944,
    HasLocals = 255504,
    HasExports = 1952,
    HasMembers = 6240,
    IsContainer = 262128,
    PropertyOrAccessor = 98308,
    Export = 7340032,
}
export interface Symbol {
    flags: SymbolFlags;
    name: string;
    declarations?: Declaration[];
    members?: SymbolTable;
    exports?: SymbolTable;
    valueDeclaration?: Declaration;
}
export interface SymbolTable {
    [index: string]: Symbol;
}
export declare const enum TypeFlags {
    Any = 1,
    String = 2,
    Number = 4,
    Boolean = 8,
    Void = 16,
    Undefined = 32,
    Null = 64,
    Enum = 128,
    StringLiteral = 256,
    TypeParameter = 512,
    Class = 1024,
    Interface = 2048,
    Reference = 4096,
    Tuple = 8192,
    Union = 16384,
    Anonymous = 32768,
    ObjectLiteral = 131072,
    ESSymbol = 1048576,
    StringLike = 258,
    NumberLike = 132,
    ObjectType = 48128,
}
export interface Type {
    flags: TypeFlags;
    symbol?: Symbol;
}
export interface StringLiteralType extends Type {
    text: string;
}
export interface ObjectType extends Type {
}
export interface InterfaceType extends ObjectType {
    typeParameters: TypeParameter[];
}
export interface InterfaceTypeWithBaseTypes extends InterfaceType {
    baseTypes: ObjectType[];
}
export interface InterfaceTypeWithDeclaredMembers extends InterfaceType {
    declaredProperties: Symbol[];
    declaredCallSignatures: Signature[];
    declaredConstructSignatures: Signature[];
    declaredStringIndexType: Type;
    declaredNumberIndexType: Type;
}
export interface TypeReference extends ObjectType {
    target: GenericType;
    typeArguments: Type[];
}
export interface GenericType extends InterfaceType, TypeReference {
}
export interface TupleType extends ObjectType {
    elementTypes: Type[];
    baseArrayType: TypeReference;
}
export interface UnionType extends Type {
    types: Type[];
}
export interface TypeParameter extends Type {
    constraint: Type;
}
export declare const enum SignatureKind {
    Call = 0,
    Construct = 1,
}
export interface Signature {
    declaration: SignatureDeclaration;
    typeParameters: TypeParameter[];
    parameters: Symbol[];
}
export declare const enum IndexKind {
    String = 0,
    Number = 1,
}
export interface DiagnosticMessage {
    key: string;
    category: DiagnosticCategory;
    code: number;
}
/**
 * A linked list of formatted diagnostic messages to be used as part of a multiline message.
 * It is built from the bottom up, leaving the head to be the "main" diagnostic.
 * While it seems that DiagnosticMessageChain is structurally similar to DiagnosticMessage,
 * the difference is that messages are all preformatted in DMC.
 */
export interface DiagnosticMessageChain {
    messageText: string;
    category: DiagnosticCategory;
    code: number;
    next?: DiagnosticMessageChain;
}
export interface Diagnostic {
    file: SourceFile;
    start: number;
    length: number;
    messageText: string | DiagnosticMessageChain;
    category: DiagnosticCategory;
    code: number;
}
export declare enum DiagnosticCategory {
    Warning = 0,
    Error = 1,
    Message = 2,
}
export interface CompilerOptions {
    allowNonTsExtensions?: boolean;
    charset?: string;
    declaration?: boolean;
    diagnostics?: boolean;
    emitBOM?: boolean;
    help?: boolean;
    inlineSourceMap?: boolean;
    inlineSources?: boolean;
    listFiles?: boolean;
    locale?: string;
    mapRoot?: string;
    module?: ModuleKind;
    newLine?: NewLineKind;
    noEmit?: boolean;
    noEmitHelpers?: boolean;
    noEmitOnError?: boolean;
    noErrorTruncation?: boolean;
    noImplicitAny?: boolean;
    noLib?: boolean;
    noResolve?: boolean;
    out?: string;
    outDir?: string;
    preserveConstEnums?: boolean;
    project?: string;
    removeComments?: boolean;
    rootDir?: string;
    sourceMap?: boolean;
    sourceRoot?: string;
    suppressImplicitAnyIndexErrors?: boolean;
    target?: ScriptTarget;
    version?: boolean;
    watch?: boolean;
    separateCompilation?: boolean;
    emitDecoratorMetadata?: boolean;
    [option: string]: string | number | boolean;
}
export declare const enum ModuleKind {
    None = 0,
    CommonJS = 1,
    AMD = 2,
    UMD = 3,
    System = 4,
}
export declare const enum NewLineKind {
    CarriageReturnLineFeed = 0,
    LineFeed = 1,
}
export interface LineAndCharacter {
    line: number;
    character: number;
}
export declare const enum ScriptTarget {
    ES3 = 0,
    ES5 = 1,
    ES6 = 2,
    Latest = 2,
}
export interface ParsedCommandLine {
    options: CompilerOptions;
    fileNames: string[];
    errors: Diagnostic[];
}
export interface CancellationToken {
    isCancellationRequested(): boolean;
}
export interface CompilerHost {
    getSourceFile(fileName: string, languageVersion: ScriptTarget, onError?: (message: string) => void): SourceFile;
    getDefaultLibFileName(options: CompilerOptions): string;
    getCancellationToken?(): CancellationToken;
    writeFile: WriteFileCallback;
    getCurrentDirectory(): string;
    getCanonicalFileName(fileName: string): string;
    useCaseSensitiveFileNames(): boolean;
    getNewLine(): string;
}
export interface TextSpan {
    start: number;
    length: number;
}
export interface TextChangeRange {
    span: TextSpan;
    newLength: number;
}
