import type { Product } from '../../../types/Product';
import type { ProductsParams } from '../../../types/ProductsParams';
import type { ProductsResponse } from '../../../types/ProductsResponse';
import type { WineApi, WinesListApiResponse } from '../../../types/WineApi';
import { wineDetailsMock, winesListMock } from '../mocks/wines';
import { request } from './http';
import { mapWineListItemToProduct, mapWineToProduct } from './mapWineToProduct';

const USE_MOCKS = true;

export const getWines = async (params: ProductsParams): Promise<ProductsResponse> => {
  if (USE_MOCKS) {
    const products = winesListMock.results.map(mapWineListItemToProduct);

    return {
      products: products.slice(0, Number(params.perPage || 6)),
      total: products.length,
    };
  }

  let ordering = 'price';

  if (params.sort === 'price_asc') ordering = 'price';
  if (params.sort === 'price_desc') ordering = '-price';
  if (params.sort === 'name_asc') ordering = 'name';
  if (params.sort === 'name_desc') ordering = '-name';

  const query = new URLSearchParams();

  if (params.query) query.set('name', params.query);

  if (params.priceMin) query.set('min_price', params.priceMin);
  if (params.priceMax) query.set('max_price', params.priceMax);

  params.mood?.forEach((mood) => query.append('mood', mood));
  params.wine_type?.forEach((type) => query.append('wine_type', type));
  params.purpose?.forEach((purpose) => query.append('purpose', purpose));
  params.country?.forEach((country) => query.append('country', country));
  params.category?.forEach((category) => query.append('category', category));

  query.set('ordering', ordering);
  query.set('limit', String(params.perPage || 8));
  query.set(
    'offset',
    String(params.page && params.perPage ? (params.page - 1) * params.perPage : 0),
  );

  const data = await request<WinesListApiResponse>(`/wines/?${query.toString()}`);

  return {
    products: data.results.map(mapWineListItemToProduct),
    total: data.count,
  };
};

export const getWineById = async (id: number): Promise<Product> => {
  if (USE_MOCKS) {
    const wine = wineDetailsMock[id];
    if (!wine) throw new Error('Not found');
    return mapWineToProduct(wine);
  }

  const data = await request<WineApi>(`/wines/${id}/`);
  return mapWineToProduct(data);
};
