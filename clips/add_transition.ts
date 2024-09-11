interface AudioEffectArgs {
    effectName: string
}

const buildEffectPrompt = (transitions: Array<String>): Neon.UI.Prompt<String> => {
    return {
        categories: [
            {
                title: "Video Transitions",
                actions: transitions.map(effect => {
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
        displayName: "Add video transition",
        author: "Exaecut",
        category: "Clips"
    },
    execute(_, args) {
        const allTransitions = qe.project.getVideoTransitionList();
        const prompt = buildEffectPrompt(allTransitions);

        neon.ui.prompt(prompt, (result) => {
            const selectedItems = app.project.activeSequence.getSelection();
            for (const item of selectedItems) {
                const qeTrackItem = item.toQETrackItem();
                const transition = qe.project.getVideoTransitionByName(result.selection.toString());
                if (transition.name) {
                    qeTrackItem.addTransition(transition);
                    return;
                }
            }
        }, true);

        return 'ok';
    },
}

export default script;