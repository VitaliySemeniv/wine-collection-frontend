import { Chip, Slider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSearchParams } from 'react-router-dom';

import styles from './Filters.module.scss';

const purposes = [
  { value: 'gift', label: '🎁 На подарунок' },
  { value: 'dinner', label: '🍽️ До вечері' },
  { value: 'celebration', label: '🎉 Святкування' },
];

const moods = [
  { value: 'romantic', label: '💖 Романтичний' },
  { value: 'festive', label: '🎄 Святковий' },
  { value: 'relaxed', label: '😌 Розслаблений' },
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

  const handlePriceChange = (_: Event | React.SyntheticEvent, newValue: number | number[]) => {
    if (!Array.isArray(newValue)) return;

    const [min, max] = newValue;
    const params = new URLSearchParams(searchParams);

    params.set('priceMin', String(min));
    params.set('priceMax', String(max));
    params.set('page', '1');

    setSearchParams(params);
  };

  return (
    <aside className={styles.filters}>
      <section className={styles.filters__section}>
        <h3 className={styles.filters__title}>🪄 Віртуальний сомельє</h3>

        <p className={styles.filters__subtitle}>Призначення</p>
        <div className={styles.filters__chips}>
          {purposes.map((p) => (
            <Chip
              key={p.value}
              label={p.label}
              clickable
              component="div"
              color={selectedValues('purpose').includes(p.value) ? 'primary' : 'default'}
              onClick={() => toggleParam('purpose', p.value)}
              sx={{
                fontFamily: '"Playfair Display", "Times New Roman", serif',
                fontSize: '14px',
                backgroundColor: selectedValues('purpose').includes(p.value)
                  ? '#7a1e2d'
                  : undefined,
                color: selectedValues('purpose').includes(p.value) ? '#fff' : undefined,
                '&:hover': {
                  backgroundColor: selectedValues('purpose').includes(p.value)
                    ? '#5c1621'
                    : undefined,
                },
              }}
            />
          ))}
        </div>

        <p className={styles.filters__subtitle}>Настрій</p>
        <div className={styles.filters__chips}>
          {moods.map((m) => (
            <Chip
              key={m.value}
              label={m.label}
              clickable
              component="div"
              color={selectedValues('mood').includes(m.value) ? 'primary' : 'default'}
              onClick={() => toggleParam('mood', m.value)}
              sx={{
                fontFamily: '"Playfair Display", "Times New Roman", serif',
                fontSize: '14px',
                backgroundColor: selectedValues('mood').includes(m.value) ? '#7a1e2d' : undefined,
                color: selectedValues('mood').includes(m.value) ? '#fff' : undefined,
                '&:hover': {
                  backgroundColor: selectedValues('mood').includes(m.value) ? '#5c1621' : undefined,
                },
              }}
            />
          ))}
        </div>
      </section>

      <section className={styles.filters__section}>
        <p className={styles.filters__subtitle}>Ціна</p>

        <Slider
          value={price}
          onChangeCommitted={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={5000}
          sx={{
            color: '#7a1e2d',
            '& .MuiSlider-thumb': {
              backgroundColor: '#7a1e2d',
            },
            '& .MuiSlider-track': {
              backgroundColor: '#7a1e2d',
            },
            '& .MuiSlider-rail': {
              backgroundColor: '#e0c2c7',
            },
            '& .MuiSlider-valueLabel': {
              backgroundColor: '#7a1e2d',
            },
          }}
        />
      </section>

      <section className={styles.filters__section}>
        <Accordion
          disableGutters
          expanded={wineOpen}
          onChange={(_, isExpanded) => setWineOpen(isExpanded)}
        >
          <AccordionSummary
            component="div"
            expandIcon={<ExpandMoreIcon />}
            sx={{
              fontFamily: '"Playfair Display", "Times New Roman", serif',
              fontSize: '14px',
              fontWeight: 500,
              '& .MuiAccordionSummary-content': {
                fontFamily: '"Playfair Display", "Times New Roman", serif',
              },
            }}
          >
            Тип вина
          </AccordionSummary>

          <AccordionDetails>
            <div className={styles.filters__chips}>
              {['Червоне', 'Біле', 'Рожеве', 'Ігристе'].map((type) => (
                <Chip
                  key={type}
                  label={type}
                  clickable
                  component="div"
                  color={selectedValues('type').includes(type) ? 'primary' : 'default'}
                  onClick={() => toggleParam('type', type)}
                  sx={{
                    fontFamily: '"Playfair Display", "Times New Roman", serif',
                    fontSize: '14px',
                    backgroundColor: selectedValues('type').includes(type) ? '#7a1e2d' : undefined,
                    color: selectedValues('type').includes(type) ? '#fff' : undefined,
                    '&:hover': {
                      backgroundColor: selectedValues('type').includes(type)
                        ? '#5c1621'
                        : undefined,
                    },
                  }}
                />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          disableGutters
          expanded={countryOpen}
          onChange={(_, isExpanded) => setCountryOpen(isExpanded)}
        >
          <AccordionSummary
            component="div"
            expandIcon={<ExpandMoreIcon />}
            sx={{
              fontFamily: '"Playfair Display", "Times New Roman", serif',
              fontSize: '14px',
              fontWeight: 500,
              '& .MuiAccordionSummary-content': {
                fontFamily: '"Playfair Display", "Times New Roman", serif',
              },
            }}
          >
            Країна
          </AccordionSummary>

          <AccordionDetails>
            <div className={styles.filters__chips}>
              {['Франція', 'Італія', 'Іспанія', 'Україна'].map((country) => (
                <Chip
                  key={country}
                  label={country}
                  clickable
                  component="div"
                  color={selectedValues('country').includes(country) ? 'primary' : 'default'}
                  onClick={() => toggleParam('country', country)}
                  sx={{
                    fontFamily: '"Playfair Display", "Times New Roman", serif',
                    fontSize: '14px',
                    backgroundColor: selectedValues('country').includes(country)
                      ? '#7a1e2d'
                      : undefined,
                    color: selectedValues('country').includes(country) ? '#fff' : undefined,
                    '&:hover': {
                      backgroundColor: selectedValues('country').includes(country)
                        ? '#5c1621'
                        : undefined,
                    },
                  }}
                />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </section>
    </aside>
  );
};
