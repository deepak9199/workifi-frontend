
export interface profile {
    points: number
    uid: string
    date_time: string
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
    skil: string[]
    education: education[]
    work_experience: work_experience[]
    award: []
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