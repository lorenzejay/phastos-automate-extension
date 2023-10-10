# phastos-automate (v0.1.0-beta.0) README

Extension Link: [coming soon]()

## Features

1. Based on your phastos-automate configurations, you can launch processes from macos built in terminal or Iterm2.
2. Open chromium based browsers like Google Chrome, Brave and even Arc. Select which space for Arc and populate your tabs.
3. Open other applications you have installed.

These are triggered on launch, or using the command palette - `(command + p)` and searching Phastos Automate:

Config through your .vscode/settings file or user settings (be workspace specific)

## Requirements

This extension is designed exclusively for `macOS` users. Please refrain from installing if you're using a different operating system.

## Extension Settings

Create a .vscode/settings.json file or using command palette `(command + p)`

This extension contributes the following settings:

- `phastos-automate.autoRunAll`: Enable/disable automatically running all configured automations - terminal process, browsers and apps.
- `phastos-automate.autoRunWorkspaceAppsOnLaunch` : Enable/disable automatically opening workspace apps on workspace launch.
- `phastos-automate.autoRunTerminalsOnLaunch` : Enable/disable automatically opening terminal processes on workspace launch.
- `phastos-automate.autoRunBrowsersOnLaunch` : Enable/disable automatically opening browser processes on workspace launch.
- `phastos-automate.workspaceApps` : Set an array of applications you want to launch open.
- `phastos-automate.browserConfig` : Set an browser context for automating opening browser (Google Chrome, Arc, and Brave) with specific tabs.
- `phastos-automate.terminalConfig` : Set an terminal context for automating running processes like `npm run dev` for your project or even open new VS Code windows based on passed filepath.

## Release Notes

Users appreciate release notes as you update your extension.

### 0.1.0-beta.0 - October 9, 2023

Initial release of phastos-automate. With the 3 core automations for terminal processes, browser and applications openings.
