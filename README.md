# QuickDebug

## Overview

QuickDebug is a Visual Studio Code extension that allows you to quickly insert debug messages for multiple programming languages. With a simple command, you can log variable values along with their line and column number for easier debugging.

## Features

- **Quickly insert debug messages** for JavaScript, TypeScript, Python, C, C++, Java, C#, Go, Ruby, and PHP.
- **Logs the selected variable with its position** (line:column format).
- **Easy to use**: Select a variable, press the shortcut, and insert a debug statement.

### Example Usage

#### JavaScript / TypeScript

```js
let result = a + b;
console.log(`result (3:5)`, result);
```

#### Python

```python
result = a + b
print(f"result (3:5)", result)
```

#### C / C++

```c
printf("result (3:5)\n", result);
```

#### Java

```java
System.out.println("result (3:5) " + result);
```

#### C#

```csharp
Console.WriteLine("result (3:5) " + result);
```

#### Go

```go
fmt.Println("result (3:5)", result)
```

#### Ruby

```ruby
puts "result (3:5) #{result}"
```

#### PHP

```php
echo "result (3:5) " . $result;
```

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions Marketplace (`Ctrl+Shift+X`).
3. Search for **QuickDebug**.
4. Click **Install**.

Alternatively, install via the `.vsix` file:

```sh
code --install-extension quickdebug.vsix
```

## Usage

1. **Select a variable** in your supported language file.
2. **Use the command palette** (`Ctrl+Shift+P`) and type `Insert Debug Message`.
3. The debug statement is automatically inserted on the next line.

### Keyboard Shortcut (Optional)

To assign a keyboard shortcut:

1. Open **Keyboard Shortcuts** (`Ctrl+K Ctrl+S`).
2. Search for `Insert Debug Message`.
3. Set your preferred shortcut (e.g., `Ctrl+Alt+L`).

## Extension Settings

This extension currently does not add any configurable settings.

- **Keybind**: `Ctrl + Alt + L`
  - Triggers the insertion of a debug message, logging the highlighted variable.

## Known Issues

- May not work properly on minified or formatted code.

## Release Notes

### 1.1.0

- Added support for C, C++, Java, C#, Go, Ruby, and PHP.
- Improved debugging output format.

### 1.0.0

- Initial release with support for JavaScript, TypeScript, and Python.
- Added automatic debug message insertion with line:column tracking.

## More Information

- [VS Code Extension API](https://code.visualstudio.com/api)
- [GitHub Repository](https://github.com/your-repo/quickdebug)
