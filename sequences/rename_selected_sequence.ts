type RenamePromptArgs = "rename" | "append";

const renamePrompt: Neon.UI.Prompt<RenamePromptArgs> = {
    categories: [
        {
            title: "Actions",
            actions: [
                {
                    title: "Rename",
                    description: "Rename the selected sequence",
                    value: "rename",
                },
                {
                    title: "Append",
                    description: "Preserve the current name and add the input at the end",
                    value: "append",
                }
            ]
        },
    ]
}

interface RenameMethods {
    rename: (mode: RenamePromptArgs, value: string) => void
}

const script: Neon.Script<{ mode: RenamePromptArgs, value: string }, RenameMethods> = {
    metadata: {
        author: "Exaecut",
        displayName: "Rename selected sequences",
        description: "Open a prompt to rename the selected sequences"
    },
    rename(mode, value) {
        switch (mode) {
            case "rename":
                app.project.activeSequence.name = value;
                break;
            case "append":
                app.project.activeSequence.name += value;
                break;
        }
    },
    execute(_commandId, _args) {
        neon.ui.prompt(renamePrompt, (result) => {
            script.rename(result.selection, result.value);
        });

        return "ok"
    },
}

export default script;