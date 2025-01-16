class Api::V1::PlayersController < Api::V1::BaseController
  skip_before_action :process_token, only: [:index, :show, :statistics, :accumulated_statistics]

  def index
    players = Player.all
    render json: players
  end

  def show
    player = Player.find(params[:id])
    render json: player, include: [:player_statistics]
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Player not found' }, status: :not_found
  end

  def statistics
    player = Player.find(params[:id])
    statistics = player.player_statistics.includes(:match)
    render json: statistics, include: [:match]
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Player not found' }, status: :not_found
  end
  
  def accumulated_statistics
    player = Player.find(params[:id])
    stats = player.player_statistics.includes(:match)
    
    accumulated = {
      total_matches: stats.count,
      total_minutes: stats.sum(:games_minutes),
      average_rating: (stats.sum { |s| s.games_rating.to_f } / stats.count).round(2),
      goals_conceded: stats.sum(:goals_conceded),
      total_saves: stats.sum(:goals_saves),
      total_passes: stats.sum(:passes_total),
      average_pass_accuracy: (stats.sum { |s| s.passes_accuracy.to_f } / stats.count).round(2),
      yellow_cards: stats.sum(:cards_yellow),
      red_cards: stats.sum(:cards_red),
      penalties_saved: stats.sum(:penalty_saved),
      clean_sheets: stats.count { |s| s.goals_conceded == 0 }
    }

    render json: accumulated
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Player not found' }, status: :not_found
  end

  def search
    players = Player.where('name ILIKE ?', "%#{params[:query]}%")
    render json: players
  end
end 