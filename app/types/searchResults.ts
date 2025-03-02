export interface SearchResult {
    label: string
    to: string
    type: 'user' | 'post'
    avatar?: { src: string; alt: string }
    description?: string
}