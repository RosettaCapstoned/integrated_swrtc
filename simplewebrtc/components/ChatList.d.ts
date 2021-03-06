import * as React from 'react';
import { ChatGroup } from '../Definitions';
export interface ChatListProps {
    room: string;
    className?: string;
    id?: string;
    groups?: ChatGroup[];
    maxGroupDuration?: number;
    render?: ((props: ChatListRenderProps) => React.ReactNode);
    renderGroup?: ((props: ChatGroup) => React.ReactNode);
    children?: React.ReactNode | ((props: ChatListRenderProps) => React.ReactNode);
}
export interface ChatListRenderProps {
    groups: ChatGroup[];
}
/**
 * @description
 *
 * @public
 *
 */
declare class ChatList extends React.Component<ChatListProps, any> {
    render(): {} | null | undefined;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof ChatList, Pick<ChatListProps, never> & ChatListProps>;
export default _default;
