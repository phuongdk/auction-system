export interface Item {
    id: string
    name: string
    price: string
    bid_price: string
    status: string
    time_window: number
}

export interface UserInfo {
    id: string
    email: string
    first_name: string
    last_name: string
    full_name: string
    balance: number
    updateData: (data: UserInfo) => void
}