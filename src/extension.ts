import * as vscode from 'vscode'
import TelemetryReporter from '@vscode/extension-telemetry'
import * as os from 'os'

import {
  handleBrowserConfig,
  handleFocusMode,
  handleOpeningWorkspaceApps,
  handleOpeningWorkspaceInTerminal,
  runAll,
} from './commands/commands'
import {
  BrowserConfig,
  FocusModeConfig,
  TerminalConfigContext,
  WorkspaceApps,
} from './types/types'

const key = '0ee35415-2ad0-4478-a141-a85a54a3297f'
let reporter: TelemetryReporter
let outputChannel: vscode.OutputChannel

export function activate(context: vscode.ExtensionContext) {
  const isFirstActivation = !context.globalState.get('hasActivatedBefore')

  if (isFirstActivation) {
    vscode.window.showInformationMessage(
      'Thank you for installing Phastos Automate!'
    )
    vscode.window
      .showInformationMessage(
        'We collect anonymous usage telemetry to improve Your Extension Name. You can opt-out in the settings.',
        'Open Settings',
        'Dismiss'
      )
      .then((selection) => {
        if (selection === 'Open Settings') {
          vscode.commands.executeCommand(
            'workbench.action.openSettings',
            'phastos-automate.telemetryEnabled'
          )
        }
      })
    context.globalState.update('hasActivatedBefore', true)
  }

  reporter = new TelemetryReporter(key)
  console.log(
    'context.globalState',
    context.globalState.get('hasActivatedBefore')
  )
  if (os.platform() !== 'darwin') {
    vscode.window.showErrorMessage(
      'Phastos Automation currently only supports macOS.'
    )
    return
  }
  reporter.sendTelemetryEvent('macOSVersion', { version: os.release() })

  outputChannel = vscode.window.createOutputChannel('Phastos Automate')
  context.subscriptions.push(outputChannel)
  const config = vscode.workspace.getConfiguration('phastos-automate')
  const autoRunAll: boolean = config.get('autoRunAll') as boolean
  const browserConfig = config.get('browserConfig', {})
  const workspaceApps = config.get('workspaceApps')
  const focusMode = config.get('focusMode')
  const telemetryEnabled = config.get('telemetryEnabled', true)
  const terminalConfig = config.get('terminalConfig')
  const autoRunWorkspaceAppsOnLaunch = config.get(
    'autoRunWorkspaceAppsOnLaunch'
  )
  const autoRunTerminalsOnLaunch = config.get('autoRunTerminalsOnLaunch')
  const autoRunBrowsersOnLaunch = config.get('autoRunBrowsersOnLaunch')
  const autoRunFocusMode = config.get('autoRunFocusMode')

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
  outputChannel.appendLine('focusMode: ' + JSON.stringify(focusMode))
  outputChannel.appendLine('autoRunFocusMode: ' + autoRunFocusMode)

  function sendTelemetryEventIfEnabled(
    eventName: string,
    context?: { [key: string]: any }
  ) {
    if (telemetryEnabled) {
      reporter.sendTelemetryEvent(eventName, context || { event: eventName })
    }
  }

  if (autoRunAll) {
    runAll({ terminalConfig, browserConfig, workspaceApps, focusMode })
  }
  if (autoRunFocusMode) {
    handleFocusMode(focusMode as FocusModeConfig)
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
    () => {
      handleOpeningWorkspaceInTerminal(terminalConfig as TerminalConfigContext)
      sendTelemetryEventIfEnabled('openTerminalProcess')
    }
  )
  const openChromiumBrowserDisposable = vscode.commands.registerCommand(
    'phastos-automate.openChromiumBrowser',
    () => {
      handleBrowserConfig(browserConfig as BrowserConfig)
      if (telemetryEnabled) {
        sendTelemetryEventIfEnabled('openChromiumBrowser')
      }
    }
  )
  const openWorkspaceAppsDisposable = vscode.commands.registerCommand(
    'phastos-automate.openWorkspaceApps',
    () => {
      handleOpeningWorkspaceApps(workspaceApps as WorkspaceApps)
      sendTelemetryEventIfEnabled('openWorkspaceApps')
    }
  )
  const focusModeDisposable = vscode.commands.registerCommand(
    'phastos-automate.focusMode',
    () => {
      handleFocusMode(focusMode as FocusModeConfig)
      sendTelemetryEventIfEnabled('focusMode')
    }
  )

  context.subscriptions.push(focusModeDisposable)
  context.subscriptions.push(openChromiumBrowserDisposable)
  context.subscriptions.push(openTerminalProcessDisposable)
  context.subscriptions.push(openWorkspaceAppsDisposable)
  context.subscriptions.push(reporter)
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('phastos-automate')) {
        vscode.window
          .showInformationMessage('Your settings have changes', 'Reload Window')
          .then((action) => {
            if (action === 'Reload Window') {
              vscode.commands.executeCommand('workbench.action.reloadWindow')
            }
          })
        sendTelemetryEventIfEnabled('settingsConfigChanged')
      }
    })
  )
}

export function deactivate() {
  if (reporter) {
    reporter.dispose()
  }
}
