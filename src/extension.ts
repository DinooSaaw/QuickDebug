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
        const fileName = document.fileName.split(/[/\\]/).pop(); // Extract file name
        const indent = " ".repeat(document.lineAt(selection.end.line).firstNonWhitespaceCharacterIndex);

        // Fetch user-configured format or use a default one
        const config = vscode.workspace.getConfiguration("quickdebug");
        const format = config.get<string>("format", "[{file}:{line}:{column}] {variable}: {value}");

        // Replace placeholders in format string
        let debugMessage = format
            .replace("{file}", fileName!)
            .replace("{line}", line.toString())
            .replace("{column}", column.toString())
            .replace("{variable}", text)
            .replace("{value}", text);

        let debugStatement = "";

        switch (language) {
            case "javascript":
            case "typescript":
                debugStatement = `${indent}console.log(\`${debugMessage}\`, ${text});`;
                break;
            case "python":
                debugStatement = `${indent}print(f"${debugMessage}", ${text})`;
                break;
            case "c":
            case "cpp":
                debugStatement = `${indent}printf("${debugMessage}\\n", ${text});`;
                break;
            case "java":
                debugStatement = `${indent}System.out.println("${debugMessage} " + ${text});`;
                break;
            case "csharp":
                debugStatement = `${indent}Console.WriteLine("${debugMessage} " + ${text});`;
                break;
            case "go":
                debugStatement = `${indent}fmt.Println("${debugMessage}", ${text})`;
                break;
            case "ruby":
                debugStatement = `${indent}puts "${debugMessage} #{${text}}"`;
                break;
            case "php":
                debugStatement = `${indent}echo "${debugMessage} " . ${text};`;
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
