class Server {
    constructor() {
        // Start
    }

    start() {
        alert("Running", "Server instance", true);
    }
}

const script: Neon.Script = {
    metadata: {
        author: "Exaecut",
        category: "Projects",
        description: "Open last project",
        displayName: "Open last project",
        showInCommandPalette: true,
    },
    execute(commandId, args) {
        const server: Server = {
            
        } as Server;

        server.start();
        alert(script.metadata.displayName);
        alert(commandId);
        return "ok";
    },
}

export default script;