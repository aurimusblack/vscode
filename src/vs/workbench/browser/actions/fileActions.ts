/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import { TPromise } from 'vs/base/common/winjs.base';
import { Action } from 'vs/base/common/actions';
import nls = require('vs/nls');
import { IWindowService } from 'vs/platform/windows/common/windows';
import { ITelemetryData } from 'vs/platform/telemetry/common/telemetry';
import { IWorkspaceEditingService } from "vs/workbench/services/workspace/common/workspaceEditing";
import URI from "vs/base/common/uri";

export class OpenFolderAction extends Action {

	static ID = 'workbench.action.files.openFolder';
	static LABEL = nls.localize('openFolder', "Open Folder...");

	constructor(
		id: string,
		label: string,
		@IWindowService private windowService: IWindowService
	) {
		super(id, label);
	}

	run(event?: any, data?: ITelemetryData): TPromise<any> {
		return this.windowService.pickFolderAndOpen(undefined, data);
	}
}

export class OpenFileFolderAction extends Action {

	static ID = 'workbench.action.files.openFileFolder';
	static LABEL = nls.localize('openFileFolder', "Open...");

	constructor(
		id: string,
		label: string,
		@IWindowService private windowService: IWindowService
	) {
		super(id, label);
	}

	run(event?: any, data?: ITelemetryData): TPromise<any> {
		return this.windowService.pickFileFolderAndOpen(undefined, data);
	}
}

export class AddFolderAction extends Action {

	static ID = 'workbench.action.files.addFolder';
	static LABEL = nls.localize('addFolder', "Add Folder...");

	constructor(
		id: string,
		label: string,
		@IWindowService private windowService: IWindowService,
		@IWorkspaceEditingService private workspaceEditingService: IWorkspaceEditingService
	) {
		super(id, label);
	}

	public run(event?: any, data?: ITelemetryData): TPromise<any> {
		return this.windowService.pickFolder().then(folders => {
			this.workspaceEditingService.addRoots(folders.map(folder => URI.file(folder)));
		});
	}
}