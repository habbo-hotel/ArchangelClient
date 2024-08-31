import { NotificationBubbleItem } from '../../../../api';
import { NotificationDefaultBubbleView } from './NotificationDefaultBubbleView';

export const GetBubbleLayout = (item: NotificationBubbleItem, onClose: () => void) => {
    if (!item) return null;

    const props = { key: item.id, item, onClose };

    switch (item.notificationType) {
        default:
            return <NotificationDefaultBubbleView {...props} />
    }
}
