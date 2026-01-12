import type { WineApi, WinesListApiResponse } from '../../../types/WineApi';

export const winesListMock: WinesListApiResponse = {
  count: 3,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      name: 'Odulin, Friulano, The Wine People',
      volume: '0.75',
      price: '10.00',
      image: '/mock-images/prestige-chianti-docg.png',
    },
    {
      id: 2,
      name: 'Bellevue, Blanc Sec, Domaine Denis Tastet',
      volume: '0.75',
      price: '11.00',
      image: '/mock-images/prestige-chianti-docg.png',
    },
    {
      id: 3,
      name: 'Chateau Haut-Brion, Pessac-Leognan',
      volume: '0.75',
      price: '1000.00',
      image: '/mock-images/prestige-chianti-docg.png',
    },
    {
      id: 4,
      name: 'Chateau Haut-Brion, Pessac-Leognan',
      volume: '0.75',
      price: '1000.00',
      image: '/mock-images/prestige-chianti-docg.png',
    },
    {
      id: 5,
      name: 'Chateau Haut-Brion, Pessac-Leognan',
      volume: '0.75',
      price: '1000.00',
      image: '/mock-images/prestige-chianti-docg.png',
    },
    {
      id: 6,
      name: 'Chateau Haut-Brion, Pessac-Leognan',
      volume: '0.75',
      price: '1000.00',
      image: '/mock-images/prestige-chianti-docg.png',
    },
    {
      id: 7,
      name: 'Bellevue, Blanc Sec, Domaine Denis Tastet',
      volume: '0.75',
      price: '11.00',
      image: '/mock-images/prestige-chianti-docg.png',
    },
  ],
};

export const wineDetailsMock: Record<number, WineApi> = {
  1: {
    id: 1,
    name: 'Odulin, Friulano, The Wine People',
    volume: '0.75',
    price: '10.00',
    description:
      "Загальна інформація:\r\nOdulin, Friulano, The Wine People — справжній символ цього краю, назва якого відсилає до локальних традицій та підкреслює зв'язок вина зі землею Фріулі. Виготовлене зі 100% сорту Фріулано, що культивують на ділянках на північному сході Італії, відомому своїми неймовірними білими винами.\r\n\r\nУрожай збирають на початку вересня вручну й обробляють з великою обережністю. Далі проводять холодну статичну седиментацію та ферментацію при контрольованій температурі 17-19 градусів протягом приблизно 10-12 днів. Після ферментації частину купажу витримують в барриках близько 4 місяців. Це італійське вино Odulin, Friulanо ідеально підійде для тих, хто шукає розкішний баланс між фруктовістю й благородною стриманістю.\r\n\r\nСмак:\r\nЕлегантний смак з виразними пряними нотками цитрусових, персика й абрикоса, та м'яким післясмаком.\r\n\r\nАромат:\r\nСкладний букет з нюансами середземноморського вересу, дикими трояндами, квітами апельсина й тропічними фруктами.\r\n\r\nКолір:\r\nЗолотисто-солом'яний\r\n\r\nГастрономічне поєднання:\r\nІдеальне з ніжним запеченим м'ясом й стравами з морепродуктів\r\n\r\nТемпература подачі:\r\n10-12 °С\r\n\r\nСорт винограду:\r\nФріулано\r\n\r\nРегіон:\r\nФріулі (Італія)\r\n\r\nСайт виробника:\r\nwww.twpwines.com",
    country: {
      id: 1,
      name: 'Italy',
    },
    wine_type: {
      id: 2,
      name: 'White',
    },
    category: {
      id: 2,
      name: 'classic',
    },
    moods: [
      {
        id: 1,
        name: 'romantic',
      },
    ],
    created_at: '2026-01-05T19:25:29.794405Z',
    image: '/mock-images/vino-odulin-friulano-wine-people-bile-suhe-075l.jpg',
    stock: 5,
    in_stock: true,
    purpose: {
      id: 3,
      name: 'Joy & Connection',
    },
  },
};
