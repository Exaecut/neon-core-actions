interface ScriptArguments {
    type: string;
    data: any;
}

const script: Neon.Script<ScriptArguments> = {
    metadata: {
        author: "Exaecut",
        category: "Utility",
        displayName: "Send event to Premiere",
        description: "Send an event to Premiere Pro host application.",
        showInCommandPalette: false,
    },
    execute(commandId, args) {
        neon.sendRawEvent(args.type, args.data);
        return "ok";
    }
}


export default script;