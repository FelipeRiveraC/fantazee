class PlayersDraftTeam < ApplicationRecord
  belongs_to :player
  belongs_to :draft_team

  validates :player_id, uniqueness: { scope: :draft_team_id }

  private

  def generate_id
    init_id('pdt')
  end
end

# == Schema Information
#
# Table name: players_draft_teams
#
#  id            :string           not null, primary key
#  draft_team_id :string           not null
#  player_id     :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_players_draft_teams_on_draft_team_id  (draft_team_id)
#  index_players_draft_teams_on_player_id      (player_id)
#
# Foreign Keys
#
#  fk_rails_...  (draft_team_id => draft_teams.id)
#  fk_rails_...  (player_id => players.id)
#
