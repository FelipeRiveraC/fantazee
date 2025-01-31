# app/jobs/process_player_statistics_job.rb
require 'active_job'

class ProcessPlayerStatisticsJob < ApplicationJob
  queue_as :default

  def perform(fixture_ids)
    Rails.logger.info "Starting ProcessPlayerStatisticsJob for fixtures: #{fixture_ids}"

    # fixture_ids is expected to be a hash: { fixture_ids: [1,2,3,...] }
    fixture_ids[:fixture_ids].each do |fixture_id|
      Rails.logger.info "Processing fixture ID: #{fixture_id}"

      # 1) Retrieve fixture details
      fixture_response = api_service.get_fixtures(id: fixture_id)
      unless fixture_response["response"].present?
        Rails.logger.warn "No fixture data found for ID #{fixture_id}"
        next
      end

      fixture_data = fixture_response["response"].first
      Rails.logger.info "Fixture data received for ID #{fixture_id}"

      match = find_or_create_match(fixture_data)
      Rails.logger.info "Match created/found with ID: #{match.id}"

      # 2) Retrieve player statistics
      stats_response = api_service.get_player_statistics(fixture: fixture_id)
      unless stats_response["response"].present?
        Rails.logger.warn "No player statistics found for fixture #{fixture_id}"
        next
      end

      Rails.logger.info "Player statistics received for fixture #{fixture_id}"
      process_response(stats_response, match.id)
    end

    Rails.logger.info "ProcessPlayerStatisticsJob completed"
  end

  private

  def find_or_create_match(fixture_data)
    fixture = fixture_data["fixture"]
    league  = fixture_data["league"]

    # Convert fixture["date"] to a Ruby Date
    match_date = begin
      Date.parse(fixture["date"])
    rescue ArgumentError
      # fallback if date is invalid or missing
      nil
    end

    match = Match.find_or_create_by(api_id: fixture["id"]) do |m|
      m.date   = match_date
      m.league = league["name"]
      m.season = league["season"].to_s
    end

    Rails.logger.info "Match details - ID: #{match.id}, League: #{match.league}, Season: #{match.season}"
    match
  end

  def process_response(response, match_id)
    total_player_count = 0

    response["response"].each do |team_data|
      team_data["players"].each do |player_data|
        player = find_or_create_player(player_data["player"])
        if player.present?
          create_player_statistics(player, player_data["statistics"]&.first, match_id)
          total_player_count += 1
        end
      end
    end

    Rails.logger.info "Processed statistics for #{total_player_count} players in match #{match_id}"
  end

  def find_or_create_player(player_data)
    Rails.logger.info "Finding/Creating player with API ID: #{player_data['id']}"

    # We do an extra API call to fetch player details
    player_api_data = api_service.get_player_details(player: player_data["id"])
    unless player_api_data["response"].present?
      Rails.logger.warn "No detailed info found for player API ID #{player_data['id']}"
      return nil
    end

    detailed_player_data = player_api_data["response"].first["player"]
    Player.find_or_create_by(api_id: detailed_player_data["id"]) do |player|
      player.name         = detailed_player_data["name"]
      player.photo        = detailed_player_data["photo"]
      player.firstname    = detailed_player_data["firstname"]
      player.lastname     = detailed_player_data["lastname"]
      player.age          = detailed_player_data["age"]
      player.birth_date   = begin
                              Date.parse(detailed_player_data["birth"]["date"])
                            rescue ArgumentError
                              nil
                            end
      player.birth_place  = detailed_player_data["birth"]["place"]
      player.birth_country= detailed_player_data["birth"]["country"]
      player.nationality  = detailed_player_data["nationality"]
      player.height       = detailed_player_data["height"]
      player.weight       = detailed_player_data["weight"]
      player.number       = detailed_player_data["number"]
      player.position     = detailed_player_data["position"]
    end
  end

  def create_player_statistics(player, stats, match_id)
    return unless stats.present?

    PlayerStatistic.create!(
      player_id: player.id,  # Use the player's primary key, not `api_id`
      match_id: match_id,

      games_minutes:      stats.dig("games", "minutes"),
      games_number:       stats.dig("games", "number"),
      games_position:     stats.dig("games", "position"),
      games_rating:       stats.dig("games", "rating"),
      games_captain:      stats.dig("games", "captain"),
      games_substitute:   stats.dig("games", "substitute"),

      shots_total:        stats.dig("shots", "total"),
      shots_on:           stats.dig("shots", "on"),

      goals_total:        stats.dig("goals", "total"),
      goals_conceded:     stats.dig("goals", "conceded"),
      goals_assists:      stats.dig("goals", "assists"),
      goals_saves:        stats.dig("goals", "saves"),

      passes_total:       stats.dig("passes", "total"),
      passes_key:         stats.dig("passes", "key"),
      passes_accuracy:    stats.dig("passes", "accuracy"),

      tackles_total:      stats.dig("tackles", "total"),
      tackles_blocks:     stats.dig("tackles", "blocks"),
      tackles_interceptions: stats.dig("tackles", "interceptions"),

      duels_total:        stats.dig("duels", "total"),
      duels_won:          stats.dig("duels", "won"),

      dribbles_attempts:  stats.dig("dribbles", "attempts"),
      dribbles_success:   stats.dig("dribbles", "success"),
      dribbles_past:      stats.dig("dribbles", "past"),

      fouls_drawn:        stats.dig("fouls", "drawn"),
      fouls_committed:    stats.dig("fouls", "committed"),

      cards_yellow:       stats.dig("cards", "yellow"),
      cards_red:          stats.dig("cards", "red"),

      penalty_won:        stats.dig("penalty", "won"),
      penalty_committed:  stats.dig("penalty", "committed"),
      penalty_scored:     stats.dig("penalty", "scored"),
      penalty_missed:     stats.dig("penalty", "missed"),
      penalty_saved:      stats.dig("penalty", "saved")
    )
  rescue ActiveRecord::RecordNotUnique => e
    Rails.logger.info "Skipping duplicate player statistics for player #{player.id} in match #{match_id}"
  end

  def api_service
    @api_service ||= ApiFootballService.new
  end
end