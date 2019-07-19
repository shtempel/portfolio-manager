export interface AppError {
    id: number;
    type: AppErrorType;
    error?: Error;
    hidden?: boolean;
}

/**
 * Values are translation keys
 */
export enum AppErrorType {
    SearchSymbol = 'cannotLoadSymbols',
}
