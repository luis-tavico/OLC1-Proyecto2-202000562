%{
    var line = 1;
    var text = "";
    var errors = [];
    var tokens = [];
%}

%lex

%options case-insensitive
%x string 

%%

\n                                      { line++; }
[ \r\t]+                                {  }
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]     {  }
"--".*                                  {  }

/* Control Statements */
"begin"                                 { tokens.push({token:"TK_BEGIN", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_BEGIN'; }
"end"                                   { tokens.push({token:"TK_END", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_END'; }
"as"                                    { tokens.push({token:"TK_AS", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_AS'; }
/* Table */
"create"                                { tokens.push({token:"TK_CREATE", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_CREATE'; }
"alter"                                 { tokens.push({token:"TK_ALTER", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_ALTER'; }
"drop"                                  { tokens.push({token:"TK_DROP", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_DROP'; }
"table"                                 { tokens.push({token:"TK_TABLE", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_TABLE'; }
/* Actions Table */
"add"                                   { tokens.push({token:"TK_ADD", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_ADD'; }
"rename"                                { tokens.push({token:"TK_RENAME", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_RENAME'; }
"column"                                { tokens.push({token:"TK_COLUMN", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_COLUMN'; }
/* Native Functions */
"print"                                 { tokens.push({token:"TK_PRINT", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_PRINT'; }
"lower"                                 { tokens.push({token:"TK_LOWER", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_LOWER'; }
"upper"                                 { tokens.push({token:"TK_UPPER", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_UPPER'; }
"round"                                 { tokens.push({token:"TK_ROUND", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_ROUND'; }
"len"                                   { tokens.push({token:"TK_LEN", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_LEN'; }
"typeof"                                { tokens.push({token:"TK_TYPEOF", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_TYPEOF'; }
/* Insert */
"insert"                                { tokens.push({token:"TK_INSERT", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_INSERT'; }
/* Select */
"select"                                { tokens.push({token:"TK_SELECT", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_SELECT'; }
/* Update */
"update"                                { tokens.push({token:"TK_UPDATE", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_UPDATE'; }
/* truncate */
"truncate"                              { tokens.push({token:"TK_TRUNCATE", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_TRUNCATE'; }
/* delete */
"delete"                                { tokens.push({token:"TK_DELETE", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_DELETE'; }
/* Conditions */
"from"                                  { tokens.push({token:"TK_FROM", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_FROM'; }
"to"                                    { tokens.push({token:"TK_TO", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_TO'; }
"where"                                 { tokens.push({token:"TK_WHERE", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_WHERE'; }
/* assignation */
"declare"                               { tokens.push({token:"TK_DECLARE", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_DECLARE'; }
"into"                                  { tokens.push({token:"TK_INTO", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_INTO'; }
"values"                                { tokens.push({token:"TK_VALUES", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_VALUES'; }
"set"                                   { tokens.push({token:"TK_SET", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_SET'; }
/* Type of Data */
"date"                                  { tokens.push({token:"TK_DATE", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_DATE'; }
"int"                                   { tokens.push({token:"TK_INT", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_INT'; }
"double"                                { tokens.push({token:"TK_DOUBLE", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_DOUBLE'; }
"varchar"                               { tokens.push({token:"TK_VARCHAR", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_VARCHAR'; }
"boolean"                               { tokens.push({token:"TK_BOOLEAN", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_BOOLEAN'; }
"null"                                  { tokens.push({token:"TK_NULL", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_NULL'; }
"default"                               { tokens.push({token:"TK_DEFAULT", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_DEFAULT'; }
/* boolean values */
"true"                                  { tokens.push({token:"TK_TRUE", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_TRUE'; }
"false"                                 { tokens.push({token:"TK_FALSE", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_FALSE'; }
/* Logical Operators */
"and"                                   { tokens.push({token:"TK_AND", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_AND'; }
"or"                                    { tokens.push({token:"TK_OR", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_OR'; }
"not"                                   { tokens.push({token:"TK_NOT", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_NOT'; }
/* Relational Operators */
"<="                                    { tokens.push({token:"TK_LESS_EQUAL", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_LESS_EQUAL'; }
">="                                    { tokens.push({token:"TK_GREATER_EQUAL", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_GREATER_EQUAL'; }
"!="                                    { tokens.push({token:"TK_NOT_EQUAL", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_NOT_EQUAL'; }
"="                                     { tokens.push({token:"TK_EQUAL", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_EQUAL'; }
"<"                                     { tokens.push({token:"TK_LESS_THAN", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_LESS_THAN'; }
">"                                     { tokens.push({token:"TK_GREATER_THAN", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_GREATER_THAN'; }
/* Grouping Signs*/
"("                                     { tokens.push({token:"TK_LEFT_PARENTHESIS", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_LEFT_PARENTHESIS'; }
")"                                     { tokens.push({token:"TK_RIGHT_PARENTHESIS", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_RIGHT_PARENTHESIS'; }
/* Others */
";"                                     { tokens.push({token:"TK_SEMI_COLON", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_SEMI_COLON'; }
"@"                                     { tokens.push({token:"TK_AT", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_AT'; }
","                                     { tokens.push({token:"TK_COMMA", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_COMMA'; }
/* Data */
(\d{4})"-"(\d{1,2})"-"(\d{1,2})         { tokens.push({token:"TK_TIME", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_TIME'; }
[0-9]+"."[0-9]+\b                       { tokens.push({token:"TK_DECIMAL", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_DECIMAL'; }
[0-9]+\b                                { tokens.push({token:"TK_INTEGER", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_INTEGER'; }
([a-zA-Z])([a-zA-Z0-9_])*               { tokens.push({token:"TK_ID", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_ID'; }
["]			                            { text = ""; this.begin("string"); }
<string>[^"\\]+                         { text += yytext; }
<string>"\\\""                          { text += "\"";   }
<string>"\\n"                           { text += "\n";   }
<string>\s                              { text += " ";    }
<string>"\\t"                           { text += "\t";   }
<string>"\\\\"                          { text += "\\";   }
<string>"\\\'"                          { text += "\'";   }
<string>"\\r"                           { text += "\r";   }
<string>["]                             { yytext = text; this.popState(); tokens.push({token:"TK_TEXT", value: "\""+yytext+"\"", line: line, column: yylloc.first_column+1}); return 'TK_TEXT'; }
/* Arithmetic Operators */
"+"                                     { tokens.push({token:"TK_PLUS", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_PLUS'; }
"-"                                     { tokens.push({token:"TK_MINUS", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_MINUS'; }
"*"                                     { tokens.push({token:"TK_TIMES", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_TIMES'; }
"/"                                     { tokens.push({token:"TK_DIVIDE", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_DIVIDE'; }
"%"                                     { tokens.push({token:"TK_MODULUS", value: yytext, line: line, column: yylloc.first_column+1}); return 'TK_MODULUS'; }

<<EOF>>                                 return 'EOF';

.                                       { errors.push({type:"Lexico", error: yytext, line: line, column: yylloc.first_column+1, message: `Error lexico, token '${yytext}' no reconocido.`}); };
/lex

%{   
    // const {errores} = require('./Errores');
    const {Type} = require('../Symbol/Type');
    //Expressions
    const {Literal} = require('../Expression/Literal');
    const {Access} = require('../Expression/Access');
    const {Arithmetic, ArithmeticOption} = require('../Expression/Arithmetic');
    const {Logical, LogicalOption} = require('../Expression/Logical');
    const {Relational, RelationalOption} = require('../Expression/Relational');
    const {Field} = require('../Expression/Field');
    //Instructions
    const {Block} = require('../Instruction/Block');
    const {Statement} = require('../Instruction/Statement');
    const {Assignment} = require('../Instruction/Assignment');
    const {Print} = require('../Instruction/Print');
    //DDL
    const {CreateTable} = require('../Instruction/CreateTable');
    const {Add} = require('../Instruction/Add')
    const {DropColumn} = require('../Instruction/DropColumn')
    const {Rename} = require('../Instruction/Rename')
    const {RenameColumn} = require('../Instruction/RenameColumn')
    const {DropTable} = require('../Instruction/DropTable');
    //DML
    const {Insert} = require('../Instruction/Insert');
    const {Select} = require('../Instruction/Select');
    const {Update} = require('../Instruction/Update');
    const {Truncate} = require('../Instruction/Truncate');
    const {Delete} = require('../Instruction/Delete');
    //Symbols
    var symbols = [];

%}

%left 'TK_OR'
%left 'TK_AND' 
%right 'TK_NOT' 
%left 'TK_EQUAL' 'TK_NOT_EQUAL' 'TK_LESS_THAN' 'TK_LESS_EQUAL' 'TK_GREATER_THAN'  'TK_GREATER_EQUAL'
%left 'TK_PLUS' 'TK_MINUS'
%left 'TK_TIMES' 'TK_DIVIDE' 'TK_MODULUS'
%left 'TK_LEFT_PARENTHESIS' 'TK_RIGHT_PARENTHESIS'

%start ini

%%

ini: instructions EOF { return {'ast':$1, 'tokens': tokens, 'errors': errors, 'symbols': symbols}; };

instructions: instructions instruction { $1.push($2); $$ = $1; }
            | instruction              { $$ = [$1]; };

instruction: block      { $$ = $1; }
           | statement  { $$ = $1; }
           | assignment { $$ = $1; }
           | print      { $$ = $1; }
           | ddl        { $$ = $1; }
           | dml        { $$ = $1; }
           | error      { errors.push({type: "Sintactico", error: yytext, line: this._$.first_line, column: this._$.first_column+1, message: `Error sintactico, token '${yytext}' no esperado.`}); };


block: TK_BEGIN instructions TK_END TK_SEMI_COLON { $$ = new Block(@1.first_line, @1.first_column, $2); };

statement: TK_DECLARE variables TK_SEMI_COLON { $$ = new Statement(@1.first_line, @1.first_column, $2, symbols); };

variables: variables TK_COMMA variable { $1.push($3); $$ = $1; }
         | variable                    { $$ = [$1]; };

variable: TK_AT TK_ID type                       { $$ = {'line': @1.first_line, 'column': @1.first_column, 'name': $2, 'type': $3, 'value': undefined }; }
        | TK_AT TK_ID type TK_DEFAULT expression { $$ = {'line': @1.first_line, 'column': @1.first_column, 'name': $2, 'type': $3, 'value': $5 }; };

assignment: TK_SET TK_AT TK_ID TK_EQUAL expression TK_SEMI_COLON { $$ = new Assignment(@1.first_line, @1.first_column, $3, $5, symbols); }; 

print: TK_PRINT expression TK_SEMI_COLON { $$ = new Print(@1.first_line, @1.first_column, $2); };

ddl: createTable { $$ = $1; }
   | alterTable  { $$ = $1; }
   | dropTable   { $$ = $1; };

createTable: TK_CREATE TK_TABLE TK_ID TK_LEFT_PARENTHESIS attributes TK_RIGHT_PARENTHESIS TK_SEMI_COLON { $$ = new CreateTable(@1.first_line, @1.first_column, $3, $5);  };

alterTable: TK_ALTER TK_TABLE TK_ID TK_ADD attributes TK_SEMI_COLON                          { $$ = new Add(@1.first_line, @1.first_column, $3, $5, $6); }
          | TK_ALTER TK_TABLE TK_ID TK_DROP TK_COLUMN expression TK_SEMI_COLON               { $$ = new DropColumn(@1.first_line, @1.first_column, $3, $6); }
          | TK_ALTER TK_TABLE TK_ID TK_RENAME TK_TO expression TK_SEMI_COLON                 { $$ = new Rename(@1.first_line, @1.first_column, $3, $6); }
          | TK_ALTER TK_TABLE TK_ID TK_RENAME TK_COLUMN TK_ID TK_TO expression TK_SEMI_COLON { $$ = new RenameColumn(@1.first_line, @1.first_column, $3, $6, $8); };

attributes: attributes TK_COMMA attribute { $1.push($3); $$ = $1; }
          | attribute                     { $$ = [$1]; };

attribute: TK_ID type { $$ = new Field(@1.first_line, @1.first_column, $1, $2); };

dropTable: TK_DROP TK_TABLE TK_ID TK_SEMI_COLON { $$ = new DropTable(@1.first_line, @1.first_column, $3); };

dml: insert   { $$ = $1; }
   | select   { $$ = $1; }
   | update   { $$ = $1; }
   | truncate { $$ = $1; }
   | delete   { $$ = $1; };

insert: TK_INSERT TK_INTO TK_ID TK_LEFT_PARENTHESIS id_list TK_RIGHT_PARENTHESIS TK_VALUES TK_LEFT_PARENTHESIS values TK_RIGHT_PARENTHESIS TK_SEMI_COLON { $$ = new Insert(@1.first_line, @1.first_column, $3, $5, $9); };

select: TK_SELECT id_list TK_FROM TK_ID TK_SEMI_COLON                     { $$ = new Select(@1.first_line, @1.first_column, $2, $4, null); }
      | TK_SELECT TK_TIMES TK_FROM TK_ID TK_SEMI_COLON                    { $$ = new Select(@1.first_line, @1.first_column, null, $4, null); }
      | TK_SELECT id_list TK_FROM TK_ID TK_WHERE expression TK_SEMI_COLON { $$ = new Select(@1.first_line, @1.first_column, $2, $4, $6); };

id_list: id_list TK_COMMA TK_ID { $1.push($3); $$ = $1; }
       | TK_ID                  { $$ = [$1]; };

update: TK_UPDATE TK_ID TK_SET columns TK_WHERE expression TK_SEMI_COLON { $$ = new Update(@1.first_line, @1.first_column, $2, $4, $6); };

columns: columns TK_COMMA column { $1.push($3); $$ = $1; }
       | column                  { $$ = [$1]; };

column: TK_ID TK_EQUAL expression { $$ = new Assignment(@1.first_line, @1.first_column, $1, $3); }; 

truncate: TK_TRUNCATE TK_TABLE TK_ID TK_SEMI_COLON { $$ = new Truncate(@1.first_line, @1.first_column, $3); };

delete: TK_DELETE TK_FROM TK_ID TK_WHERE expression TK_SEMI_COLON { $$ = new Delete(@1.first_line, @1.first_column, $3, $5); };

expression: arithmetic                                          { $$ = $1; }
          | relational                                          { $$ = $1; }
          | logical                                             { $$ = $1; }
          | value                                               { $$ = $1; }
          | TK_LEFT_PARENTHESIS expression TK_RIGHT_PARENTHESIS { $$ = $2; };

arithmetic: expression TK_PLUS expression    { $$ = new Arithmetic(@1.first_line, @1.first_column, $1, ArithmeticOption.PLUS, $3); }
          | expression TK_MINUS expression   { $$ = new Arithmetic(@1.first_line, @1.first_column, $1, ArithmeticOption.MINUS, $3); }
          | expression TK_TIMES expression   { $$ = new Arithmetic(@1.first_line, @1.first_column, $1, ArithmeticOption.TIMES, $3); }
          | expression TK_DIVIDE expression  { $$ = new Arithmetic(@1.first_line, @1.first_column, $1, ArithmeticOption.DIVIDE, $3); }
          | expression TK_MODULUS expression { $$ = new Arithmetic(@1.first_line, @1.first_column, $1, ArithmeticOption.MODULUS, $3); }
          | TK_MINUS expression              { $$ = new Literal(@1.first_line, @1.first_column, $2, Type.NEGATIVE) };

logical: expression TK_AND expression { $$ = new Logical(@1.first_line, @1.first_column, $1, LogicalOption.AND, $3); }
       | expression TK_OR expression  { $$ = new Logical(@1.first_line, @1.first_column, $1, LogicalOption.OR, $3); }
       | TK_NOT expression            { $$ = new Logical(@1.first_line, @1.first_column, $1, LogicalOption.NOT, $1); };

relational: expression TK_GREATER_THAN expression  { $$ = new Relational(@1.first_line, @1.first_column, $1, RelationalOption.GREATER_THAN, $3); }
          | expression TK_LESS_THAN expression     { $$ = new Relational(@1.first_line, @1.first_column, $1, RelationalOption.LESS_THAN, $3); }
          | expression TK_GREATER_EQUAL expression { $$ = new Relational(@1.first_line, @1.first_column, $1, RelationalOption.GREATER_EQUAL, $3); }
          | expression TK_LESS_EQUAL expression    { $$ = new Relational(@1.first_line, @1.first_column, $1, RelationalOption.LESS_EQUAL, $3); }
          | expression TK_EQUAL expression         { $$ = new Relational(@1.first_line, @1.first_column, $1, RelationalOption.EQUAL, $3); }
          | expression TK_NOT_EQUAL expression     { $$ = new Relational(@1.first_line, @1.first_column, $1, RelationalOption.NOT_EQUAL, $3); };

type: TK_INT     { $$ = 0; }
    | TK_DOUBLE  { $$ = 1; }
    | TK_DATE    { $$ = 2; }
    | TK_VARCHAR { $$ = 3; }
    | TK_BOOLEAN { $$ = 4; };

values: values TK_COMMA value { $1.push($3); $$ = $1; }
      | value                 { $$ = [$1]; };

value: TK_INTEGER { $$ = new Literal(@1.first_line, @1.first_column, $1, Type.INT); }
     | TK_DECIMAL { $$ = new Literal(@1.first_line, @1.first_column, $1, Type.DOUBLE); }
     | TK_TIME    { $$ = new Literal(@1.first_line, @1.first_column, $1, Type.DATE); }
     | TK_TEXT    { $$ = new Literal(@1.first_line, @1.first_column, $1, Type.VARCHAR); }
     | TK_TRUE    { $$ = new Literal(@1.first_line, @1.first_column, $1, Type.BOOLEAN); }
     | TK_FALSE   { $$ = new Literal(@1.first_line, @1.first_column, $1, Type.BOOLEAN); }
     | TK_ID      { $$ = new Access(@1.first_line, @1.first_column, $1, null); }
     | TK_NULL    { $$ = new Literal(@1.first_line, @1.first_column, $1, Type.NULL); };