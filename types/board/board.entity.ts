export interface BoardEntity {
    id: string;
    event_id: string;
    position: number;
    type: number;
    hp?:number;
    mana?: number;
    img:string;
}

