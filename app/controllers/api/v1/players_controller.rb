class Api::V1::PlayersController < Api::V1::BaseController
  skip_before_action :process_token, only: [:index, :show, :statistics]

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

  def search
    players = Player.where('name ILIKE ?', "%#{params[:query]}%")
    render json: players
  end
end 