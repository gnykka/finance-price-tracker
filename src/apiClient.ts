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

  // Helper method to construct the request url from baseUrl, endpoint and query params
  url(endpoint: string, query: Params = {}): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.search = new URLSearchParams(query).toString();
    return url.toString();
  }

  // Basic method to fetch data
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

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();

    return result;
  }

  // Get method utilizes 'fetch' with specified params
  async get(endpoint: string, params: Params = {}): Promise<any> {
    return this.fetch({ endpoint, method: 'GET', query: params });
  }
}

const api = new ApiClient();

// Request to get the current data for the tickers
export const getTickerQuotes = async (tickers: string[]) => {
  const [ticker, ...otherTickets] = tickers;

  return api.get(`/real-time/${ticker}`, { s: otherTickets.join(',') });
};

// Request to get historical data (the last year) for the ticker
export const getTickerData = async (ticker: string) => api.get(`/eod/${ticker}`, { period: 'd' });
