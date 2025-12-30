export const BASE_URL = '';

function wait(delay: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export async function get<T>(
  url: string,
  params?: Record<string, string | number | undefined>,
): Promise<T> {
  const searchParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        searchParams.append(key, String(value));
      }
    });
  }

  const response = await wait(300).then(() =>
    fetch(`${BASE_URL}${url}?${searchParams.toString()}`),
  );

  if (!response.ok) {
    throw new Error('Failed to load data');
  }

  return response.json();
}
