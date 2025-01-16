require 'active_job'
class ProcessPlayerStatisticsJob < ApplicationJob
  queue_as :default

  def perform(fixture_ids)
    Rails.logger.info "Starting ProcessPlayerStatisticsJob for fixtures: #{fixture_ids}"
    
    Array(fixture_ids).each do |fixture_id|
      Rails.logger.info "Processing fixture ID: #{fixture_id}"
      
      # First get fixture details
      fixture_response = api_service.get_fixtures(id: fixture_id)
      if fixture_response["response"].present?
        fixture_data = fixture_response["response"].first
        Rails.logger.info "Fixture data received for ID #{fixture_id}"
        match = find_or_create_match(fixture_data)
        Rails.logger.info "Match created/found with ID: #{match.id}"
        
        # Then get player statistics
        stats_response = api_service.get_player_statistics(fixture: fixture_id)
        if stats_response["response"].present?
          Rails.logger.info "Player statistics received for fixture #{fixture_id}"
          process_response(stats_response, match.id)
        else
          Rails.logger.warn "No player statistics found for fixture #{fixture_id}"
        end
      else
        Rails.logger.warn "No fixture data found for ID #{fixture_id}"
      end
    end
    
    Rails.logger.info "ProcessPlayerStatisticsJob completed"
  end

  private

  def find_or_create_match(fixture_data)
    fixture = fixture_data["fixture"]
    league = fixture_data["league"]
    
    match = Match.find_or_create_by(api_id: fixture["id"]) do |m|
      m.date = Date.parse(fixture["date"])
      m.league = league["name"]
      m.season = league["season"].to_s
    end
    Rails.logger.info "Match details - ID: #{match.id}, League: #{match.league}, Season: #{match.season}"
    match
  end

  def process_response(response, match_id)
    player_count = 0
    response["response"].each do |team_data|
      team_data["players"].each do |player_data|
        player = find_or_create_player(player_data["player"])
        create_player_statistics(player, player_data["statistics"].first, match_id)
        player_count += 1
      end
    end
    Rails.logger.info "Processed statistics for #{player_count} players in match #{match_id}"
  end

  def find_or_create_player(player_data)
    Rails.logger.info "Finding or creating player with API ID: #{player_data['id']}"
    player_api_data = api_service.get_player_details(player: player_data["id"])
    return nil unless player_api_data["response"].present?
    player_data = player_api_data["response"].first["player"]
    Player.find_or_create_by(api_id: player_data["id"]) do |player|
      player.name = player_data["name"]
      player.photo = player_data["photo"]
      player.firstname = player_data["firstname"]
      player.lastname = player_data["lastname"]
      player.age = player_data["age"]
      player.birth_date = Date.parse(player_data["birth"]["date"])
      player.birth_place = player_data["birth"]["place"]
      player.birth_country = player_data["birth"]["country"]
      player.nationality = player_data["nationality"]
      player.height = player_data["height"]
      player.weight = player_data["weight"]
      player.number = player_data["number"]
      player.position = player_data["position"]
    end
  end

  def create_player_statistics(player, stats, match_id)
    PlayerStatistic.create!(
      player_id: player.api_id,
      match_id: match_id,
      games_minutes: stats.dig("games", "minutes"),
      games_number: stats.dig("games", "number"),
      games_position: stats.dig("games", "position"),
      games_rating: stats.dig("games", "rating"),
      games_captain: stats.dig("games", "captain"),
      games_substitute: stats.dig("games", "substitute"),
      shots_total: stats.dig("shots", "total"),
      shots_on: stats.dig("shots", "on"),
      goals_total: stats.dig("goals", "total"),
      goals_conceded: stats.dig("goals", "conceded"),
      goals_assists: stats.dig("goals", "assists"),
      goals_saves: stats.dig("goals", "saves"),
      passes_total: stats.dig("passes", "total"),
      passes_key: stats.dig("passes", "key"),
      passes_accuracy: stats.dig("passes", "accuracy"),
      tackles_total: stats.dig("tackles", "total"),
      tackles_blocks: stats.dig("tackles", "blocks"),
      tackles_interceptions: stats.dig("tackles", "interceptions"),
      duels_total: stats.dig("duels", "total"),
      duels_won: stats.dig("duels", "won"),
      dribbles_attempts: stats.dig("dribbles", "attempts"),
      dribbles_success: stats.dig("dribbles", "success"),
      dribbles_past: stats.dig("dribbles", "past"),
      fouls_drawn: stats.dig("fouls", "drawn"),
      fouls_committed: stats.dig("fouls", "committed"),
      cards_yellow: stats.dig("cards", "yellow"),
      cards_red: stats.dig("cards", "red"),
      penalty_won: stats.dig("penalty", "won"),
      penalty_committed: stats.dig("penalty", "committed"),
      penalty_scored: stats.dig("penalty", "scored"),
      penalty_missed: stats.dig("penalty", "missed"),
      penalty_saved: stats.dig("penalty", "saved")
    )
  rescue ActiveRecord::RecordNotUnique => e
    Rails.logger.info "Skipping duplicate player statistics for player #{player.id} in match #{match_id}"
  end

  def api_service
    @api_service ||= ApiFootballService.new
  end
end 
