# phastos-automate (v0.1.0)

Phastos Automate is an extension that executes automations such as launching workspace specific process (terminal, running commands), opening other applications like Spotify or Notion and even opening your browser with the tabs unique for your current work context. Automations run through user preferences such as automatically launching when VSCode finishes opening or triggered through the command palette.

## Features

1. Based on your phastos-automate configurations, you can launch processes from macos built in terminal or Iterm2.
2. Open chromium based browsers like Google Chrome, Brave and even Arc. Select which space for Arc and populate your tabs.
3. Open other applications you have installed.

These are triggered on launch, or using the command palette ->`(command + p)` and searching `Phastos Automate:`

Config through your .vscode/settings file or user settings (be workspace specific)

## Requirements

This extension is designed exclusively for `macOS` users. Please refrain from installing if you're using a different operating system.

## Extension Settings

Create a .vscode/settings.json file or using command palette `(command + p)`

You can copy this to get started:

```ts
 "phastos-automate.autoRun": false,
  "phastos-automate.autoRunAll": false,
  "phastos-automate.autoRunWorkspaceAppsOnLaunch": true,
  "phastos-automate.autoRunBrowsersOnLaunch": false,
  "phastos-automate.autoRunTerminalsOnLaunch": false,
  "phastos-automate.workspaceApps": ["Spotify", "Notion"], // you can add apps you want to open up
  "phastos-automate.browserConfig": {
    "browser": "Google Chrome",
    "tabs": [],
    "spaceName": // if using Arc then fill else remove
  },
  "phastos-automate.terminalConfig": {
    "terminal": "Iterm", // Iterm or Terminal
    "useNewTabOrSplit": true,
    "workspaces": [
      {
        "filePath": "", // /User/x/workspaces...
        "command": "", // npm run start
        "opensVSCode": false // boolean
      }, // you can have multiple workspaces open up just follow the same path

    ]
  }
```

This extension contributes the following settings:

- `phastos-automate.autoRunAll`: Enable/disable automatically running all configured automations - terminal process, browsers and apps.
- `phastos-automate.autoRunWorkspaceAppsOnLaunch` : Enable/disable automatically opening workspace apps on workspace launch.
- `phastos-automate.autoRunTerminalsOnLaunch` : Enable/disable automatically opening terminal processes on workspace launch.
- `phastos-automate.autoRunBrowsersOnLaunch` : Enable/disable automatically opening browser processes on workspace launch.
- `phastos-automate.workspaceApps` : Set an array of applications you want to launch open.
- `phastos-automate.browserConfig` : Set an browser context for automating opening browser (Google Chrome, Arc, and Brave) with specific tabs.
- `phastos-automate.terminalConfig` : Set an terminal context for automating running processes like `npm run dev` for your project or even open new VS Code windows based on passed filepath.

## Telemetry

For the continued development and improvement of this extension, we collect anonymous usage telemetry. This data is vital for us to understand how the extension is used, identify pain points, and improve its performance and usability.

### What We Collect:

General usage metrics to understand feature popularity.

### What We DON'T Collect:

Personal information or any data that can identify individual users.
Source code or any proprietary information.
Passwords or secrets.

### How to opt out of telemetry collection:

We respect your privacy! If you prefer not to send telemetry data, you can easily opt-out:
Open Visual Studio Code settings.

1. Search for `phastos-automate.telemetry enabled`.
2. Uncheck the setting to disable telemetry collection.

Thank you for helping us make this extension better for everyone! 🙏

## Changelog

Users appreciate release notes as you update your extension.

### 0.1.0 - October 9, 2023

Initial release of phastos-automate. With the 3 core automations for terminal processes, browser and applications openings.

### 0.1.1 - October 12, 2023

- Added icon for extension
- semver scripts in package.json for scripts
