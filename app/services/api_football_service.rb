class ApiFootballService
  def get_leagues(code: nil, name: nil)
    query = delete_nil_values(code: code, name: name)
    response = client.get("/leagues", query: query)
    JSON.parse(response.body)
  end

  def get_fixtures(id: nil, ids: nil, league: nil, live: nil, season: nil, date: nil, team: nil)
    if ids.present?
      if ids.length > 20
        raise ArgumentError, "Maximum of 20 fixture IDs allowed"
      end
      ids = ids.join('-')
    end
    query = delete_nil_values(id: id, ids: ids, league: league, live: live, season: season, date: date, team: team)
    response = client.get("/fixtures", query: query)
    JSON.parse(response.body)
  end

  def get_fixtures_ids(league: nil, live: nil, season: nil, date: nil, team: nil)
    response = get_fixtures(league: league, live: live, season: season, date: date, team: team)
    response["response"].map { |fixture| fixture["fixture"]["id"] }
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

