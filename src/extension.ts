import * as vscode from 'vscode'
import * as os from 'os'

import {
  handleBrowserConfig,
  handleOpeningWorkspaceApps,
  handleOpeningWorkspaceInTerminal,
  runAll,
} from './commands/commands'
import {
  BrowserConfig,
  TerminalConfigContext,
  WorkspaceApps,
} from './types/types'

let outputChannel: vscode.OutputChannel

export function activate(context: vscode.ExtensionContext) {
  if (os.platform() !== 'darwin') {
    vscode.window.showErrorMessage(
      'Phastos Automation currently only supports macOS.'
    )
    return
  }

  outputChannel = vscode.window.createOutputChannel('Phastos Automate')
  context.subscriptions.push(outputChannel)
  const config = vscode.workspace.getConfiguration('phastos-automate')
  const autoRunAll: boolean = config.get('autoRunAll') as boolean
  const browserConfig = config.get('browserConfig')
  const workspaceApps = config.get('workspaceApps')
  const terminalConfig = config.get('terminalConfig')
  const autoRunWorkspaceAppsOnLaunch = config.get(
    'autoRunWorkspaceAppsOnLaunch'
  )
  const autoRunTerminalsOnLaunch = config.get('autoRunTerminalsOnLaunch')
  const autoRunBrowsersOnLaunch = config.get('autoRunBrowsersOnLaunch')

  outputChannel.appendLine(
    'terminal config: ' + JSON.stringify(terminalConfig, null, 4)
  )
  outputChannel.appendLine(
    'browser config: ' + JSON.stringify(browserConfig, null, 4)
  )
  outputChannel.appendLine('autoRun: ' + autoRunAll)
  outputChannel.appendLine('apps: ' + workspaceApps)
  outputChannel.appendLine(
    'autoRunBrowsersOnLaunch: ' + autoRunBrowsersOnLaunch
  )
  outputChannel.appendLine(
    'autoRunWorkspaceAppsOnLaunch: ' + autoRunWorkspaceAppsOnLaunch
  )
  outputChannel.appendLine(
    'autoRunTerminalsOnLaunch: ' + autoRunTerminalsOnLaunch
  )

  if (autoRunAll) {
    runAll({ terminalConfig, browserConfig, workspaceApps })
  }
  if (autoRunTerminalsOnLaunch) {
    handleOpeningWorkspaceInTerminal(terminalConfig as TerminalConfigContext)
  }
  if (autoRunBrowsersOnLaunch) {
    handleBrowserConfig(browserConfig as BrowserConfig)
  }
  if (autoRunWorkspaceAppsOnLaunch) {
    handleOpeningWorkspaceApps(workspaceApps as WorkspaceApps)
  }

  const openTerminalProcessDisposable = vscode.commands.registerCommand(
    'phastos-automate.openTerminalProcess',
    () =>
      handleOpeningWorkspaceInTerminal(terminalConfig as TerminalConfigContext)
  )
  const openChromiumBrowserDisposable = vscode.commands.registerCommand(
    'phastos-automate.openChromiumBrowser',
    () => handleBrowserConfig(browserConfig as BrowserConfig)
  )
  const openWorkspaceAppsDisposable = vscode.commands.registerCommand(
    'phastos-automate.openWorkspaceApps',
    () => handleOpeningWorkspaceApps(workspaceApps as WorkspaceApps)
  )
  context.subscriptions.push(openChromiumBrowserDisposable)
  context.subscriptions.push(openTerminalProcessDisposable)
  context.subscriptions.push(openWorkspaceAppsDisposable)
}

export function deactivate() {}
