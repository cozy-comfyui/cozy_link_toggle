/**
 * cozy_ext_link_toggle.js
 * https://github.com/cozy-comfyui
 * https://github.com/cozy-comfyui/cozy_link_toggle
 */

import { app } from "../../../scripts/app.js"
import { $el } from "../../../scripts/ui.js";

let LINK_STATE = "Linear";
let HIDDEN = false;

app.registerExtension({
	name: 'cozy.link_toggle',
	async setup(app) {

		const showButton = $el("button.comfy-settings-btn", {
			textContent: "🖼️",
			style: {
				right: "16px",
				cursor: "pointer",
				display: "none",
			},
		});

		const updateButtonState = () => {
			showMenuButton.icon = HIDDEN ? "eye-off" : "eye";
			showMenuButton.tooltip = HIDDEN ? "SHOW LINKS" : "HIDE LINKS";
			showMenuButton.content = HIDDEN ? "SHOW LINKS" : "HIDE LINKS";
		};

		showButton.onclick = () => {
			if (!HIDDEN) {
				LINK_STATE = app.canvas.links_render_mode;
				if (LINK_STATE == "Hidden") {
					LINK_STATE = "Linear";
				}
			}
			HIDDEN = !HIDDEN;
			const state = HIDDEN ? "Hidden" : LINK_STATE;
			app.canvas.links_render_mode = state;
			app.graph.setDirtyCanvas(true, true);
			updateButtonState();
		};

		let showMenuButton;
		if (!app.menu?.element.style.display && app.menu?.settingsGroup) {
			showMenuButton = new (await import("../../../scripts/ui/components/button.js")).ComfyButton({
				icon: "eye",
				action: () => {
					showButton.click();
				},
				tooltip: "HIDE LINKS",
				content: "HIDE LINKS",
			});
			app.menu.settingsGroup.append(showMenuButton);
		}
	}
})
