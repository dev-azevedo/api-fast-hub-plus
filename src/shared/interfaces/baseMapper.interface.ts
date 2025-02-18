interface IBaseMapper<T, C = T, U = T, R = T> {
  mapCreateItemDtoToItem(item: C): T;
  mapUpdateItemDtoToItem(item: U, itemOnDb: T): T;
  mapItemToResponse(item: T): R;
  mapItemsToResponses(items: T[]): R[];
}

export default IBaseMapper;