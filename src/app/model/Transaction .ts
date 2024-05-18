export interface Transaction {
    from_uid: string
    type: string
    to_id: string
    utr: string
    amount: number
    description: string
    login_user: string
    createdTime: string
}
export interface Transaction_detail {
    id: string
    from_uid: string
    type: string
    to_id: string
    utr: string
    description: string
    amount: number
    login_user: string
    createdTime: string
}