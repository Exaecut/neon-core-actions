const buildTargetPrompt = (videoTracks: Array<Track>): Neon.UI.Prompt<number> => ({
    categories: [
        {
            title: "Target video tracks",
            actions: videoTracks.filter((track) => !track.isTargeted).map((track, index) => {
                return {
                    title: track.name.toString(),
                    description: "",
                    value: track.id
                }
            })
        }
    ]
});

interface TargetVideoTracksArgs {
    trackId: number,
    action: string,
}

const script: Neon.Script<TargetVideoTracksArgs, {}> = {
    metadata: {
        displayName: "Target video tracks",
        author: "Exaecut",
        category: "Tracks",
        description: "Target video tracks",
    },
    execute(commandId, args) {
        const videoTracks = app.project.activeSequence.videoTracks.toArray();

        neon.ui.prompt(buildTargetPrompt(videoTracks), (result) => {
            if (!videoTracks[result.selection].isTargeted) {
                videoTracks[result.selection].setTargeted(true, true);
            }
        })
    },
}

export default script;