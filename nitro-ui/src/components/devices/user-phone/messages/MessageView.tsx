import { MessageThreadView } from "./MessageThreadView";
import { MessageListView } from "./MessageListView";
import { useMessenger } from "../../../../hooks";

interface MessageView {
    goBack(): void;
}

export function MessageView({ goBack }: MessageView) {
    const { activeThread, setActiveThreadId } = useMessenger();
    return activeThread
        ? <MessageThreadView goBack={() => setActiveThreadId(null)} />
        : <MessageListView goBack={goBack} />
}
