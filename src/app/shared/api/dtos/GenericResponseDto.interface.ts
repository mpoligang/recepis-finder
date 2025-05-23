export interface GenericResponseDto<T> {
    meals: Array<T> | null | string
}