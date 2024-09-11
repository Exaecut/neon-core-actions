const buildTargetPrompt = (tracks: Array<Track>): Neon.UI.Prompt<number> => ({
    categories: [
        {
            title: "Target audio tracks",
            actions: tracks.filter((track) => !track.isTargeted).map((track, index) => {
                return {
                    title: track.name.toString(),
                    description: "",
                    value: track.id
                }
            })
        }
    ]
});

interface ScriptArgs {
    trackId: number,
}

const script: Neon.Script<ScriptArgs, {}> = {
    metadata: {
        displayName: "Target audio tracks",
        author: "Exaecut",
        category: "Tracks",
        description: "Target audio tracks",
    },
    execute(commandId, args) {
        const tracks = app.project.activeSequence.audioTracks.toArray();

        neon.ui.prompt(buildTargetPrompt(tracks), (result) => {
            if (!tracks[result.selection].isTargeted) {
                tracks[result.selection].setTargeted(true, true);
            }
        })
    },
}

export default script;