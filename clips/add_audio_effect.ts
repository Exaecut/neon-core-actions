interface AudioEffectArgs {
    effectName: string
}

const buildEffectPrompt = (audioEffects: Array<String>): Neon.UI.Prompt<String> => {
    return {
        categories: [
            {
                title: "Audio Effects",
                actions: audioEffects.map(effect => {
                    return {
                        title: effect.toString(),
                        description: "",
                        value: effect
                    }
                })
            }
        ]
    }
}

const script: Neon.Script<AudioEffectArgs, {}> = {
    metadata: {
        displayName: "Add audio effect",
        author: "Exaecut",
        category: "Clips"
    },
    execute(_, args) {
        const allAudioEffects = qe.project.getAudioEffectList();
        const audioEffectPrompt = buildEffectPrompt(allAudioEffects);

        neon.ui.prompt(audioEffectPrompt, (result) => {
            const selectedItems = app.project.activeSequence.getSelection();
            for (const item of selectedItems) {
                const qeTrackItem = item.toQETrackItem();
                const audioEffect = qe.project.getAudioEffectByName(result.selection.toString());
                if (audioEffect.name) {
                    qeTrackItem.addAudioEffect(audioEffect);
                    return;
                }
            }
        }, true);

        return 'ok';
    },
}

export default script;