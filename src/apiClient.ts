type Params = Record<string, string>;
type FetchOptions = {
  endpoint: string;
  query?: Params;
  body?: BodyInit;
  method?: string;
};

class ApiClient {
  private baseUrl: string;

  private options: RequestInit;

  constructor() {
    this.baseUrl = 'https://eodhd.com/api';
    this.options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
  }

  url(endpoint: string, query: Params = {}): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.search = new URLSearchParams(query).toString();
    return url.toString();
  }

  async fetch({ endpoint, ...options }: FetchOptions): Promise<any> {
    const { query = {}, body, ...fetchOptions } = options;
    const defaultQuery = {
      fmt: 'json',
      api_token: process.env.REACT_APP_API_KEY || '',
    };
    const url = this.url(endpoint, { ...query, ...defaultQuery });

    const response = await fetch(url, {
      ...this.options,
      ...fetchOptions,
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    const result = await response.json();

    return result;
  }

  async get(endpoint: string, params: Params = {}): Promise<any> {
    return this.fetch({ endpoint, method: 'GET', query: params });
  }
}

const api = new ApiClient();

/* eslint-disable import/prefer-default-export */
export const getTickerQuotes = async (tickers: string[]) => {
  const [ticker, ...otherTickets] = tickers;

  return api.get(`/real-time/${ticker}`, { s: otherTickets.join(',') });
};
