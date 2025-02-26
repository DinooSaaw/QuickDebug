import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.insertDebugMessage', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const document = editor.document;
        const language = document.languageId; // Get file type
        const selection = editor.selection;
        const text = document.getText(selection).trim(); // Trim to avoid unnecessary spaces

        if (!text) {
            vscode.window.showErrorMessage("No text selected!");
            return;
        }

        // Get the line and column where the selection starts
        const line = selection.start.line + 1; // Convert 0-based index to 1-based
        const column = selection.start.character + 1; // Convert 0-based to 1-based
        const indent = " ".repeat(document.lineAt(selection.end.line).firstNonWhitespaceCharacterIndex);

        let debugStatement = "";

        if (language === "javascript" || language === "typescript") {
            debugStatement = `${indent}console.log(\`${text} (${line}:${column})\`, ${text});`;
        } else if (language === "python") {
            debugStatement = `${indent}print(f"${text} (line:{${line}}, column:{${column}})", ${text})`;
        } else {
            vscode.window.showErrorMessage(`Unsupported language: ${language}`);
            return;
        }

        // Insert after the selected line
        editor.edit(editBuilder => {
            editBuilder.insert(new vscode.Position(line, 0), debugStatement + "\n");
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}