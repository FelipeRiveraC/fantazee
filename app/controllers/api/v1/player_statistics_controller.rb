class Api::V1::PlayerStatisticsController < Api::V1::BaseController
  def index
    player_statistics = PlayerStatistic.all
    render json: player_statistics
  end

  def live
    live_statistics = PlayerStatistic.where(live: true)
    render json: live_statistics
  end
end 