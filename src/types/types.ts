export type Terminals = 'Iterm' | 'Terminal'
export interface Workspace {
  filePath: string
  command: string
  opensVSCode: boolean
}
export interface ConfigSection {
  terminalConfig: string
  workspaceApps: string
  browserConfig: string
}

export interface BrowserConfig {
  browser: 'Google Chrome' | 'Brave Browser' | 'Arc'
  tabs?: string[]
  spaceName?: string
}
export type WorkspaceApps = string[]
export interface TerminalConfigContext {
  terminal: Terminals
  workspaces: { filePath: string; command: string; opensVSCode: boolean }[]
  useNewTabOrSplit: boolean
}
