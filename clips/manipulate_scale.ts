import UI = Neon.UI;

type ScalePromptTypes = "set" | "inc" | "dec";

const scalePrompt: UI.Prompt<ScalePromptTypes> = {
    categories: [
        {
            title: "Manipulate scale",
            actions: [
                {
                    title: "Set",
                    description: "Set the scale of the selected items to the specified value.",
                    value: "set",
                },
                {
                    title: "Increment",
                    description: "Increment the scale of the selected items by the specified value.",
                    value: "inc",
                },
                {
                    title: "Decrement",
                    description: "Decrement the scale of the selected items by the specified value.",
                    value: "dec",
                },
            ]
        },
        {
            title: "Useless category",
            actions: [
                {
                    title: "Useless action",
                    value: "set"
                },
            ]
        }
    ]
}

interface ScaleArgs {
    mode: ScalePromptTypes,
    value: number
}

interface ScaleMethods {
    applyScale: (mode: ScalePromptTypes, value: number) => void
}

const script: Neon.Script<ScaleArgs, ScaleMethods> = {
    metadata: {
        author: "Exaecut",
        displayName: "Manipulate scale (Transform)",
        category: "Clips",
        description: "Set/Increment/Decrement the scale of the selected items.",
    },
    applyScale(mode, value) {
        // TODO: Check if transform effect is on selected item already. Apply it if not.
        const TRANSFORM_EFFECT = ZString.getZString("$$$/MediaCore/FiltersAndEffects/Category/Transform");

        if (app.project.activeSequence) {
            const selectedItems = app.project.activeSequence.getSelection();

            try {
                for (const item of selectedItems) {
                    const qeTrackItem = item.toQETrackItem();

                    const videoEffect = qe.project.getVideoEffectByName(TRANSFORM_EFFECT);
                    if (videoEffect.name) {
                        qeTrackItem.addVideoEffect(videoEffect);
                    }
                }
            } catch (error) {
                app.trace(error);
            }
        }

        switch (mode) {
            case "set":
                alert(`Set scale to ${value}`);
                break;
            case "inc":
                alert(`Increment scale to ${value}`);
                break;
            case "dec":
                alert(`Decrement scale to ${value}`);
                break;
            default:
                alert("Invalid mode");
        }
    },
    execute: (_, args) => {
        neon.ui.prompt(scalePrompt, (result) => {
            script.applyScale(result.selection, parseInt(result.value));
            alert("result:" + result.selection + " value:" + result.value);
        });
    }
}

export default script;