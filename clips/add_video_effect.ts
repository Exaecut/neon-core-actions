interface VideoEffectArgs {
    effectName: string
}

const buildEffectPrompt = (videoEffects: Array<String>): Neon.UI.Prompt<String> => {
    return {
        categories: [
            {
                title: "Video Effects",
                actions: videoEffects.map(effect => {
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

const script: Neon.Script<VideoEffectArgs, {}> = {
    metadata: {
        displayName: "Add video effect",
        author: "Exaecut",
        category: "Clips"
    },
    execute(_, args) {
        const allVideoEffects = qe.project.getVideoEffectList();
        const videoEffectPrompt = buildEffectPrompt(allVideoEffects);

        neon.ui.prompt(videoEffectPrompt, (result) => {
            const selectedItems = app.project.activeSequence.getSelection();
            for (const item of selectedItems) {
                const qeTrackItem = item.toQETrackItem();
                const videoEffect = qe.project.getVideoEffectByName(result.selection.toString());
                if (videoEffect.name) {
                    qeTrackItem.addVideoEffect(videoEffect);
                    return;
                }
            }
        }, true);

        return 'ok';
    },
}

export default script;