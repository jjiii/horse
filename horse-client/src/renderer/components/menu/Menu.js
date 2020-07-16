const path = require('path');
const { remote, shell } = require('electron');
const { app, BrowserWindow, Menu } = remote;

const {
	is,
	appMenu,
	aboutMenuItem,
	openUrlMenuItem,
	openNewGitHubIssue,
	debugInfo
} = require('electron-util');

export default {

		menuList: [
			{
				label: 'About',
				submenu: [
					openUrlMenuItem({
						label: 'Official Website',
						url: 'https://github.com/sindresorhus/electron-boilerplate'
					}),

					openUrlMenuItem({
						label: 'Report an Issue…',
						url: 'https://github.com/sindresorhus/electron-boilerplate/issues/new'
					}),
					{
						label: 'Clean',
						click() {
							shell.moveItemToTrash(app.getPath('userData'));
							app.quit();
							app.relaunch();
						}
					}
		    ]
			}

		],

		setupAppMenu() {
			let menuInstance =  Menu.buildFromTemplate(this.menuList);
	    Menu.setApplicationMenu(menuInstance);
	  }


}
