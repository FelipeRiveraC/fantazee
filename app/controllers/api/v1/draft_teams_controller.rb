class Api::V1::DraftTeamsController < Api::V1::BaseController
  before_action :set_draft_team, only: [:show, :update, :destroy, :add_player, :remove_player]

  def index
    draft_teams = current_user.draft_teams
    render json: draft_teams, include: [:players]
  end

  def show
    render json: @draft_team, include: [:players]
  end

  def create
    ActiveRecord::Base.transaction do
      draft_team = current_user.draft_teams.build(draft_team_params.except(:players))
      draft_team.save!
      
      if params[:draft_team][:players].present?
        players = Player.where(id: params[:draft_team][:players])
        players.each do |player|
          PlayersDraftTeam.create!(
            draft_team: draft_team,
            player: player,
          )
        end
      end

      render json: draft_team, include: [:players], status: :created
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  rescue => e
    render json: { error: e.message }, status: :internal_server_error
  end

  def update
    if @draft_team.update(draft_team_params)
      render json: @draft_team
    else
      render json: { errors: @draft_team.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @draft_team.destroy
    head :no_content
  end

  def add_player
    player = Player.find(params[:player_id])
    if @draft_team.players << player
      render json: @draft_team, include: [:players]
    else
      render json: { errors: @draft_team.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Player not found' }, status: :not_found
  end

  def remove_player
    player = @draft_team.players.find(params[:player_id])
    @draft_team.players.delete(player)
    render json: @draft_team, include: [:players]
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Player not found in team' }, status: :not_found
  end

  def my_teams
    @draft_teams = current_user.draft_teams.includes(:players)
    render json: @draft_teams, include: [
      players: {
        only: [:id, :name, :position, :photo]
      }
    ]
  end

  private

  def set_draft_team
    @draft_team = current_user.draft_teams.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Draft team not found' }, status: :not_found
  end

  def draft_team_params
    params.require(:draft_team).permit(:name, :league, :formation, players: [])
  end
end