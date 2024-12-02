import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { clearCapturedPokemon, getCapturedPokemon, saveCapturedPokemon } from '../database/db'
import { startServer, stopServer } from '../backend/server';

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 1024,
    minHeight: 1024,
    minWidth:1024,
    show: false,
    autoHideMenuBar: true,
    icon: icon,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {

  startServer()
  electronApp.setAppUserModelId('com.mdonoso.pokechallenge')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC
  ipcMain.handle('pokemon:capture', (_, pokemon) => {
    try {
      saveCapturedPokemon(pokemon)
      BrowserWindow.getAllWindows().forEach((win) => {
        win.webContents.send('pokemon:capture:update', pokemon)
      })
      return { success: true, message: 'Pokémon captured successfully!' }
    } catch (error) {
      console.error('Error capturing Pokémon:', error)
      return { success: false, message: 'Failed to capture Pokémon.' }
    }
  })

  ipcMain.handle('pokemon:getCaptured', () => {
    try {
      return getCapturedPokemon()
    } catch (error) {
      console.error('Error fetching captured Pokémon:', error)
      return []
    }
  })

  ipcMain.handle('pokemon:clear', async () => {
    try {
      clearCapturedPokemon();
      return { success: true, message: 'All captured Pokémon have been cleared successfully.' };
    } catch (error) {
      console.error('Error clearing captured Pokémon data:', error);
      return { success: false, error: 'Failed to clear captured Pokémon. Please try again.' };
    }
  });

  ipcMain.handle('app:exit', () => {
    stopServer()
    app.quit();
  });

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    stopServer()
    app.quit()
  }
})
