class ApiFootballClient
  include HTTParty

  API_KEY = ENV.fetch('API_FOOTBALL_KEY')
  base_uri ENV.fetch('API_FOOTBALL_BASE_URI')

  def get(path, query: {}, timeout: 28)
    self.class.get(path, query:, headers: auth_headers, timeout:)
  end

  def post(path, body, headers = { 'Content-Type': 'application/json' }, timeout = 28)
    self.class.post(path, body: body.to_json, headers: auth_headers, timeout:)
  end

  private

  def auth_headers
    {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  end
end