const buildTargetPrompt = (tracks: Array<Track>): Neon.UI.Prompt<number> => ({
    categories: [
        {
            title: "Toggle audio tracks",
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
        displayName: "Toggle audio tracks",
        author: "Exaecut",
        category: "Tracks",
        description: "Toggle audio tracks",
    },
    execute(commandId, args) {
        const tracks = app.project.activeSequence.audioTracks.toArray();

        neon.ui.prompt(buildTargetPrompt(tracks), (result) => {
            tracks[result.selection].setTargeted(!tracks[result.selection].isTargeted, true);
        })
    },
}

export default script;