export interface createProject {
    uid: string
    title: string
    category: string
    freelancertype: string
    pricetype: string
    cost: number
    projectduration: string
    level: string
    country: string
    city: string
    language: string
    languageslevel: string
    skills: string
    projectdetail: string
    status: string
    upload: string
    proposals: string[]
}

export interface Project {
    id: string
    uid: string
    title: string
    category: string
    freelancertype: string
    pricetype: string
    cost: number
    projectduration: string
    level: string
    country: string
    city: string
    language: string
    languageslevel: string
    skills: string
    projectdetail: string
    status: string
    upload: string
    proposals: proposal[]
}

export interface proposal {
    uid: string
    hourly_price: number
    Estimated_Hours: string
    cover_letter: string
}