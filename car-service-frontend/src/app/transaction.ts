export interface Transaction {
    id: number,
    parts_cost: number,
    labour_cost: number,
    time: string,
    car_id: number,
    client_card_id: number,

    // to be completed via requests by IDs
    car_model_name: string,
    client_card_client_full_name: string
}
