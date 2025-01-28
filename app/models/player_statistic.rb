class PlayerStatistic < ApplicationRecord
  belongs_to :player
  belongs_to :match

  def self.ransackable_attributes(auth_object = nil)
    ["id", "player_id", "match_id", "week", "year", "points", "rebounds", "assists", "created_at", "updated_at"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["player", "match"]
  end

  private

  def generate_id
    init_id('pst')
  end
end

# == Schema Information
#
# Table name: player_statistics
#
#  id                    :string           not null, primary key
#  player_id             :string           not null
#  match_id              :string           not null
#  games_minutes         :integer
#  games_number          :integer
#  games_position        :string
#  games_rating          :string
#  games_captain         :boolean          default(FALSE)
#  games_substitute      :boolean          default(FALSE)
#  shots_total           :integer
#  shots_on              :integer
#  goals_total           :integer
#  goals_conceded        :integer
#  goals_assists         :integer
#  goals_saves           :integer
#  passes_total          :integer
#  passes_key            :integer
#  passes_accuracy       :string
#  tackles_total         :integer
#  tackles_blocks        :integer
#  tackles_interceptions :integer
#  duels_total           :integer
#  duels_won             :integer
#  dribbles_attempts     :integer
#  dribbles_success      :integer
#  dribbles_past         :integer
#  fouls_drawn           :integer
#  fouls_committed       :integer
#  cards_yellow          :integer
#  cards_red             :integer
#  penalty_won           :integer
#  penalty_committed     :integer
#  penalty_scored        :integer
#  penalty_missed        :integer
#  penalty_saved         :integer
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#
# Indexes
#
#  index_player_statistics_on_match_id   (match_id)
#  index_player_statistics_on_player_id  (player_id)
#
# Foreign Keys
#
#  fk_rails_...  (match_id => matches.id)
#  fk_rails_...  (player_id => players.id)
#
