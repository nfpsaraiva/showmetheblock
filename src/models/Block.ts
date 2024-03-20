import { Transaction } from "./Transaction";

export interface Block {
    number: number;
    miner: string;
    hash: string;
    difficulty: number;
    timestamp: number;
    transactions: Transaction[];
}