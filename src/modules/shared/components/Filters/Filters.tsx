import { useSearchParams } from 'react-router-dom';
import { Chip, Slider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import styles from './Filters.module.scss';

/**
 * ⚠️ ВАЖЛИВО:
 * value = ID з БД (а не текст!)
 */

const purposes = [
  { id: '1', label: '🎉 Святкування' },
  { id: '2', label: '✨ Для особливих моментів' },
  { id: '3', label: '💼 Для ділових зустрічей' },
];

const moods = [
  { id: '1', label: '🥳 Вечірка' },
  { id: '2', label: '💖 Романтичний' },
];

const categories = [
  { id: '1', label: '🍇 Класичне' },
  { id: '2', label: '🌟 Преміум' },
];

const wineTypes = [
  { id: '1', label: '🍷 Червоне' },
  { id: '2', label: '🥂 Біле' },
  { id: '3', label: '🍾 Ігристе' },
];

const countries = [
  { id: '1', label: '🇫🇷 Франція' },
  { id: '2', label: '🇮🇹 Італія' },
  { id: '3', label: '🇪🇸 Іспанія' },
];

type FiltersProps = {
  wineOpen: boolean;
  setWineOpen: (open: boolean) => void;
  countryOpen: boolean;
  setCountryOpen: (open: boolean) => void;
  toggleParam: (key: string, value: string) => void;
};

export const Filters = ({
  wineOpen,
  setWineOpen,
  countryOpen,
  setCountryOpen,
  toggleParam,
}: FiltersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedValues = (key: string) => searchParams.getAll(key);

  const price: [number, number] = [
    Number(searchParams.get('priceMin')) || 0,
    Number(searchParams.get('priceMax')) || 5000,
  ];

  const handlePriceChange = (_: Event | React.SyntheticEvent, value: number | number[]) => {
    if (!Array.isArray(value)) return;

    const [min, max] = value;
    const params = new URLSearchParams(searchParams);

    params.set('priceMin', String(min));
    params.set('priceMax', String(max));
    params.delete('page');

    setSearchParams(params);
  };

  const renderChips = (key: string, items: { id: string; label: string }[]) => (
    <div className={styles.filters__chips}>
      {items.map((item) => (
        <Chip
          key={item.id}
          label={item.label}
          clickable
          component="div"
          color={selectedValues(key).includes(item.id) ? 'primary' : 'default'}
          onClick={() => toggleParam(key, item.id)}
        />
      ))}
    </div>
  );

  return (
    <aside className={styles.filters}>
      <section className={styles.filters__section}>
        <h3 className={styles.filters__title}>🪄 Віртуальний сомельє</h3>

        <p className={styles.filters__subtitle}>Призначення</p>
        {renderChips('purpose', purposes)}

        <p className={styles.filters__subtitle}>Настрій</p>
        {renderChips('moods', moods)}

        <p className={styles.filters__subtitle}>Категорія</p>
        {renderChips('category', categories)}
      </section>

      <section className={styles.filters__section}>
        <p className={styles.filters__subtitle}>Ціна</p>

        <Slider
          value={price}
          onChangeCommitted={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={5000}
        />
      </section>

      <section className={styles.filters__section}>
        <Accordion expanded={wineOpen} onChange={(_, v) => setWineOpen(v)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>Тип вина</AccordionSummary>
          <AccordionDetails>{renderChips('wine_type', wineTypes)}</AccordionDetails>
        </Accordion>

        <Accordion expanded={countryOpen} onChange={(_, v) => setCountryOpen(v)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>Країна</AccordionSummary>
          <AccordionDetails>{renderChips('country', countries)}</AccordionDetails>
        </Accordion>
      </section>
    </aside>
  );
};
