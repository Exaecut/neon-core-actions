//@ts-nocheck
const script: Neon.Script = {
    metadata: {
        author: "Exaecut",
        category: "Core",
        displayName: "Show command panel",
        description: "Show command panel in Premiere Pro (can't be removed)",
        showInCommandPalette: false,
    },
    execute(_commandId, _args) {
        if (app.project && app.project.activeSequence) {
            forceLoadAPI();

            MarkerCollection.prototype.toArray = __utils.toArray;
            SequenceCollection.prototype.toArray = __utils.toArray;
            RemoteProductionCollection.prototype.toArray = __utils.toArray;
            ProjectCollection.prototype.toArray = __utils.toArray;
            ProjectItemCollection.prototype.toArray = __utils.toArray;
            TrackCollection.prototype.toArray = __utils.toArray;
            TrackItemCollection.prototype.toArray = __utils.toArray;
            ComponentCollection.prototype.toArray = __utils.toArray;
            ComponentParamCollection.prototype.toArray = __utils.toArray;

            neon.sendEvent({
                type: "neon.showCommandPalette",
            });
            return "ok"
        } else {
            return "no_active_project"
        }

    },
}

export default script;