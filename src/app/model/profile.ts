
export interface profile {
    points: number
    uid: string
    loyalty_coins: number
    cash: number
    bonus: number
    status: string
    pan_card_no: string
    created_date_time: string
    updated_date_time: string
    transaction_rewards: number
    image: string
    username: string
    email: string
    phone: number
    tagline: string
    hourly_rate: string
    gender: string
    specialization: string
    type: string
    country: string
    city: string
    language: string
    language_level: string
    introduce_yourself: string
    subscribe: subscribe
    trie: string
    skil: string[]
    education: education[]
    work_experience: work_experience[]
    award: award[]
    proposals: proposal[]
    currency: string
}

export interface getprofile {
    id: string
    points: number
    uid: string
    status: string
    loyalty_coins: number
    cash: number
    bonus: number
    pan_card_no: string
    created_date_time: string
    updated_date_time: string
    transaction_rewards: number
    image: string
    username: string
    email: string
    phone: number
    tagline: string
    hourly_rate: string
    gender: string
    specialization: string
    type: string
    country: string
    city: string
    language: string
    language_level: string
    introduce_yourself: string
    subscribe: subscribe
    trie: string
    skil: string[]
    education: education[]
    work_experience: work_experience[]
    award: award[]
    proposals: proposal[]
    currency: string
}
export interface subscribe {
    datetime: string
    plan: string
}
export interface education {
    from: Date | null;
    to: Date | null;
    collage: string
    certificate_name: string
    description: string
}
export interface work_experience {
    from: Date | null;
    to: Date | null;
    company_name: string
    project_name: string
    description: string
}
export interface award {
    from: Date | null;
    to: Date | null;
    company_name: string
    project_name: string
    description: string
}
export interface proposal {
    uid: string
    message: string
    date_time: string
    creatdatetime: string
}