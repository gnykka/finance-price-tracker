/* eslint-disable import/prefer-default-export */

type FetchOptions = {
  endpoint: string;
  query?: Record<string, string>;
  body?: BodyInit;
  method?: string;
};

class ApiClient {
  baseUrl: string;

  options: RequestInit;

  constructor() {
    this.baseUrl = 'https://finnhub.io/api/v1';
    this.options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Finnhub-Token': process.env.REACT_APP_FINNHUB_API_KEY || '',
      },
    };
  }

  url(endpoint: string, query: Record<string, string> = {}): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.search = new URLSearchParams(query).toString();
    return url.toString();
  }

  async fetch({ endpoint, ...options }: FetchOptions): Promise<any> {
    const { query = {}, body, ...fetchOptions } = options;
    const url = this.url(endpoint, query);

    const response = await fetch(url, {
      ...this.options,
      ...fetchOptions,
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    const result = await response.json();

    return result;
  }

  async get(endpoint: string, params: Record<string, string> = {}): Promise<any> {
    return this.fetch({ endpoint, method: 'GET', query: params });
  }
}

const api = new ApiClient();

export const getTickerQuote = async (symbol: string) => api.get('/quote', { symbol });
