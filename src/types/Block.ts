interface Transfer {
  address: string | null;
  value: number | null;
}



interface Block {
  hexNum: string;
  number: number;
  timestamp: number;
  sents: Transfer[];
  receives: Transfer[];
}

export default Block;