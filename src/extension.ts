import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.insertDebugMessage', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const document = editor.document;
        const language = document.languageId;
        const selection = editor.selection;
        const text = document.getText(selection).trim();

        if (!text) {
            vscode.window.showErrorMessage("No text selected!");
            return;
        }

        const line = selection.start.line + 1;
        const column = selection.start.character + 1;
        const indent = " ".repeat(document.lineAt(selection.end.line).firstNonWhitespaceCharacterIndex);

        let debugStatement = "";

        switch (language) {
            case "javascript":
            case "typescript":
                debugStatement = `${indent}console.log(\`${text} (${line}:${column})\`, ${text});`;
                break;
            case "python":
                debugStatement = `${indent}print(f"${text} (line:{${line}}, column:{${column}})", ${text})`;
                break;
            case "c":
            case "cpp":
                debugStatement = `${indent}printf("${text} (line:%d, column:%d)\\n", ${line}, ${column});`;
                break;
            case "java":
                debugStatement = `${indent}System.out.println("${text} (line: " + ${line} + ", column: " + ${column} + ") " + ${text});`;
                break;
            case "csharp":
                debugStatement = `${indent}Console.WriteLine("${text} (line: {${line}}, column: {${column}}) " + ${text});`;
                break;
            case "go":
                debugStatement = `${indent}fmt.Println("${text} (line:", ${line}, "column:", ${column}, ")", ${text})`;
                break;
            case "ruby":
                debugStatement = `${indent}puts "${text} (line: #{${line}}, column: #{${column}}) #{${text}}"`;
                break;
            case "php":
                debugStatement = `${indent}echo "${text} (line: " . ${line} . ", column: " . ${column} . ") " . ${text};`;
                break;
            default:
                vscode.window.showErrorMessage(`Unsupported language: ${language}`);
                return;
        }

        editor.edit(editBuilder => {
            editBuilder.insert(new vscode.Position(line, 0), debugStatement + "\n");
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
