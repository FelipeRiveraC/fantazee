# app/services/api_football_service.rb

class ApiFootballService
  MAX_REQUESTS_PER_MINUTE = 10

  def initialize
    @call_timestamps = []  # Array to store Time objects of each request
  end

  def get_fixtures(**options)
    rate_limit!
    response = client.get("/fixtures", query: delete_nil_values(options))
    JSON.parse(response.body)
  end

  def get_player_statistics(**options)
    rate_limit!
    response = client.get("/fixtures/players", query: delete_nil_values(options))
    JSON.parse(response.body)
  end

  def get_player_details(**options)
    rate_limit!
    response = client.get("/players/profiles", query: delete_nil_values(options))
    JSON.parse(response.body)
  end

  def get_fixtures_ids(league: nil, live: nil, season: nil, date: nil, team: nil)
    response = get_fixtures(league: league, live: live, season: season, date: date, team: team)
    response["response"].map { |fixture| fixture["fixture"]["id"] }
  end

  private

  # Ensures we do not exceed MAX_REQUESTS_PER_MINUTE
  def rate_limit!
    now = Time.current

    # 1) Drop timestamps older than 60 seconds
    @call_timestamps.reject! { |t| now - t > 60 }

    # 2) If we are at or above the limit, sleep until it is safe
    if @call_timestamps.size >= MAX_REQUESTS_PER_MINUTE
      oldest_call = @call_timestamps.first
      time_since_oldest = now - oldest_call
      sleep_time = 60 - time_since_oldest
      sleep(sleep_time) if sleep_time.positive?

      # Clean out old timestamps after sleeping
      now = Time.current
      @call_timestamps.reject! { |t| now - t > 60 }
    end

    # 3) Record this request’s timestamp
    @call_timestamps << Time.current
  end

  def delete_nil_values(query)
    query.delete_if { |_k, v| v.nil? }
  end

  def client
    @client ||= ApiFootballClient.new
  end
end