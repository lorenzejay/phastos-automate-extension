import {
  openApp,
  openChromiumBrowser,
  openItermContext,
  openTerminalContext,
} from 'node-jxa-workspace-automation'
import * as vscode from 'vscode'
import {
  BrowserConfig,
  TerminalConfigContext,
  WorkspaceApps,
} from '../types/types'

export function runAll({
  terminalConfig,
  browserConfig,
  workspaceApps,
}: {
  terminalConfig: any
  browserConfig: any
  workspaceApps: any
}) {
  if (terminalConfig) {
    handleOpeningWorkspaceInTerminal(terminalConfig as TerminalConfigContext)
  }
  if (browserConfig) {
    handleBrowserConfig(browserConfig as BrowserConfig)
  }
  if (workspaceApps) {
    handleOpeningWorkspaceApps(workspaceApps as WorkspaceApps)
  }
}

export async function handleBrowserConfig(config: BrowserConfig) {
  try {
    const { browser, spaceName, tabs } = config

    openChromiumBrowser({
      browser,
      spaceName,
      tabs,
    })
  } catch (error: any) {
    console.log('error', error)

    vscode.window.showErrorMessage(error)
  }
}

export async function handleOpeningWorkspaceApps(workspaceApps: WorkspaceApps) {
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
export async function handleOpeningWorkspaceInTerminal(
  terminalContext: TerminalConfigContext
) {
  const { workspaces, useNewTabOrSplit } = terminalContext

  if (terminalContext.terminal === 'Iterm') {
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
}

// export const openChromiumBrowserCommand = (browserConfig: BrowserConfig) => {
//   if (browserConfig) {
//     handleBrowserConfig(browserConfig as BrowserConfig)
//   }
// }

export const openTerminalProcessCommand = (
  terminalConfig: TerminalConfigContext
) => {
  // const config = vscode.workspace.getConfiguration('phastos-automate')
  if (terminalConfig) {
    handleOpeningWorkspaceInTerminal(terminalConfig as TerminalConfigContext)
  }
  vscode.window.showInformationMessage(
    `Successfully opened ${terminalConfig.terminal}`
  )
}
