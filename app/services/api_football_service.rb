class ApiFootballService
  def get_leagues(code: nil, name: nil)
    query = delete_nil_values(code: code, name: name)
    response = client.get("/leagues", query: query)
    JSON.parse(response.body)
  end

  def get_fixtures(league: nil, live: nil, season: nil, date: nil, team: nil)
    query = delete_nil_values(league: league, live: live, season: season, date: date, team: team)
    response = client.get("/fixtures", query: query)
    JSON.parse(response.body)
  end

  def get_player_statistics(fixture:, team: nil)
    if !fixture.present?
      raise "Fixture is required"
    end

    query = delete_nil_values(fixture: fixture, team: team)
    response = client.get("/fixtures/players", query: query)
    JSON.parse(response.body)
  end

  private

  def delete_nil_values(query)
    query.compact
    query.delete_if { |_, value| value.nil? }
  end

  def client
    @client ||= ApiFootballClient.new()
  end
  
end

