import { RoomObjectType } from '@nitrots/nitro-renderer';
import { FC, useCallback, useMemo, useState } from 'react';
import { GetSessionDataManager, LocalizeText } from '../../../api';
import { NitroCardGridItemView, NitroCardGridView } from '../../../layout';
import { GetChatHistory } from '../../chat-history/common/GetChatHistory';
import { ChatEntryType } from '../../chat-history/context/ChatHistoryContext.types';
import { IUser } from '../common/IUser';
import { useHelpContext } from '../context/HelpContext';

export const SelectReportedUserView: FC<{}> = props =>
{
    const { helpReportState = null, setHelpReportState = null } = useHelpContext();
    const [selectedUserId, setSelectedUserId] = useState(-1);

    const availableUsers = useMemo(() =>
    {
        const users: Map<number, IUser> = new Map();

        GetChatHistory().chats
            .forEach(chat =>
            {
                if((chat.type === ChatEntryType.TYPE_CHAT) && (chat.entityType === RoomObjectType.USER) && (chat.entityId !== GetSessionDataManager().userId))
                {
                    if(!users.has(chat.entityId))
                    {
                        users.set(chat.entityId, { id: chat.entityId, username: chat.name })
                    }
                }
            });

        return Array.from(users.values());
    }, []);

    const submitUser = useCallback(() =>
    {
        if(selectedUserId <= 0) return;

        const reportState = Object.assign({}, helpReportState);
        reportState.reportedUserId = selectedUserId;
        reportState.currentStep = 2;
        setHelpReportState(reportState);
    }, [helpReportState, selectedUserId, setHelpReportState]);

    const selectUser = useCallback((userId: number) =>
    {
        if(selectedUserId === userId) setSelectedUserId(-1);
        else setSelectedUserId(userId);
    }, [selectedUserId]);

    const back = useCallback(() =>
    {
        const reportState = Object.assign({}, helpReportState);
        reportState.currentStep = --reportState.currentStep;
        setHelpReportState(reportState);
    }, [helpReportState, setHelpReportState]);

    return (
        <div className="d-flex flex-column gap-2 h-100">
            <h3 className="text-center m-0">{LocalizeText('help.emergency.main.step.two.title')}</h3>
            <div>{(availableUsers.length > 0) ? LocalizeText('report.user.pick.user') : ''}</div>
            { (availableUsers.length <= 0) && <div className="bg-muted rounded text-center p-2">{LocalizeText('report.user.error.nolist')}</div> }
            { (availableUsers.length > 0) &&
                <>
                    <NitroCardGridView columns={1}>
                        {availableUsers.map((user, index) =>
                        {
                            return (
                                <NitroCardGridItemView key={user.id} onClick={() => selectUser(user.id)} itemActive={(selectedUserId === user.id)}>
                                    <span dangerouslySetInnerHTML={{ __html: (user.username) }} />
                                </NitroCardGridItemView>
                            )
                        })}
                    </NitroCardGridView>
                </>
            }
            <div className="d-flex gap-2 justify-content-between mt-auto">
                <button className="btn btn-secondary mt-2 w-100" type="button" onClick={back}>{LocalizeText('generic.back')}</button>
                { (availableUsers.length > 0) && <button className="btn btn-success mt-2 w-100" type="button" disabled={selectedUserId <= 0} onClick={submitUser}>{LocalizeText('help.emergency.main.submit.button')}</button> }
            </div>
        </div>
    )
}
