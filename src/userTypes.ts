import React from "react";

export interface Conversation {
    [key: string]: string;
}

export interface VoidCallbackFunction {
    (): void;
}

export interface SingleStrArgFunction {
    (inStr: string): void;
}

export interface VoidReactMouseToAnchorEventHandler {
    (event: React.MouseEvent<HTMLAnchorElement>): void;
}

export interface ConversationStoreType {
    [key: string]: [string, string, number[]][];
}

export type ConversationType = [string, string, number[]][];