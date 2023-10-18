import {
  openApp,
  openChromiumBrowser,
  openItermContext,
  openTerminalContext,
  closeOutsideContextApps,
} from 'node-jxa-workspace-automation'
import * as vscode from 'vscode'
import {
  BrowserConfig,
  FocusModeConfig,
  TerminalConfigContext,
  WorkspaceApps,
} from '../types/types'

export function runAll({
  terminalConfig,
  browserConfig,
  workspaceApps,
  focusMode,
}: {
  terminalConfig: any
  browserConfig: any
  workspaceApps: any
  focusMode: any
}) {
  if (focusMode) {
    handleOpeningWorkspaceApps(workspaceApps as WorkspaceApps)
  }

  if (terminalConfig) {
    handleOpeningWorkspaceInTerminal(terminalConfig as TerminalConfigContext)
  }
  if (browserConfig) {
    handleBrowserConfig(browserConfig as BrowserConfig)
  }
  if (workspaceApps) {
    handleOpeningWorkspaceApps(workspaceApps as WorkspaceApps)
  }
  if (workspaceApps) {
    handleOpeningWorkspaceApps(workspaceApps as WorkspaceApps)
  }
}

function errorMessageWithRedirectToSettings(
  message: string,
  option: string,
  settingId: string
) {
  return vscode.window.showErrorMessage(message, option).then((selection) => {
    if (selection === option) {
      vscode.commands.executeCommand(
        'workbench.action.openWorkspaceSettings',
        settingId
      )
    }
  })
}

export async function handleBrowserConfig(config: BrowserConfig) {
  if (Object.keys(config).length === 0) {
    return errorMessageWithRedirectToSettings(
      'No browser config set',
      'Configure workspace browser context',
      'phastos-automate.browserConfig'
    )
  }
  try {
    const { browser, spaceName, tabs } = config
    openChromiumBrowser({
      browser,
      spaceName,
      tabs,
    })
  } catch (error: any) {
    console.log('error 12', error)
    vscode.window.showErrorMessage(error)
  }
}

export async function handleOpeningWorkspaceApps(workspaceApps: WorkspaceApps) {
  if (workspaceApps.length === 0) {
    return errorMessageWithRedirectToSettings(
      'No workspace apps config set',
      'Configure workspace apps to launch',
      'phastos-automate.workspaceApps'
    )
  }
  for (const app of workspaceApps) {
    try {
      await openApp(app)
    } catch (error: any) {
      console.log('error', error)
      vscode.window.showErrorMessage(
        error?.message ? error.message : `Something went wrong opening ${app}`
      )
    }
  }
}

export async function handleFocusMode(focusMode: FocusModeConfig) {
  if (focusMode.enabled) {
    closeOutsideContextApps(
      focusMode.focusedApps.length <= 0 ? ['Code'] : focusMode.focusedApps
    )
  } else {
    vscode.window.showInformationMessage(
      'Focus mode not enabled',
      'Configure workspace focus mode context',
      'phastos-automate.focusMode'
    )
  }
}
export async function handleOpeningWorkspaceInTerminal(
  terminalContext: TerminalConfigContext
) {
  if (Object.keys(terminalContext).length === 0) {
    return errorMessageWithRedirectToSettings(
      'No terminal context config set',
      'Configure workspace terminal context',
      'phastos-automate.terminalConfig'
    )
  }
  try {
    const { workspaces, useNewTabOrSplit, terminal } = terminalContext
    const terminalL = terminal.toLocaleLowerCase()
    if (terminalL === 'iterm' || terminalL === 'iterm2') {
      await openItermContext({
        useSplitPanes: useNewTabOrSplit,
        workspaces: workspaces,
      })
    } else {
      await openTerminalContext({
        useNewTab: useNewTabOrSplit,
        workspaces: workspaces,
      })
    }
  } catch (error: any) {
    console.log('error', error)
    vscode.window.showErrorMessage(
      error?.message
        ? error.message
        : `Something went wrong opening ${terminalContext.terminal}`
    )
  }
}
