import { useEffect, useState } from 'react';
import {
  moodsMock,
  purposesMock,
  categoriesMock,
  countriesMock,
  wineTypesMock,
} from '../mocks/filters';
import { getMoods, getPurposes, getCategories, getCountries, getWineTypes } from '../api/filters';
import type { FilterItem } from '../../../types/FilterItem';

export const useFilters = () => {
  const [loading, setLoading] = useState(true);

  const [moods, setMoods] = useState<FilterItem[]>([]);
  const [purposes, setPurposes] = useState<FilterItem[]>([]);
  const [categories, setCategories] = useState<FilterItem[]>([]);
  const [countries, setCountries] = useState<FilterItem[]>([]);
  const [wineTypes, setWineTypes] = useState<FilterItem[]>([]);

  useEffect(() => {
    Promise.all([
      getMoods().catch(() => moodsMock),
      getPurposes().catch(() => purposesMock),
      getCategories().catch(() => categoriesMock),
      getCountries().catch(() => countriesMock),
      getWineTypes().catch(() => wineTypesMock),
    ])
      .then(([moods, purposes, categories, countries, wineTypes]) => {
        setMoods(moods);
        setPurposes(purposes);
        setCategories(categories);
        setCountries(countries);
        setWineTypes(wineTypes);
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    moods,
    purposes,
    categories,
    countries,
    wineTypes,
    loading,
  };
};
