export interface Transaction {
    from_uid: string
    type: string
    to_id: string
    utr: string
    amount: number
    description: string
    payment: paymentMode
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
    payment: paymentMode
    login_user: string
    createdTime: string
}
export interface paymentMode {
    mode: string
    status: string
}